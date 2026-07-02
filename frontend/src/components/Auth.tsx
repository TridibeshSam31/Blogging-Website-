import React, { useState, type ChangeEvent } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import axios from 'axios'
import { BACKEND_URL } from '../config'
import type { SignupInput } from "@tridibeshsamantroy/blog-common"

const Auth = ({ type }: { type: "signup" | "signin" }) => {
    const [postInputs, setPostInputs] = useState<SignupInput>({
        name: "",
        username: "",
        password: ""
    })
    const [error, setError] = useState("")
    const [loading, setLoading] = useState(false)
    const navigate = useNavigate()

    const sendRequest = async () => {
        setError("")
        setLoading(true)
        try {
            if (type === "signup") {
                const response = await axios.post(`${BACKEND_URL}/api/v1/user/signup`, {
                    name: postInputs.name,
                    username: postInputs.username,
                    password: postInputs.password,
                })
                localStorage.setItem("token", response.data.token)
                localStorage.setItem("userId", response.data.userId)
                navigate("/blogs")
            } else {
                const response = await axios.post(`${BACKEND_URL}/api/v1/user/signin`, {
                    username: postInputs.username,
                    password: postInputs.password,
                })
                localStorage.setItem("token", response.data.token)
                localStorage.setItem("userId", response.data.userId)
                navigate("/blogs")
            }
        } catch (e: any) {
            setError(e?.response?.data?.message || "Something went wrong. Please try again.")
        } finally {
            setLoading(false)
        }
    }

    return (
        <div className="h-screen flex justify-center flex-col">
            <div className="flex justify-center">
                <div>
                    <div className='px-10'>
                        <div className="text-3xl font-extrabold">
                            {type === "signup" ? "Create An Account" : "Welcome Back"}
                        </div>
                        <div className="text-slate-400 mt-1">
                            {type === "signin" ? "Don't have an account? " : "Already have an account? "}
                            <Link className="pl-1 underline" to={type === "signin" ? "/signup" : "/signin"}>
                                {type === "signin" ? "Sign up" : "Sign in"}
                            </Link>
                        </div>
                    </div>
                    <div className="mt-4 px-10">
                        {type === "signup" && (
                            <LabelledInput label="Name" placeholder='Your name' onChange={(e) => {
                                setPostInputs({ ...postInputs, name: e.target.value })
                            }} />
                        )}
                        <LabelledInput label="Username" placeholder='example@gmail.com' onChange={(e) => {
                            setPostInputs({ ...postInputs, username: e.target.value })
                        }} />
                        <LabelledInput label="Password" type="password" placeholder='••••••' onChange={(e) => {
                            setPostInputs({ ...postInputs, password: e.target.value })
                        }} />

                        {error && (
                            <div className="mt-3 text-sm text-red-600 bg-red-50 border border-red-200 rounded-lg px-3 py-2">
                                {error}
                            </div>
                        )}

                        <button
                            onClick={sendRequest}
                            disabled={loading}
                            className='mt-6 w-full text-white bg-gray-800 hover:bg-gray-900 focus:outline-none focus:ring-4 focus:ring-gray-300 font-medium rounded-lg text-sm px-5 py-2.5 disabled:opacity-60 disabled:cursor-not-allowed'
                        >
                            {loading ? "Please wait..." : type === "signup" ? "Sign up" : "Sign in"}
                        </button>
                    </div>
                </div>
            </div>
        </div>
    )
}

interface LabelledInputProps {
    label: string,
    placeholder: string,
    onChange: (e: ChangeEvent<HTMLInputElement>) => void
    type?: string
}

function LabelledInput({ label, placeholder, onChange, type }: LabelledInputProps) {
    return (
        <div className="mb-4">
            <label className="block mb-2 text-sm font-semibold text-black">{label}</label>
            <input
                onChange={onChange}
                type={type || "text"}
                className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:border-blue-500 block w-full p-2.5"
                placeholder={placeholder}
                required
            />
        </div>
    )
}

export default Auth