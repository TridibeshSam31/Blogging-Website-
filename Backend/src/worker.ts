import app from './index'

// Define environment variables (same as in index.ts)
type Bindings = {
  DATABASE_URL: string
}

export default {
  //prisma error solved prisma v5 error
  fetch(request: Request, env: Bindings, ctx: ExecutionContext) {
    return app.fetch(request, env, ctx)
  },
}
