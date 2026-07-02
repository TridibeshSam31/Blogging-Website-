import { useState, useEffect } from 'react'
import axios from 'axios'
import { BACKEND_URL } from '../config'

export interface MyBlog {
  id: string
  title: string
  content: string
  createdAt: string
  updatedAt: string
}

const useMyBlogs = () => {
  const [loading, setLoading] = useState(true)
  const [blogs, setBlogs] = useState<MyBlog[]>([])

  useEffect(() => {
    axios.get(`${BACKEND_URL}/api/v1/blog/me/blogs`, {
      headers: {
        Authorization: localStorage.getItem("token") || ""
      }
    })
      .then((response) => {
        setBlogs(response.data.blogs)
        setLoading(false)
      })
      .catch(() => setLoading(false))
  }, [])

  return { loading, blogs, setBlogs }
}

export default useMyBlogs
