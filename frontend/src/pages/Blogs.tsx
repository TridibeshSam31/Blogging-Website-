import React from 'react'
import BlogCard from '../components/BlogCard'
import { Navbar } from '../components/Navbar'
import { useBlogs } from '../hooks/useBlogs'
import { BlogCardSkeleton } from '../components/BlogSkeleton'

const Blogs = () => {
  const { loading, blogs } = useBlogs()

  if (loading) {
    return (
      <div>
        <Navbar />
        <div className='flex justify-center'>
          <div>
            <BlogCardSkeleton />
            <BlogCardSkeleton />
            <BlogCardSkeleton />
          </div>
        </div>
      </div>
    )
  }

  return (
    <div>
      <Navbar />
      <div className='flex justify-center'>
        <div>
          {blogs.map(blog => (
            <BlogCard
            //@ts-ignore
              id={blog.id}
              key={blog.id}
              authorName={blog.author.name || "Unknown"}
              title={blog.title}
              content={blog.content}
              publishDate={"June 20, 2025"}
            />
          ))}
        </div>
      </div>
    </div>
  )
}

export default Blogs