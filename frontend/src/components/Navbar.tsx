import { Avatar } from "./BlogCard";
import { Link } from "react-router-dom";

export const Navbar = () => {
    return (
        <div className="border-b flex justify-between px-10 py-4">
          <Link to={"/blogs"} className="flex flex-col justify-center cursor-pointer ">
            
               Logverse
            
          </Link>
            <div>
                <Link to={"/publish"}>
                <button type="button" className=" mr-4 text-white bg-success box-border border border-transparent hover:bg-success-strong focus:ring-4 focus:ring-success-medium shadow-xs font-medium leading-5 rounded-full text-sm px-4 py-2.5 focus:outline-none">New</button>
                </Link>
                <Avatar size={"big"} name="Tridibesh"/>
            </div>

        </div>
    )
}