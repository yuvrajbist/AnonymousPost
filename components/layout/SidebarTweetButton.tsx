import { FaFeather } from "react-icons/fa";
import { useRouter } from "next/router";

const SidebarTweetButton = () => {
  const router = useRouter();

  return (
    <div onClick={()=>{router.push("/")}}>
      <div className="
        mt-6
        mx-auto
        lg:hidden 
        rounded-full 
        h-14
        w-14
        p-4
        flex
        items-center
        justify-center 
        bg-themeOrange 
        hover:bg-opacity-80 
        transition 
        cursor-pointer
      ">
        <FaFeather size={24} color="#EEEEEE" />
      </div>
      <div className="
        mt-6
        hidden 
        lg:block 
        px-4
        py-2
        rounded-full
        bg-themeOrange
        hover:bg-opacity-90 
        cursor-pointer
      ">
        <p 
          className="
            hidden 
            lg:block 
            text-center
            font-semibold
            text-themeWhite 
            text-[20px]
        ">
          Post
        </p>
      </div>
    </div>
  )
}

export default SidebarTweetButton