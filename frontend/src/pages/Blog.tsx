//@ts-ignore
import React from 'react'
import { useBlogs } from '../hooks/useBlogs'
import { useParams } from 'react-router-dom'

const Blog = () => {
  const {id} = useParams()
  const {loading,blogs} = useBlogs({id:id||""})

  if (loading) {
    <div>
      loading...
    </div>
  }
  return (
    <div>Blog</div>
  )
}

export default Blog