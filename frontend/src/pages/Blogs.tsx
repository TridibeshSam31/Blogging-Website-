//@ts-ignore
import React from 'react'
import BlogCard from '../components/BlogCard'
import { Navbar } from '../components/Navbar'
import useBlog from '../hooks/useBlog'

const Blogs = () => {

  const {loading,blog} = useBlog()

  if (loading) {
    return <div>Loading...</div>
    
  }
  return (
  <div>
   <Navbar/>
    <div className='flex justify-center'>
      <div>
        {blog.map(blog => (
          <BlogCard 
             id={blog.id}
            key={blog.id}
            authorName={blog.author.name || "Unkonwn"}
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