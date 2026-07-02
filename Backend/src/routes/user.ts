import { Hono } from "hono"
import { PrismaClient } from "@prisma/client"
import { PrismaNeon } from "@prisma/adapter-neon"
import { Pool } from "@neondatabase/serverless"
import { sign } from "hono/jwt"

export const userRouter = new Hono<{
    Bindings: {
        DATABASE_URL: string,
        JWT_SECRET: string
    }
}>()

userRouter.post('/signup', async (c) => {
    const body = await c.req.json()

    if (!body.username || !body.password || typeof body.username !== 'string' || typeof body.password !== 'string') {
        c.status(411)
        return c.json({ message: "Username and password are required" })
    }
    if (body.password.length < 6) {
        c.status(411)
        return c.json({ message: "Password must be at least 6 characters" })
    }

    const pool = new Pool({ connectionString: c.env.DATABASE_URL })
    const adapter = new PrismaNeon(pool as any)
    const prisma = new PrismaClient({ adapter })

    try {
        const user = await prisma.user.create({
            data: {
                username: body.username,
                password: body.password,
                name: body.name
            }
        })
        const jwt = await sign({ id: user.id }, c.env.JWT_SECRET)
        return c.json({ token: jwt, userId: user.id })
    } catch (error: any) {
        console.error('Signup error:', error?.message || error)
        if (error?.code === 'P2002') {
            c.status(409)
            return c.json({ message: 'Username already exists' })
        }
        c.status(500)
        return c.json({ message: error?.message || 'Internal server error' })
    }
})

userRouter.post('/signin', async (c) => {
    const body = await c.req.json()

    if (!body.username || !body.password) {
        c.status(411)
        return c.json({ message: "Inputs not correct" })
    }

    const pool = new Pool({ connectionString: c.env.DATABASE_URL })
    const adapter = new PrismaNeon(pool as any)
    const prisma = new PrismaClient({ adapter })

    try {
        const user = await prisma.user.findFirst({
            where: {
                username: body.username,
                password: body.password,
            }
        })
        if (!user) {
            c.status(403)
            return c.json({ message: 'Invalid credentials' })
        }
        const jwt = await sign({ id: user.id }, c.env.JWT_SECRET)
        return c.json({ token: jwt, userId: user.id })
    } catch (error: any) {
        console.error('Signin error:', error?.message || error)
        c.status(500)
        return c.json({ message: error?.message || 'Internal server error' })
    }
})
