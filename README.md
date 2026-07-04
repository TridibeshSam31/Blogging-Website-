# 🪐 LogVerse — Modern Serverless Blogging Platform

[![Live Demo](https://img.shields.io/badge/Live_Demo-Vercel-success?style=for-the-badge&logo=vercel&logoColor=white)](https://blogging-website-frontend-9f831feu6.vercel.app)
![TypeScript](https://img.shields.io/badge/TypeScript-007ACC?style=for-the-badge&logo=typescript&logoColor=white)
![React](https://img.shields.io/badge/React-20232A?style=for-the-badge&logo=react&logoColor=61DAFB)
![Hono](https://img.shields.io/badge/Hono-E36002?style=for-the-badge&logo=hono&logoColor=white)
![Prisma](https://img.shields.io/badge/Prisma-3982CE?style=for-the-badge&logo=Prisma&logoColor=white)
![PostgreSQL](https://img.shields.io/badge/PostgreSQL-316192?style=for-the-badge&logo=postgresql&logoColor=white)
![Cloudflare Workers](https://img.shields.io/badge/Cloudflare_Workers-F38020?style=for-the-badge&logo=cloudflare&logoColor=white)
![Zod](https://img.shields.io/badge/Zod-3E67B1?style=for-the-badge&logo=zod&logoColor=white)

LogVerse is a premium, full-stack, serverless blogging platform designed for high performance, infinite scalability, and type safety. Built as a monorepo, it leverages a React frontend deployed on Vercel, and a serverless Hono API deployed on Cloudflare Workers communicating with Neon PostgreSQL database through Prisma ORM.

---

## 📸 Application Showcases

### 🔑 Authentication Flow
Secure, interactive authorization system with custom forms and professional client validation.
<div align="center">
  <table border="0">
    <tr>
      <td width="50%">
        <p align="center"><b>Sign In Page</b></p>
        <img src="screenshots/signin.png" alt="Sign In Page" width="100%"/>
      </td>
      <td width="50%">
        <p align="center"><b>Sign Up Page</b></p>
        <img src="screenshots/signup.png" alt="Sign Up Page" width="100%"/>
      </td>
    </tr>
  </table>
</div>

### 📰 Dashboard & Feed
A minimal, clean, and elegant feed showing articles sorted chronologically with read-time calculations.
<p align="center">
  <img src="screenshots/feed.png" alt="LogVerse Main Feed" width="100%"/>
</p>

### ✍️ Publish New Articles
Write and distribute content with a clean, distracted-free writing workspace.
<p align="center">
  <img src="screenshots/publish.png" alt="Create New Post" width="100%"/>
</p>

### 👤 Profile & Dashboard States
Responsive empty states and lists of user-authored posts.
<p align="center">
  <img src="screenshots/my_blogs.png" alt="My Blogs" width="100%"/>
</p>

---

## ⚡ Key Features

- 🌐 **Serverless Architecture**: Instant loading and global distribution via Cloudflare Workers.
- 🔗 **Full Stack Type-Safety**: Sharing data schemas and validation models between frontend and backend via a shared `common` module.
- 🔐 **Stateless Security**: Secure JWT validation using modern cryptography.
- 🐘 **Reliable Database**: PostgreSQL hosted on Neon DB with connection-pooling using Prisma Accelerate.
- ⚡ **Lightweight Backend Framework**: Fast route processing with Hono framework.
- 🛡️ **Defensive Validation**: Custom payload cleaning using Zod schemas.
- 💅 **Polished UI**: Modern typography, responsive panels, clean loaders, and micro-interactions powered by TailwindCSS.

---

## 🏗️ Architecture & Data Flow

```mermaid
graph TD
    A[React Client - Vercel] <-->|HTTP Request + JWT| B(Hono API - Cloudflare Worker)
    B <-->|Prisma ORM + driverAdapters| C[(Neon PostgreSQL Serverless)]
    D[Shared 'common' Package] -.->|Zod Validation / Types| A
    D -.->|Zod Validation / Types| B
```

---

## 📁 Directory Structure

```
Blogging/
├── Backend/            # Hono API + Prisma Database Layer
├── frontend/           # React SPA Client App
├── common/             # Shared validation schemas & Type declarations
└── screenshots/        # Application showcase images
```

---

## ⚙️ Development Setup & Installation

### Prerequisite Environment Configurations

#### 🔑 Backend Secrets (`Backend/.env`)
Create a `.env` file in the `Backend` directory:
```env
DATABASE_URL="postgresql://neondb_owner:YOUR_NEON_PASSWORD@host/neondb?sslmode=require"
JWT_SECRET="your-ultra-secure-jwt-key"
```

#### ⚙️ Cloudflare Local Secrets (`Backend/.dev.vars`)
Create a `.dev.vars` file in the `Backend` directory for local Cloudflare Worker emulation:
```env
DATABASE_URL="postgresql://neondb_owner:YOUR_NEON_PASSWORD@host/neondb?sslmode=require"
JWT_SECRET="your-ultra-secure-jwt-key"
```

#### 🌩️ Wrangler Configuration (`Backend/wrangler.toml`)
Ensure Wrangler matches serverless environment specifications:
```toml
name = "Backend"
compatibility_date = "2023-12-01"

[vars]
DATABASE_URL = "postgresql://neondb_owner:YOUR_NEON_PASSWORD@host/neondb?sslmode=require"
JWT_SECRET = "your-ultra-secure-jwt-key"
```

---

### 🛠️ Local Build Sequence

Follow this step-by-step setup to spin up the monorepo:

#### Step 1: Install & Build Common Schema package
```bash
cd common
npm install
npm run build
```

#### Step 2: Configure & Run Backend Database & server
```bash
cd ../Backend
npm install
npx prisma generate
npx prisma db push
npm run dev
```

#### Step 3: Launch React Frontend
```bash
cd ../frontend
npm install
npm run dev
```

---

## 🗄️ Database Schema (Prisma Models)

```prisma
model User {
  id       String    @id @default(uuid())
  username String    @unique
  name     String?
  password String
  posts    Post[]
  comment  comment[]
  likes    like[]
}

model Post {
  id        String    @id @default(uuid())
  title     String
  content   String
  published Boolean   @default(false)
  authorId  String
  author    User      @relation(fields: [authorId], references: [id])
  comments  comment[]
  likes     like[]
  createdAt DateTime  @default(now())
  updatedAt DateTime  @updatedAt
}

model like {
  id        String   @id @default(uuid())
  user      User     @relation(fields: [userId], references: [id], onDelete: Cascade)
  post      Post     @relation(fields: [postId], references: [id], onDelete: Cascade)
  userId    String
  postId    String
  createdAt DateTime @default(now())
}

model comment {
  id        String   @id @default(uuid())
  authorId  String 
  postId    String 
  user      User     @relation(fields: [authorId], references: [id], onDelete: Cascade)
  post      Post     @relation(fields: [postId], references: [id], onDelete: Cascade)
  comment   String 
  createdAt DateTime @default(now()) 
  updatedAt DateTime @updatedAt
}
```

---

## 📡 API Specification Reference

### 🔐 Authentication Routes

| Route | Method | Payload | Headers | Description |
| :--- | :--- | :--- | :--- | :--- |
| `/api/v1/user/signup` | `POST` | `SignupInput` | None | Registers a new account, returns JWT token. |
| `/api/v1/user/signin` | `POST` | `SigninInput` | None | Authenticates user credentials, returns JWT token. |

### 📰 Blog Content Routes

| Route | Method | Payload | Headers | Description |
| :--- | :--- | :--- | :--- | :--- |
| `/api/v1/blog` | `POST` | `CreatePostInput` | `Authorization: <JWT>` | Publishes a new blog post. |
| `/api/v1/blog` | `PUT` | `UpdatePostInput` | `Authorization: <JWT>` | Updates an existing post's text. |
| `/api/v1/blog/:id` | `GET` | None | `Authorization: <JWT>` | Retrieves a single post (with comments & likes). |
| `/api/v1/blog/bulk` | `GET` | None | `Authorization: <JWT>` | Returns feed posts. |
| `/api/v1/blog/me/blogs` | `GET` | None | `Authorization: <JWT>` | Retrieves all posts authored by the logged-in user. |
| `/api/v1/blog/:id` | `DELETE` | None | `Authorization: <JWT>` | Deletes a specific blog post by ID (Author only). |

### 💬 Comment Routes

| Route | Method | Payload | Headers | Description |
| :--- | :--- | :--- | :--- | :--- |
| `/api/v1/blog/:id/comment` | `POST` | `{ comment: string }` | `Authorization: <JWT>` | Adds a new comment to a post. |
| `/api/v1/blog/:id/comment/:commentId` | `PATCH` | `{ comment: string }` | `Authorization: <JWT>` | Modifies an existing comment (Author only). |
| `/api/v1/blog/:id/comment/:commentId` | `DELETE` | None | `Authorization: <JWT>` | Deletes a comment by ID (Author only). |

### 👍 Like Routes

| Route | Method | Payload | Headers | Description |
| :--- | :--- | :--- | :--- | :--- |
| `/api/v1/blog/:id/like` | `POST` | None | `Authorization: <JWT>` | Likes a blog post (Max 1 per user). |
| `/api/v1/blog/:id/like/:likeId` | `DELETE` | None | `Authorization: <JWT>` | Unlikes a blog post by ID. |

---

## 🚀 Deployment Guide

### Backend (Cloudflare Workers)
Authenticate Cloudflare CLI and deploy worker instance:
```bash
cd Backend
npx wrangler login
npm run deploy
```
*Note: Make sure to define production secrets `DATABASE_URL` and `JWT_SECRET` in your Cloudflare dashboard.*

### Frontend (Vercel)
The client frontend is configured to deploy instantly on Vercel. 
Simply push the code to a Git repository, link it to Vercel, set the environment variables to point to your live Cloudflare Worker URL, and deploy.

---

## 📓 Real-World Engineering Insights & Troubleshooting

During development, we resolved several architecture constraints. Below are key insights:

<details>
<summary>🛠️ Click to expand development troubleshooting notes</summary>

### 1. Cloudflare Workers vs Neon DB Driver Adapters
* **Issue**: Standard Node database clients rely on native socket pools which fail inside the V8 serverless worker runtime.
* **Solution**: Configured Prisma with the `driverAdapters` preview feature and initialized the client using serverless Neon connection pool adapters:
  ```typescript
  import { PrismaNeon } from '@prisma/adapter-neon'
  import { Pool } from '@neondatabase/serverless'
  // Initialized correctly in Worker request execution context
  ```

### 2. Upgrading Hono JWT Signature Parameters
* **Issue**: Transitioning across newer Hono versions generated runtime `JwtAlgorithmRequired` errors due to strict schema changes in verification methods.
* **Solution**: Reconfigured validation middlewares to explicitly supply matching algorithms:
  ```diff
  - verify(token, secret)
  + verify(token, secret, "HS256")
  ```

### 3. Database Schema Re-Synchronization
* **Issue**: Local database structures can fall out of sync with Prisma models, causing schema mismatches (`invalid input syntax for type integer`).
* **Solution**: Do not run `db pull` directly as it overrides your current configuration. Instead, update your `schema.prisma` and reset database schema safely with:
  ```bash
  npx prisma migrate reset
  ```
</details>

## 🔮 Roadmap & Future Scope

Here is a list of features slated for upcoming releases to make LogVerse a more robust content publishing platform:

- ✍️ **Rich-Text Editor Integration**: Introduce a professional formatting workspace using **Quill** / **Quillbot** / **TipTap** on the frontend, enabling authors to format text, highlight code snippets, embed media, and draft cleanly.
- 🖼️ **Media & Image Support**: Implement secure image uploads powered by **Cloudflare R2** serverless object storage and **Cloudinary** for transformations, dynamic scaling, image compression, and high-performance CDN delivery.
- 🔍 **Search, Filters & Pagination**: Build fuzzy search algorithms and category tagging, supported by server-side cursor-based pagination to optimize database performance for large feeds.
- 📊 **Creator Analytics Dashboard**: Design interactive charts displaying read counts, likes over time, comment velocity, and follower metrics.

---

## 👨‍💻 Author & Developer

**Tridibesh Samantroy**
* 🎓 Student Developer
* 🚀 Passionate about high-throughput web architectures, Edge environments, and Serverless cloud operations.

### Let's Connect!
[![GitHub](https://img.shields.io/badge/GitHub-100000?style=for-the-badge&logo=github&logoColor=white)](https://github.com/TridibeshSam31)
[![LinkedIn](https://img.shields.io/badge/LinkedIn-0077B5?style=for-the-badge&logo=linkedin&logoColor=white)](https://www.linkedin.com/in/tridibesh-samantroy-572538329)

---
*Developed with ❤️ as a modern serverless application.*
