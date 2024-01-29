import useUsers from '@/hooks/useUsers';
import { useRouter } from 'next/router';

import Avatar from '../Avatar';

const FollowBar = () => {
  const { data: users = [] } = useUsers();
  const router = useRouter();

  if (users.length === 0) {
    return null;
  }

  return (
    <div className="px-6 py-4 hidden lg:block self-start sticky top-0">
      <div className="bg-neutral-950 rounded-xl p-4">
        <h2 className="text-themeWhite text-xl font-semibold">Who to follow</h2>
        <div className="flex flex-col gap-6 mt-4">
          {users.map((user: Record<string, any>) => (
            <div key={user.id} className="flex flex-row gap-4" onClick={()=>{router.push(`/users/${user.id}`)}}>
              <Avatar userId={user.id} />
              <div className="flex flex-col">
                <p className="text-themeWhite font-semibold text-sm cursor-pointer hover:underline">{user.name}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default FollowBar;