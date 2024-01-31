import { useCallback } from "react";
import { AiOutlineClose } from "react-icons/ai";
import Button from "./Button";

interface ModalProps {
  isOpen?: boolean;
  onClose: () => void;
  onSubmit: () => void;
  title?: string;
  body?: React.ReactElement;
  footer?: React.ReactElement;
  actionLabel: string;
  disabled?: boolean;
}

const Modal: React.FC<ModalProps> = ({ isOpen, onClose, onSubmit, title, body, actionLabel, footer, disabled }) => {
  const handleClose = useCallback(() => {
    if (disabled) {
      return;
    }
  
    onClose();
  }, [onClose, disabled]);

  const handleSubmit = useCallback(() => {
    if (disabled) {
      return;
    }

    onSubmit();
  }, [onSubmit, disabled]);

  if (!isOpen) {
    return null;
  }

  return (
    <>
    {/* background */}
      <div
        className="
          justify-center 
          items-center 
          flex 
          overflow-x-hidden 
          overflow-y-auto 
          fixed 
          inset-0 
          z-50 
          outline-none 
          focus:outline-none
          lg:bg-neutral-800
          lg:bg-opacity-70
          bg-black
        "
      >
        <div className="relative w-full lg:w-3/6 mx-auto lg:max-w-3xl h-full lg:h-auto">
          {/*content*/}
          <div className="
            h-full
            lg:h-auto
            border-0 
            rounded-lg 
            shadow-lg
            relative 
            flex 
            flex-col 
            w-full 
            bg-black 
            outline-none 
            focus:outline-none
            "
          >
            {/*header*/}
            <div className="
              flex 
              items-center 
              justify-between 
              px-10
              py-6
              rounded-t
              "
            >
              <h3 className="text-3xl font-semibold text-themeWhite">
                {title}
              </h3>
              <button
                className="
                  p-1 
                  ml-auto
                  border-0 
                  text-themeWhite 
                  hover:opacity-70
                  transition
                "
                onClick={handleClose}
              >
                <AiOutlineClose size={20} />
              </button>
            </div>
            {/*body*/}
            <div className="relative px-10 flex-auto">
              {body}
            </div>
            {/*footer*/}
            <div className="flex flex-col gap-2 px-20 py-5">
              <Button disabled={disabled} label={actionLabel} fullWidth large onClick={handleSubmit} />
              {footer}
            </div>
          </div>
        </div>
      </div>
    </>
  );
}

export default Modal;
