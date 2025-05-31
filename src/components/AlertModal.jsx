import { useNavigate } from "react-router-dom";
import useApiMutation from "../api/hooks/useApiMutation";
import { Button } from "@material-tailwind/react";

const AlertModal = ({ redirect, title, api, method, btnLink, link, closeModal, body, text, submitButton = true }) => {

  const { mutate } = useApiMutation();

  const navigate = useNavigate();

  const apiAction = () => {
    mutate({
      url: `${api}`,
      method: `${method}`,
      data: body ? body : null,
      headers: true,
      onSuccess: (response) => {
        redirect();
        closeModal();
      },
      onError: () => {
        closeModal();
      },
    });
  };

  return (
    <>
      <div className="w-full flex h-auto flex-col px-3 py-6 gap-3 -mt-3">
        <div className="text-center w-full flex flex-col gap-3">
          <p className="font-semibold text-center text-lg">{title}</p>
          {text && <p className="text-base">{text}</p>}
        </div>
        <div className="flex justify-center mt-5 gap-4">
          {submitButton &&
            <Button
              onClick={apiAction}
              className="bg-mobiPink text-white outline-none px-4 py-2 rounded-lg"
            >
              Yes
            </Button>
          }
          {btnLink &&
            <Button
              onClick={() => navigate(`${link}`)}
              className="bg-mobiPink text-white outline-none px-4 py-2 rounded-lg"
            >
              {btnLink}
            </Button>
          }
          <button
            onClick={closeModal}
            className="bg-gray-300 text-black px-4 py-2 font-[500] rounded-lg"
          >
            Cancel
          </button>
        </div>
      </div>
    </>
  );
};

export default AlertModal;
