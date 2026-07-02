import  { useState } from 'react'
import { Navbar } from '../components/Navbar'
import axios from 'axios'
import { BACKEND_URL } from '../config'
import { useNavigate } from 'react-router-dom'

const Publish = () => {

  //handle the states for publish 
  //title , content , loading , error and rest for navigation we use useNavigate hook 

  const [title, setTitle] = useState("")
  const [content, setContent] = useState("")
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState("")
  const navigate = useNavigate()

  const handlePublish = async () => {
    if (!title.trim() || !content.trim()) {
      setError("Title and content cannot be empty.")
      return
    }
    setLoading(true)
    setError("")
    try {

      const token = localStorage.getItem("token")
       await axios.post(`${BACKEND_URL}/api/v1/blog`,
        { title, content },
        { headers: { Authorization: token || "" } }
      )


      navigate("/blogs")

    } catch {
      setError("Failed to publish . pls try again")

    } finally {
      setLoading(false)

    }
  }

  return (
    <div>
      <Navbar />
      <div className='flex justify-center mt-10 px-4'>
        <div className='w-full max-w-2xl'>
          <h1 className='text-3xl font-extrabold mb-6 text-gray-900'>Create New Post</h1>

          <div className='mb-4'>
            <input
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              type="text"
              placeholder='Post title...'
              className='w-full text-2xl font-semibold border-b border-gray-300 focus:outline-none focus:border-gray-600 py-2 bg-transparent placeholder-gray-300'
            />
          </div>

          <div className='mb-6'>
            <textarea
              value={content}
              onChange={(e) => setContent(e.target.value)}
              rows={16}
              placeholder='Tell your story...'
              className='w-full text-base border border-gray-200 rounded-lg focus:outline-none focus:border-gray-400 p-4 bg-gray-50 resize-none placeholder-gray-300 leading-relaxed'
            />
          </div>

          {error && (
            <div className="mb-4 text-sm text-red-600 bg-red-50 border border-red-200 rounded-lg px-3 py-2">
              {error}
            </div>
          )}

          <div className='flex items-center gap-4'>
            <button
              onClick={handlePublish}
              disabled={loading}
              className='text-white bg-green-600 hover:bg-green-700 focus:outline-none focus:ring-4 focus:ring-green-300 font-medium rounded-full text-sm px-6 py-2.5 disabled:opacity-60 disabled:cursor-not-allowed'
            >
              {loading ? "Publishing..." : "Publish"}
            </button>
            <button
              onClick={() => navigate("/blogs")}
              className='text-gray-500 hover:text-gray-800 font-medium text-sm'
            >
              Cancel
            </button>
          </div>
        </div>
      </div>
    </div>
  )
}

export default Publish
