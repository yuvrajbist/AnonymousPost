import { useRouter } from 'next/router';
import { useCallback, useMemo } from 'react';
import { formatDistanceToNowStrict } from 'date-fns';
import Image from 'next/image';

import Avatar from '../Avatar';

interface CommentItemProps {
  data: Record<string, any>;
}

const CommentItem: React.FC<CommentItemProps> = ({ data = {} }) => {
  const router = useRouter();

  const goToUser = useCallback((ev: any) => {
    ev.stopPropagation();

    router.push(`/users/${data.user.id}`)
  }, [router, data.user.id]);

  const createdAt = useMemo(() => {
    if (!data?.createdAt) {
      return null;
    }

    return formatDistanceToNowStrict(new Date(data.createdAt));
  }, [data.createdAt])

  return (
    <div 
      className="
        border-b-[1px] 
        border-neutral-800 
        p-5 
        cursor-pointer 
        hover:bg-neutral-900 
        transition
      ">
      <div className="flex flex-row items-start gap-3">
      {data.isAnonymous ?
           <div
           className={`
             ${'h-12'}
             ${'w-12'}
             rounded-full 
             hover:opacity-90 
             transition 
             cursor-pointer
             relative
           `}
         >
           <Image
             fill
             style={{
               objectFit: 'cover',
               borderRadius: '100%'
             }}
             alt="Avatar"
             src={'/images/anonymousProfilePic.jpg'}
           />
         </div> :
          <Avatar userId={data.user.id} />}
        <div>
          <div className="flex flex-row items-center gap-2">
          <p
              onClick={data.isAnonymous?undefined:goToUser}
              className={`
                text-white 
                font-semibold 
                ${data.isAnonymous?"":"cursor-pointer"} 
                ${data.isAnonymous?"":"hover:underline"}
            `}>
              {data.isAnonymous?"Anonymous":data.user.name}
            </p>
            <span className="text-neutral-500 text-sm">
              {createdAt}
            </span>
          </div>
          <div className="text-white mt-1">
            {data.body}
          </div>
        </div>
      </div>
    </div>
  )
}

export default CommentItem;
