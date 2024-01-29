import Image from "next/image";

import useUser from "@/hooks/useUser";

import Avatar from "../Avatar"

interface UserHeroProps {
  userId: string;
}

const UserHero: React.FC<UserHeroProps> = ({ userId }) => {
  const { data: fetchedUser } = useUser(userId);

  return (
    <div>
      <div className="flex bg-neutral-800 h-auto justify-between items-center flex-col ">
        {/* {fetchedUser?.coverImage && (
          <Image src={fetchedUser.coverImage} fill alt="Cover Image" style={{ objectFit: 'cover' }}/>
        )} */}
        <div className="pt-4 w-auto">
          <Avatar userId={userId} isLarge hasBorder />
        </div>
        <p className="text-themeWhite text-2xl font-semibold inline pt-2 pb-6">
          {fetchedUser?.name}
        </p>
      </div>
    </div>
  );
}

export default UserHero;