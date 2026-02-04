//@ts-ignore
import React, { useState, type ChangeEvent } from 'react'
import { Link } from 'react-router-dom'
import {SignupInput} from "@tridibeshsamantroy/blog-common"
//@ts-ignore
const Auth = ({type}:{type:"signup"|"signin"}) => {
    //we could have used that old method i.e having three state variables name , usernamae,password and then seperaely set them instead of using spreadoperator
    const [postInputs,setPostInputs] = useState<SignupInput>({
        name:"",
        username:"",
        password:""
    })
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
                    Already Have An Account ? <Link className="pl-2 underline" to={type === "signin" ? "/signup":"/signin"}>{type === "signin" ? "Sign up": "Sign up"}</Link>
                </div>
            </div>
            <div>
            <LabelledInput label="Name" placeholder='Name' onChange={(e)=>{
                setPostInputs({
                    ...postInputs,
                    name:e.target.value
                })
            }} />
            <LabelledInput label="Username" placeholder='example@gmail.com' onChange={(e)=>{
                setPostInputs({
                    ...postInputs,
                    name:e.target.value
                })
            }} />
            <LabelledInput label="Password" type={"password"} placeholder='123456' onChange={(e)=>{
                setPostInputs({
                    ...postInputs,
                    name:e.target.value
                })
            }} />
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

function LabelledInput({label,placeholder,onChange}:LabelledInputProps){
    return(
    <div>
    <label className="block mb-2 text-sm font-semibold text-black">{label}</label>
    <input onChange={onChange} type={"text"} id="first_name" className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:border-blue-500 block w-full p-2.5 " placeholder={placeholder} required />
    </div>
    )
   
}

export default Auth