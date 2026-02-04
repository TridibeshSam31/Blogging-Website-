
import { useEffect, useState } from "react"
import axios from "axios"
import {BACKEND_URL} from "../config"



interface Blog{
  "content":string,
  "title":string,
  "id":number,
  "author":{
      "name":string
  }

}




export const useBlogs = ({id}:{id:String}) => {
    const [loading,setLoading] = useState(true)
    const [blogs,setBlogs] = useState<Blog[]>([])

        useEffect(() => {
            axios.get(`${BACKEND_URL}/api/v1/blog/${id}`, {
              headers:{
                Authorization: localStorage.getItem("token") || ""
              }
            })
            .then((Response)=>{
                setBlogs(Response.data.blogs)
                setLoading(false)
            })
        },[id])
    
  return {
    loading,
    blogs
  }

}