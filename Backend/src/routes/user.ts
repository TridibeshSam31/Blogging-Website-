import { Hono } from "hono";
import { PrismaClient } from "@prisma/client";
import { PrismaNeon } from "@prisma/adapter-neon";
import { sign } from "hono/jwt";

export const userRouter = new Hono<{
  Bindings: {
    DATABASE_URL: string;
    JWT_SECRET: string;
  };
}>();

const getPrismaClient = (databaseUrl: string) => {
  const adapter = new PrismaNeon({
    connectionString: databaseUrl,
  });

  return new PrismaClient({
    adapter,
  });
};

userRouter.post("/signup", async (c) => {
  try {
    const body = await c.req.json();

    if (!body.username || !body.password) {
      return c.json(
        {
          message: "Username and password are required",
        },
        400
      );
    }

    const prisma = getPrismaClient(c.env.DATABASE_URL);

    const user = await prisma.user.create({
      data: {
        username: body.username,
        password: body.password,
        name: body.name,
      },
    });

    const token = await sign(
      {
        id: user.id,
      },
      c.env.JWT_SECRET
    );

    return c.json({
      token,
      userId: user.id,
    });
  } catch (e: any) {
    console.error(e);

    return c.json(
      {
        error: e.message,
      },
      500
    );
  }
});

userRouter.post("/signin", async (c) => {
  try {
    const body = await c.req.json();

    const prisma = getPrismaClient(c.env.DATABASE_URL);

    const user = await prisma.user.findFirst({
      where: {
        username: body.username,
        password: body.password,
      },
    });

    if (!user) {
      return c.json(
        {
          message: "Invalid credentials",
        },
        403
      );
    }

    const token = await sign(
      {
        id: user.id,
      },
      c.env.JWT_SECRET
    );

    return c.json({
      token,
      userId: user.id,
    });
  } catch (e: any) {
    console.error(e);

    return c.json(
      {
        error: e.message,
      },
      500
    );
  }
});