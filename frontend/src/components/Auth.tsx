//@ts-ignore
import React, { useState, type ChangeEvent } from 'react'
import { Link } from 'react-router-dom'
import {SignupInput} from "@tridibeshsamantroy/blog-common"

// ALTERNATE IMPORTS (if you want to add API calls):
// import { useNavigate } from 'react-router-dom'
// import axios from 'axios'
// import { BACKEND_URL } from '../config'

//@ts-ignore
const Auth = ({type}:{type:"signup"|"signin"}) => {
    //we could have used that old method i.e having three state variables name , usernamae,password and then seperaely set them instead of using spreadoperator
    const [postInputs,setPostInputs] = useState<SignupInput>({
        name:"",
        username:"",
        password:""
    })

    // ALTERNATE METHOD: add these if you want actual API calls
    // const navigate = useNavigate()
    // const [error, setError] = useState("")
    // const [loading, setLoading] = useState(false)
    //
    // const sendRequest = async () => {
    //     setError("")
    //     setLoading(true)
    //     try {
    //         if (type === "signup") {
    //             const response = await axios.post(`${BACKEND_URL}/api/v1/user/signup`, {
    //                 name: postInputs.name,
    //                 username: postInputs.username,
    //                 password: postInputs.password,
    //             })
    //             const jwt = response.data
    //             localStorage.setItem("token", jwt)
    //             localStorage.setItem("username", postInputs.name || postInputs.username)
    //             navigate("/blogs")
    //         } else {
    //             const response = await axios.post(`${BACKEND_URL}/api/v1/user/signin`, {
    //                 username: postInputs.username,
    //                 password: postInputs.password,
    //             })
    //             const jwt = response.data
    //             localStorage.setItem("token", jwt)
    //             localStorage.setItem("username", postInputs.username)
    //             navigate("/blogs")
    //         }
    //     } catch (e: any) {
    //         setError(e?.response?.data?.message || "Something went wrong. Please try again.")
    //     } finally {
    //         setLoading(false)
    //     }
    // }

  return (
    <div className="h-screen flex justify-center flex-col">
        <div className="flex justify-center">
         <div>
            <div className='px-10'>
                <div className="text-3xl font-extrabold">
                    Create An Account
                </div>
                <div className="text-slate-400">
                    {type === "signin" ? "Don't Have An Account ?" : "Already Have An Account"}
                    {/* BUG FIX: removed the hardcoded duplicate "Already Have An Account ?" text that was always showing */}
                    {/* ALSO FIX: second Link text was always "Sign up" for both — changed signin link to "Sign in" */}
                    Already Have An Account ? <Link className="pl-2 underline" to={type === "signin" ? "/signup":"/signin"}>{type === "signin" ? "Sign up": "Sign in"}</Link>
                </div>
            </div>
            <div>
            {/* ALTERNATE: hide Name field on signin — {type === "signup" && <LabelledInput label="Name" ... />} */}
            <LabelledInput label="Name" placeholder='Name' onChange={(e)=>{
                setPostInputs({
                    ...postInputs,
                    name:e.target.value
                })
            }} />
            <LabelledInput label="Username" placeholder='example@gmail.com' onChange={(e)=>{
                setPostInputs({
                    ...postInputs,
                    username:e.target.value  // BUG FIX: was `name` before
                })
            }} />
            <LabelledInput label="Password" type={"password"} placeholder='123456' onChange={(e)=>{
                setPostInputs({
                    ...postInputs,
                    password:e.target.value  // BUG FIX: was `name` before
                })
            }} />

            {/* ALTERNATE: show error message if API call fails */}
            {/* {error && <div className="mt-3 text-sm text-red-600">{error}</div>} */}

            {/* ALTERNATE: onClick={sendRequest} disabled={loading} — to wire up API */}
            {/* {loading ? "Please wait..." : type==="signup"?"Sign up" : "Sign in"} — for loading text */}
            <button type="submit" className='mt-8 w-full text-white bg-gray-800 hover:bg-gray-900 focus:outline-none focus:ring-4 focus:ring-gray-300 font-medium rounded-lg text-sm px-5 py-2.5 me-2 mb-2 '>{type==="signup"?"Sign up" : "sign in"}</button>
            </div>
         </div>
            
            
        </div>
     
    </div>
  )
}

interface LabelledInputProps{
    label:string,
    placeholder:string,
    onChange:(e:ChangeEvent<HTMLInputElement>)=>void
    type?:string
}

function LabelledInput({label,placeholder,onChange,type}:LabelledInputProps){
    return(
    <div>
    <label className="block mb-2 text-sm font-semibold text-black">{label}</label>
    {/* BUG FIX: was always type={"text"} — now uses the `type` prop so password field works */}
    {/* ALTERNATE: type={type ?? "text"} */}
    <input onChange={onChange} type={type || "text"} id="first_name" className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:border-blue-500 block w-full p-2.5 " placeholder={placeholder} required />
    </div>
    )
   
}

export default Auth