//@ts-ignore
import React from 'react'
import BlogCard from '../components/BlogCard'
import { Navbar } from '../components/Navbar'

const Blogs = () => {
  return (
  <div>
   <Navbar/>
    <div className='flex justify-center'>
      <div className='max-w-xl'>
        <BlogCard 
        authorName='Tridibesh'
        title={"How an ugly single page website makes $5000 a month with affiliate marketing"}
        content={"ok fine"}
        publishDate={"June 20, 2025"} 
        /> 
      </div>
        
    </div>
  </div>
  )
}

export default Blogs