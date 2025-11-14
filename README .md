# LogVerse — A Modern Blogging Platform

![TypeScript](https://img.shields.io/badge/TypeScript-007ACC?style=for-the-badge&logo=typescript&logoColor=white)
![React](https://img.shields.io/badge/React-20232A?style=for-the-badge&logo=react&logoColor=61DAFB)
![Prisma](https://img.shields.io/badge/Prisma-3982CE?style=for-the-badge&logo=Prisma&logoColor=white)
![PostgreSQL](https://img.shields.io/badge/PostgreSQL-316192?style=for-the-badge&logo=postgresql&logoColor=white)
![Cloudflare Workers](https://img.shields.io/badge/Cloudflare%20Workers-F38020?style=for-the-badge&logo=cloudflare&logoColor=white)
![JWT](https://img.shields.io/badge/JWT-black?style=for-the-badge&logo=JSON%20web%20tokens)
![Zod](https://img.shields.io/badge/Zod-3E67B1?style=for-the-badge&logo=zod&logoColor=white)

A full-stack blogging platform built with Hono, Cloudflare Workers, React, and Prisma. LogVerse provides a scalable, serverless architecture for creating and managing blog content.

## 🚀 Tech Stack

**Frontend:**
- React
- TypeScript
- TailwindCSS
- React Router DOM

**Backend:**
- Hono (Web Framework)
- Cloudflare Workers (Serverless Runtime)
- Prisma ORM
- PostgreSQL Database
- Prisma Accelerate (Connection Pooling)

**Validation & Type Safety:**
- Zod (Runtime Validation)
- TypeScript (Type Safety)
- Shared Types via Common Package

**Authentication:**
- JWT (JSON Web Tokens)

## 📁 Project Structure

```
logverse/
├── backend/          # Cloudflare Workers API
├── frontend/         # React application
└── common/          # Shared types and validation
```

## ⚙️ Environment Setup

### 🔧 Backend `.env`

```env
DATABASE_URL="postgres://username:password@host/db"
JWT_SECRET="your_jwt_secret"
```

### ⚙️ Cloudflare Configuration (`wrangler.toml`)

```toml
name = "logverse-backend"
compatibility_date = "2023-12-01"

[vars]
DATABASE_URL = "your_prisma_accelerate_connection_url"
JWT_SECRET = "your_jwt_secret"
```

⚠️ **Important:** Never commit `.env` files or production secrets to GitHub. Always include `.env` in `.gitignore`.

## 🛠️ Installation & Running Locally

### Backend Setup

```bash
cd backend
npm install
npx prisma init
npx prisma migrate dev --name init_schema
npx prisma generate --no-engine
npm run dev
```

### Frontend Setup

```bash
cd frontend
npm install
npm run dev
```

### Common Package Setup (Monorepo)

```bash
cd common
npm install
npm run build
```

To link packages locally:

```bash
npm run dev --workspace=backend
npm run dev --workspace=frontend
```

## 🔐 Authentication Endpoints

| Method | Endpoint | Description |
|--------|----------|-------------|
| `POST` | `/api/v1/user/signup` | Register a new user |
| `POST` | `/api/v1/user/signin` | Login and receive JWT |

## 📰 Blog Endpoints

| Method | Endpoint | Description |
|--------|----------|-------------|
| `POST` | `/api/v1/blog` | Create a new blog (requires JWT) |
| `PUT` | `/api/v1/blog` | Update an existing blog (requires JWT) |
| `GET` | `/api/v1/blog/:id` | Fetch a single blog |
| `GET` | `/api/v1/blog/bulk` | Fetch all blogs |

## 🧱 Middleware

- **JWT Middleware:** Verifies token and attaches user ID to context.
- **Prisma Middleware:** (Optional) Initializes Prisma globally across routes.

## 🧩 Validation Example (Zod)

```typescript
import { z } from "zod";

export const signupSchema = z.object({
  email: z.string().email(),
  password: z.string().min(6),
});

export type SignupInput = z.infer<typeof signupSchema>;
```

## ☁️ Deployment (Cloudflare Workers)

```bash
npx wrangler login
npm run deploy
```

Once deployed, go to **Cloudflare Dashboard → Workers → Settings** and add the environment variables `DATABASE_URL` and `JWT_SECRET`.

## 👨‍💻 Author

**👤 Tridibesh Samantroy**

🎓 Student

🚀 Passionate about building real-world, scalable applications using modern web technologies.

### 📬 Connect with me:

- GitHub: [@tridibesh](https://github.com/TridibeshSam31)
- LinkedIn: [Tridibesh Samantroy](www.linkedin.com/in/tridibesh-samantroy-572538329)

## 🏁 Future Improvements

- 🪶 Add a rich-text editor (Quill.js / TipTap)
- 💬 Enable comments and likes
- 📸 Support image uploads via Cloudflare R2
- 🔍 Implement search, filters, and pagination
- 📊 Build author dashboard with analytics

## 🧭 References

- [Hono Documentation](https://hono.dev)
- [Prisma Accelerate](https://www.prisma.io/data-platform/accelerate)
- [Cloudflare Workers](https://developers.cloudflare.com/workers)
- [Zod Validation](https://zod.dev)

