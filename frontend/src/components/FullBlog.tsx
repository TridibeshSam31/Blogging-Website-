import { Navbar } from "../components/Navbar"
import type { Blog } from "../hooks/useBlog"
import { Avatar } from "./BlogCard"

export const FullBlog = ({ blog }: { blog: Blog }) => {
  return (
    <div>
      <Navbar />
      <div className="flex justify-center">
        <div className="grid grid-cols-12 px-10 w-full max-w-screen-xl pt-12 gap-6">

          {/* Main content */}
          <div className="col-span-8">
            <div className="text-3xl font-extrabold">
              {blog.title}
            </div>
            <div className="text-slate-500 pt-2 text-sm">
              Posted on June 20, 2025
            </div>
            <div className="pt-6 text-base leading-relaxed text-gray-800 whitespace-pre-line">
              {blog.content}
            </div>
          </div>

          {/* Author sidebar */}
          <div className="col-span-4">
            <div className="text-slate-500 text-sm font-semibold uppercase tracking-wide mb-3">
              Author
            </div>
            <div className="flex items-center gap-3">
              <Avatar size="big" name={blog.author.name || "Unknown Author"} />
              <div className="text-lg font-bold">
                {blog.author.name || "Unknown Author"}
              </div>
            </div>
            <div className="pt-3 text-slate-500 text-sm leading-relaxed">
              Passionate writer sharing ideas, stories, and insights with the world.
            </div>
          </div>

        </div>
      </div>
    </div>
  )
}