
import { FullBlog } from '../components/FullBlog'
import { useParams } from 'react-router-dom'
import useBlog from '../hooks/useBlog'
import { BlogSkeleton } from '../components/BlogSkeleton'

const Blog = () => {
  const { id } = useParams<{ id: string }>()
  const { loading, blog } = useBlog({ id: id || "" })

  if (loading) {
    return (
      <div>
        <BlogSkeleton />
      </div>
    )
  }

  if (!blog) {
    return (
      <div className="flex items-center justify-center h-screen">
        <p className="text-slate-500 text-xl">Blog post not found.</p>
      </div>
    )
  }

  return <FullBlog blog={blog} />
}

export default Blog