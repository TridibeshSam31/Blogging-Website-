import { Hono } from 'hono'
import { userRouter } from './routes/user'
import { blogRouter } from './routes/blog'

const app = new Hono()

app.get('/', (c) => {
  return c.json({ 
    message: 'Backend is running!',
    status: 'ok',
    routes: [
      'POST /api/v1/user/signup',
      'POST /api/v1/user/signin',
      'GET /api/v1/blog/bulk',
      'GET /api/v1/blog/:id',
      'POST /api/v1/blog',
      'PUT /api/v1/blog'
    ]
  })
})

app.route("/api/v1/user",userRouter)
app.route("/api/v1/blog",blogRouter)

export default app
