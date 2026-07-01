import { useEffect, useState } from "react"
import axios from "axios"
import { BACKEND_URL } from "../config"
import type { Blog } from "./useBlog"

// Fetches ALL blogs (bulk)
export const useBlogs = () => {
  const [loading, setLoading] = useState(true)
  const [blogs, setBlogs] = useState<Blog[]>([])

  useEffect(() => {
    axios.get(`${BACKEND_URL}/api/v1/blog/bulk`, {
      headers: {
        Authorization: localStorage.getItem("token") || ""
      }
    })
      .then((response) => {
        setBlogs(response.data.blogs)   // backend returns { blogs }
        setLoading(false)
      })
      .catch(() => setLoading(false))
  }, [])

  return {
    loading,
    blogs
  }
}