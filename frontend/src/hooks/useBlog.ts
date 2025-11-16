import React,{useState,useEffect} from 'react'
import axios from "axios"
import {BACKEND_URL} from "../config"

const useBlog = () => {
    const [loading,setLoading] = useState(true)
    const [blogs,setBlogs] = useState([])

        useEffect(() => {
            axios.get(`${BACKEND_URL}/api/v1/blog/bulk`, {
              headers:{
                Authorization: localStorage.getItem("token") || ""
              }
            })
            .then((Response)=>{
                setBlogs(Response.data.blogs)
                setLoading(false)
            })
        },[])
    
  return {
    loading,
    blogs
  }
}

export default useBlog
