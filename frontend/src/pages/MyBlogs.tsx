import { useNavigate } from "react-router-dom"
import { Navbar } from "../components/Navbar"
import useMyBlogs from "../hooks/useMyBlogs"
import axios from "axios"
import { BACKEND_URL } from "../config"

const MyBlogs = () => {
  const navigate = useNavigate()
  const { loading, blogs, setBlogs } = useMyBlogs()

  const handleDelete = async (id: string) => {
    if (!confirm("Are you sure you want to delete this blog?")) return
    try {
      await axios.delete(`${BACKEND_URL}/api/v1/blog/${id}`, {
        headers: { Authorization: localStorage.getItem("token") || "" }
      })
      setBlogs((prev) => prev.filter((b) => b.id !== id))
    } catch (e) {
      console.error("Delete error", e)
    }
  }

  if (loading) {
    return (
      <div>
        <Navbar />
        <div className="flex justify-center items-center h-64">
          <div className="text-slate-400 text-lg animate-pulse">Loading your blogs...</div>
        </div>
      </div>
    )
  }

  return (
    <div>
      <Navbar />
      <div className="max-w-3xl mx-auto px-6 py-10">
        <div className="flex items-center justify-between mb-8">
          <h1 className="text-3xl font-extrabold text-gray-900">My Blogs</h1>
          <button
            onClick={() => navigate("/publish")}
            className="px-4 py-2 bg-green-600 hover:bg-green-700 text-white text-sm font-medium rounded-full"
          >
            + New Post
          </button>
        </div>

        {blogs.length === 0 ? (
          <div className="text-center py-20">
            <p className="text-slate-400 text-lg mb-4">You haven't written anything yet.</p>
            <button
              onClick={() => navigate("/publish")}
              className="px-6 py-2.5 bg-gray-800 text-white rounded-full text-sm hover:bg-gray-900"
            >
              Write your first blog
            </button>
          </div>
        ) : (
          <div className="space-y-5">
            {blogs.map((blog) => (
              <div
                key={blog.id}
                className="border border-gray-200 rounded-xl p-5 hover:shadow-md transition-shadow bg-white"
              >
                <div className="flex items-start justify-between gap-4">
                  <div className="flex-1">
                    <h2
                      onClick={() => navigate(`/blog/${blog.id}`)}
                      className="text-lg font-bold text-gray-900 hover:underline cursor-pointer line-clamp-1"
                    >
                      {blog.title}
                    </h2>
                    <p className="text-sm text-gray-500 mt-1 line-clamp-2">
                      {blog.content}
                    </p>
                    <div className="mt-2 text-xs text-slate-400">
                      {new Date(blog.createdAt).toLocaleDateString("en-IN", {
                        year: "numeric", month: "long", day: "numeric"
                      })}
                    </div>
                  </div>

                  <div className="flex gap-2 shrink-0 mt-1">
                    <button
                      onClick={() => navigate(`/blog/${blog.id}`)}
                      className="px-3 py-1.5 text-xs border border-gray-300 rounded-full text-gray-600 hover:border-gray-500 hover:text-gray-800 transition"
                    >
                      View
                    </button>
                    <button
                      onClick={() => handleDelete(blog.id)}
                      className="px-3 py-1.5 text-xs border border-red-300 rounded-full text-red-600 hover:bg-red-50 transition"
                    >
                      Delete
                    </button>
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  )
}

export default MyBlogs
