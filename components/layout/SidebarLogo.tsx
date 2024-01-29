import { useRouter } from "next/router";
import { BsTwitter } from "react-icons/bs";
import Image from "next/image";

const SidebarLogo = () => {
  const router = useRouter();

  return (
    <div
      onClick={() => router.push('/')}
      className="
        rounded-full 
        h-12
        w-12
        m-4
        p-4 
        flex 
        items-center 
        justify-center 
        hover:bg-blue-300 
        hover:bg-opacity-10 
        cursor-pointer
        relative
    ">
      {/* <BsTwitter size={28} color="white" /> */}
      <Image
        fill
        style={{
          objectFit: 'cover',
          borderRadius: '100%'
        }}
        alt="Avatar"
        // onClick={onClick}
        src={'/images/webLogo.jpg'}
      />
    </div>
  );
};

export default SidebarLogo;