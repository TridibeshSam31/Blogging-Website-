import { Navbar } from "../components/Navbar"
import { Blog } from "../hooks/useBlog"
import { Avatar } from "./BlogCard"

export const FullBlog = ({blog}:{blog:Blog}) => {
    return(
        <div>
            <Navbar/>
            <div className="flex justify-center">
         <div className="grid grid-cols-12 px-10 w-full pt-200 max-w-screen-xl pt-12  ">
            <div className=" col-span-8">
                <div className="text-3xl font-extrabold">
                    {blog.title}
                </div>
                <div className="text-slate-500 pt-2">
                    posted on 2nd june 2025 
                </div>
                <div className="pt-4">
                    {blog.content}
                </div>
            </div>

            <div className=" col-span-4">
                <div className="text-slate-600">
                    Author
                </div>
                <div className="flex w-full">
                    <div className="pr-4 flex flex-col justify-center">
                        <Avatar size="big" name={blog.author.name || "Unknown Author"}/>
                    </div>

                </div>

                 <div>
                    <div className="text-xl font-bold">
                  {blog.author.name || "Unknown Author"}
                    </div>
                 </div>

                <div className="pt-3 text-slate-500">
                    Author Bio , I will add it in backend route 
                </div>
            </div>

          </div>
          </div>
        </div>
    )
}