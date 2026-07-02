import { useState } from "react"
import { useNavigate } from "react-router-dom"
import { Navbar } from "../components/Navbar"
import type { Blog, Comment } from "../hooks/useBlog"
import { Avatar } from "./BlogCard"
import axios from "axios"
import { BACKEND_URL } from "../config"

export const FullBlog = ({ blog }: { blog: Blog }) => {
  const navigate = useNavigate()
  const currentUserId = localStorage.getItem("userId") || ""
  const token = localStorage.getItem("token") || ""

  
  const userExistingLike = blog.likes.find((l) => l.userId === currentUserId)
  const [liked, setLiked] = useState(!!userExistingLike)
  const [likeId, setLikeId] = useState<string | null>(userExistingLike?.id ?? null)
  const [likeCount, setLikeCount] = useState(blog.likes.length)
  const [likeLoading, setLikeLoading] = useState(false)

  const handleLike = async () => {
    if (likeLoading) return
    setLikeLoading(true)
    try {
      if (!liked) {
        const res = await axios.post(
          `${BACKEND_URL}/api/v1/blog/${blog.id}/like`,
          {},
          { headers: { Authorization: token } }
        )
        setLiked(true)
        setLikeId(res.data.createLike.id)
        setLikeCount((c) => c + 1)
      } else if (likeId) {
        await axios.delete(
          `${BACKEND_URL}/api/v1/blog/${blog.id}/like/${likeId}`,
          { headers: { Authorization: token } }
        )
        setLiked(false)
        setLikeId(null)
        setLikeCount((c) => c - 1)
      }
    } catch (e) {
      console.error("Like error", e)
    } finally {
      setLikeLoading(false)
    }
  }

 
  const [deleteLoading, setDeleteLoading] = useState(false)

  const handleDeleteBlog = async () => {
    if (!confirm("Are you sure you want to delete this blog?")) return
    setDeleteLoading(true)
    try {
      await axios.delete(`${BACKEND_URL}/api/v1/blog/${blog.id}`, {
        headers: { Authorization: token }
      })
      navigate("/blogs")
    } catch (e) {
      console.error("Delete blog error", e)
    } finally {
      setDeleteLoading(false)
    }
  }

  
  const [comments, setComments] = useState<Comment[]>(blog.comments)
  const [newComment, setNewComment] = useState("")
  const [commentLoading, setCommentLoading] = useState(false)
  const [editingId, setEditingId] = useState<string | null>(null)
  const [editText, setEditText] = useState("")

  const handleAddComment = async () => {
    if (!newComment.trim()) return
    setCommentLoading(true)
    try {
      const res = await axios.post(
        `${BACKEND_URL}/api/v1/blog/${blog.id}/comment`,
        { comment: newComment },
        { headers: { Authorization: token } }
      )
      // Optimistically add with a placeholder author name
      const created = res.data.comment
      setComments((prev) => [
        { ...created, author: { name: "You" } },
        ...prev,
      ])
      setNewComment("")
    } catch (e) {
      console.error("Comment error", e)
    } finally {
      setCommentLoading(false)
    }
  }

  const handleDeleteComment = async (commentId: string) => {
    try {
      await axios.delete(
        `${BACKEND_URL}/api/v1/blog/${blog.id}/comment/${commentId}`,
        { headers: { Authorization: token } }
      )
      setComments((prev) => prev.filter((c) => c.id !== commentId))
    } catch (e) {
      console.error("Delete comment error", e)
    }
  }

  const handleEditComment = async (commentId: string) => {
    if (!editText.trim()) return
    try {
      await axios.patch(
        `${BACKEND_URL}/api/v1/blog/${blog.id}/comment/${commentId}`,
        { comment: editText },
        { headers: { Authorization: token } }
      )
      setComments((prev) =>
        prev.map((c) => (c.id === commentId ? { ...c, comment: editText } : c))
      )
      setEditingId(null)
      setEditText("")
    } catch (e) {
      console.error("Edit comment error", e)
    }
  }

  return (
    <div>
      <Navbar />
      <div className="flex justify-center">
        <div className="grid grid-cols-12 px-10 w-full max-w-screen-xl pt-12 gap-6">

          
          <div className="col-span-8">
            <div className="text-3xl font-extrabold">{blog.title}</div>
            <div className="text-slate-500 pt-2 text-sm">
              {new Date(blog.createdAt).toLocaleDateString("en-IN", {
                year: "numeric", month: "long", day: "numeric"
              })}
            </div>

           
            <div className="flex items-center gap-4 mt-4">
              <button
                onClick={handleLike}
                disabled={likeLoading}
                className={`flex items-center gap-2 px-4 py-1.5 rounded-full text-sm font-medium border transition-all
                  ${liked
                    ? "bg-red-50 border-red-300 text-red-600"
                    : "bg-white border-gray-300 text-gray-600 hover:border-red-300 hover:text-red-500"
                  } disabled:opacity-50`}
              >
                {liked ? "❤️" : "🤍"} {likeCount} {likeCount === 1 ? "Like" : "Likes"}
              </button>

             
              {blog.authorId === currentUserId && (
                <button
                  onClick={handleDeleteBlog}
                  disabled={deleteLoading}
                  className="flex items-center gap-1 px-4 py-1.5 rounded-full text-sm font-medium border border-red-300 text-red-600 hover:bg-red-50 transition-all disabled:opacity-50"
                >
                  🗑 {deleteLoading ? "Deleting..." : "Delete Blog"}
                </button>
              )}
            </div>

            <div className="pt-6 text-base leading-relaxed text-gray-800 whitespace-pre-line">
              {blog.content}
            </div>

            
            <div className="mt-10 border-t pt-8">
              <h2 className="text-xl font-bold mb-5">
                Comments ({comments.length})
              </h2>

              
              <div className="flex gap-3 mb-6">
                <textarea
                  value={newComment}
                  onChange={(e) => setNewComment(e.target.value)}
                  rows={2}
                  placeholder="Write a comment..."
                  className="flex-1 border border-gray-200 rounded-lg p-3 text-sm focus:outline-none focus:border-gray-400 bg-gray-50 resize-none"
                />
                <button
                  onClick={handleAddComment}
                  disabled={commentLoading || !newComment.trim()}
                  className="self-end px-4 py-2 bg-gray-800 text-white text-sm rounded-lg hover:bg-gray-900 disabled:opacity-50 disabled:cursor-not-allowed"
                >
                  {commentLoading ? "Posting..." : "Post"}
                </button>
              </div>

              
              {comments.length === 0 && (
                <p className="text-slate-400 text-sm">No comments yet. Be the first!</p>
              )}
              <div className="space-y-4">
                {comments.map((c) => (
                  <div key={c.id} className="bg-gray-50 border border-gray-100 rounded-lg p-4">
                    <div className="flex items-center justify-between mb-2">
                      <span className="text-sm font-semibold text-gray-700">
                        {c.author?.name || "Anonymous"}
                      </span>
                      {/* Edit / Delete — only for comment owner */}
                      {c.authorId === currentUserId && (
                        <div className="flex gap-2">
                          <button
                            onClick={() => {
                              setEditingId(c.id)
                              setEditText(c.comment)
                            }}
                            className="text-xs text-blue-500 hover:underline"
                          >
                            Edit
                          </button>
                          <button
                            onClick={() => handleDeleteComment(c.id)}
                            className="text-xs text-red-500 hover:underline"
                          >
                            Delete
                          </button>
                        </div>
                      )}
                    </div>

                    
                    {editingId === c.id ? (
                      <div className="flex gap-2 mt-1">
                        <input
                          value={editText}
                          onChange={(e) => setEditText(e.target.value)}
                          className="flex-1 border border-gray-300 rounded-lg px-3 py-1.5 text-sm focus:outline-none"
                        />
                        <button
                          onClick={() => handleEditComment(c.id)}
                          className="px-3 py-1.5 bg-gray-800 text-white text-xs rounded-lg hover:bg-gray-900"
                        >
                          Save
                        </button>
                        <button
                          onClick={() => setEditingId(null)}
                          className="px-3 py-1.5 text-gray-500 text-xs"
                        >
                          Cancel
                        </button>
                      </div>
                    ) : (
                      <p className="text-sm text-gray-700">{c.comment}</p>
                    )}
                  </div>
                ))}
              </div>
            </div>
          </div>

          
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