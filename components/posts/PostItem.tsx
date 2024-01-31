import { useRouter } from 'next/router';
import { useCallback, useMemo } from 'react';
import { AiFillHeart, AiOutlineHeart, AiOutlineMessage } from 'react-icons/ai';
import { formatDistanceToNowStrict } from 'date-fns';
import Image from 'next/image';

import useLoginModal from '@/hooks/useLoginModal';
import useCurrentUser from '@/hooks/useCurrentUser';
import useLike from '@/hooks/useLike';

import Avatar from '../Avatar';
interface PostItemProps {
  data: Record<string, any>;
  userId?: string;
}

const PostItem: React.FC<PostItemProps> = ({ data = {}, userId }) => {
  const router = useRouter();
  const loginModal = useLoginModal();

  const { data: currentUser } = useCurrentUser();
  const { hasLiked, toggleLike } = useLike({ postId: data.id, userId });

  const goToUser = useCallback((ev: any) => {
    ev.stopPropagation();
    router.push(`/users/${data.user.id}`)
  }, [router, data.user.id]);

  const goToPost = useCallback(() => {
    router.push(`/posts/${data.id}`);
  }, [router, data.id]);

  const onLike = useCallback(async (ev: any) => {
    ev.stopPropagation();

    if (!currentUser) {
      return loginModal.onOpen();
    }

    toggleLike();
  }, [loginModal, currentUser, toggleLike]);

  const LikeIcon = hasLiked ? AiFillHeart : AiOutlineHeart;

  const createdAt = useMemo(() => {
    if (!data?.createdAt) {
      return null;
    }

    return formatDistanceToNowStrict(new Date(data.createdAt));
  }, [data.createdAt])

  const onImageClick = useCallback(async (ev: any) => {
    ev.stopPropagation();

    router.push(`${data.image}`)
  }, [router, data.image])

  return (
    // Layout of the post item
    <div
      onClick={goToPost}
      className="
        border-b-[1px] 
        border-neutral-800 
        p-5 
        cursor-pointer 
        hover:bg-neutral-900 
        transition
      ">
      <div className="flex flex-row items-start gap-3">
        {/*1st item: Profile image */}
        <div className='w-auto'>
          {data.isAnonymous ?
            <div
              className={`
             h-8
             w-8
             md:h-12
             md:w-12
             rounded-full 
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
        </div>
        {/* 2nd item: data of the post */}
        <div className='w-full'>
          {/* Username and Created at */}
          <div className="flex flex-row items-center gap-2">
            <p
              onClick={data.isAnonymous ? undefined : goToUser}
              className={`
                text-themeWhite 
                font-semibold 
                ${data.isAnonymous ? "" : "cursor-pointer"} 
                ${data.isAnonymous ? "" : "hover:underline"}
            `}>
              {data.isAnonymous ? "Anonymous" : data.user.name}
            </p>
            <span className="text-neutral-500 text-sm">
              {createdAt}
            </span>
          </div>
          {/* Post Text */}
          {data.body && <div className="text-themeWhite mt-1 break-all">
            {data.body}
          </div>}
          {/* Post Image */}
          {data.image &&
            <div
              className={' border-1 border-black h-64 w-auto my-10 hover:opacity-90 transition cursor-pointer relative '
              }
            >
              <Image
                fill
                style={{
                  objectFit: 'contain',
                }}
                alt="Post Image"
                // onClick={onImageClick}
                src={data.image}
              />
            </div>}
          <div className="flex flex-row items-center mt-3 gap-10">
            <div
              className="
                flex 
                flex-row 
                items-center 
                text-neutral-500 
                gap-2 
                cursor-pointer 
                transition 
                hover:text-themeOrange
            ">
              <AiOutlineMessage size={20} />
              <p>
                {data.comments?.length || 0}
              </p>
            </div>
            <div
              onClick={onLike}
              className="
                flex 
                flex-row 
                items-center 
                text-neutral-500 
                gap-2 
                cursor-pointer 
                transition 
                hover:text-red-500
            ">
              <LikeIcon color={hasLiked ? 'red' : ''} size={20} />
              <p>
                {data.likedIds.length}
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default PostItem;
