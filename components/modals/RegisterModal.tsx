import axios from "axios";
import { toast } from "react-hot-toast";
import { useCallback, useState } from "react";
import { signIn } from 'next-auth/react';

import useLoginModal from "@/hooks/useLoginModal";
import useRegisterModal from "@/hooks/useRegisterModal";

import Input from "../Input";
import Modal from "../Modal";

const RegisterModal = () => {
  const loginModal = useLoginModal();
  const registerModal = useRegisterModal();

  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [name, setName] = useState('');

  const [isLoading, setIsLoading] = useState(false);

  const validator = useCallback(() => {
    const validEmail = new RegExp(
      '^[a-z]*.[0-9]*@muj.manipal.edu$'
    );
    const validPassword = new RegExp(
      '^(?=.*?[A-Z])(?=.*?[a-z])(?=.*?[0-9]).{8,}$'
    );
    if (!validEmail.test(email)) {
      toast.error("Use your Manipal University Email Address")
    }
    else if (!validPassword.test(password)) {
      toast.error("Ensure your password follows the provided instruction")
    }
    else {
      createAccount();
    }
  }, [email, password])

  const onToggle = useCallback(() => {
    if (isLoading) {
      return;
    }

    registerModal.onClose();
    loginModal.onOpen();
  }, [loginModal, registerModal, isLoading]);

  const createAccount = useCallback(async () => {
    try {
      setIsLoading(true);

      await axios.post('/api/register', {
        email,
        password,
        name,
      });

      setIsLoading(false)

      toast.success('Account created.');

      signIn('credentials', {
        email,
        password,
      });

      registerModal.onClose();
    } catch (error) {
      toast.error('This email already has an account');
    } finally {
      setIsLoading(false);
    }
  }, [email, password, registerModal, name]);

  const bodyContent = (
    <div className="flex flex-col gap-4">
      <div>
        <Input
          disabled={isLoading}
          placeholder="Email"
          value={email}
          onChange={(e) => { setEmail(e.target.value) }}
        />
        <p className="text-neutral-600 pl-1 text-sm">*Use your Manipal University Email Address.<br />*Your Manipal University Email Address will not be shared or displayed to other users.</p>
      </div>
      <Input
        disabled={isLoading}
        placeholder="Name"
        value={name}
        onChange={(e) => setName(e.target.value)}
      />
      <div>
        <Input
          disabled={isLoading}
          placeholder="Password"
          type="password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
        />
        <p className="text-neutral-600 pl-1 text-sm">*Your Password should contain atleast one uppercase character, one lowercase character and one numerial character. The length of the password should be atleast 8 characters.</p>
      </div>
    </div>
  )

  const footerContent = (
    <div className="text-neutral-400 text-center mt-2">
      <p>Already have an account?
        <span
          onClick={onToggle}
          className="
            text-themeWhite 
            cursor-pointer 
            hover:underline
          "
        > Sign in</span>
      </p>
    </div>
  )

  return (
    <Modal
      disabled={isLoading}
      isOpen={registerModal.isOpen}
      title="Create an account"
      actionLabel="Register"
      onClose={registerModal.onClose}
      onSubmit={validator}
      body={bodyContent}
      footer={footerContent}
    />
  );
}

export default RegisterModal;
