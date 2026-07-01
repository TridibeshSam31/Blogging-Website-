import { useState, useEffect } from 'react'
import axios from "axios"
import { BACKEND_URL } from "../config"

export interface Blog {
  "content": string,
  "title": string,
  "id": number,
  "author": {
    "name": string
  }
}

// Fetches a SINGLE blog by id
const useBlog = ({ id }: { id: string }) => {
  const [loading, setLoading] = useState(true)
  const [blog, setBlog] = useState<Blog | null>(null)

  useEffect(() => {
    axios.get(`${BACKEND_URL}/api/v1/blog/${id}`, {
      headers: {
        Authorization: localStorage.getItem("token") || ""
      }
    })
      .then((response) => {
        setBlog(response.data.blog)
        setLoading(false)
      })
      .catch(() => setLoading(false))
  }, [id])

  return {
    loading,
    blog
  }
}

export default useBlog
