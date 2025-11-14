import app from './index'

// Define environment variables (same as in index.ts)
type Bindings = {
  DATABASE_URL: string
}

export default {
  // ✅ Now fully typed
  fetch(request: Request, env: Bindings, ctx: ExecutionContext) {
    return app.fetch(request, env, ctx)
  },
}
