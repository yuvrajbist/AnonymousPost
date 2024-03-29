import axios from 'axios';
import { useCallback, useState } from 'react';
import { toast } from 'react-hot-toast';

import useLoginModal from '@/hooks/useLoginModal';
import useRegisterModal from '@/hooks/useRegisterModal';
import useCurrentUser from '@/hooks/useCurrentUser';
import usePosts from '@/hooks/usePosts';
import usePost from '@/hooks/usePost';

import Avatar from './Avatar';
import Button from './Button';
import ImageUpload from './ImageUpload';

interface FormProps {
  placeholder: string;
  isComment?: boolean;
  postId?: string;
}

const Form: React.FC<FormProps> = ({ placeholder, isComment, postId }) => {
  const registerModal = useRegisterModal();
  const loginModal = useLoginModal();

  const { data: currentUser } = useCurrentUser();
  const { mutate: mutatePosts } = usePosts();
  const { mutate: mutatePost } = usePost(postId as string);

  const [body, setBody] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [image, setImage] = useState("");

  const onSubmit = useCallback(async (Anonymously:boolean) => {
    try {
      setIsLoading(true);

      const url = isComment ? `/api/comments?postId=${postId}` : '/api/posts';

      await axios.post(url, { body, isAnonymous : Anonymously, image });

      toast.success('Post created');
      setBody('');
      setImage('');
      mutatePosts();
      mutatePost();

    } catch (error) {
      toast.error('Something went wrong');
    } finally {
      setIsLoading(false);
    }
  }, [body,, image, mutatePosts, isComment, postId, mutatePost]);

  return (
    <div className="border-b-[1px] border-neutral-800 px-5 py-2">
      {currentUser ? (
        <div className="flex flex-row gap-4">
          <div>
            <Avatar userId={currentUser?.id} />
          </div>
          <div className="w-full">
            <textarea
              disabled={isLoading}
              onChange={(event) => setBody(event.target.value)}
              value={body}
              maxLength={1000}
              className="
                disabled:opacity-80
                peer
                resize-none 
                mt-3 
                w-full 
                bg-themeGray 
                ring-0 
                outline-none 
                text-[20px] 
                placeholder-neutral-500 
                text-themeWhite
              "
              placeholder={placeholder}>
            </textarea>
            <p className='w-full text-neutral-700 py-1 text-right'>{body.length}/1000</p>
            <hr
              className="
                opacity-0 
                peer-focus:opacity-100 
                h-[1px] 
                w-full 
                border-neutral-800 
                transition"
            />
            <ImageUpload value={image} disabled={isLoading} onChange={(image) => setImage(image)} label="Upload Image" />
            <div className="mt-4 mb-2 flex flex-row justify-end gap-x-3">
              <Button disabled={isLoading || (!body && !image)} onClick={() => {
                  onSubmit(false)
              }} label="Post" />
              <Button anonymous disabled={isLoading || (!body && !image)} onClick={() => {
                  onSubmit(true)
              }} label="AnonPost" />
            </div>
          </div>
        </div>
      ) : (
        <div className="py-8">
          <h1 className="text-themeWhite text-2xl text-center mb-4 font-bold">Welcome to ###</h1>
          <div className="flex flex-row items-center justify-center gap-4">
            <Button label="Login" onClick={loginModal.onOpen} />
            <Button label="Register" onClick={registerModal.onOpen} secondary />
          </div>
        </div>
      )}
    </div>
  );
};

export default Form;
