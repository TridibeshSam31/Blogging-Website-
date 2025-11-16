import { Avatar } from "./BlogCard";

export const Navbar = () => {
    return (
        <div className="border-b flex justify-between px-10 py-4">
            <div className="flex flex-col justify-center">
                Logverse
            </div>
            <div>
                <Avatar size={"big"} name="Tridibesh"/>
            </div>

        </div>
    )
}