//@ts-ignore
import React from 'react'
import { Link } from 'react-router-dom'
//@ts-ignore
const Auth = ({type}:{type:"signup"|"signin"}) => {
  return (
    <div className="h-screen flex justify-center flex-col">
        <div className="flex justify-center">
            <div>
                <div className="text-3xl font-extrabold">
                    Create An Account
                </div>
                <div className="text-slate-400">
                    Already Have An Account ? <Link className="pl-2 underline" to={"/signin"}>Login</Link>
                </div>
            </div>
        </div>
     
    </div>
  )
}

export default Auth