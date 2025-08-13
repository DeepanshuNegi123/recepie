import { useNavigate } from "react-router-dom";
import { ArrowLeftIcon } from "@heroicons/react/24/solid";

export const BackButton = ({ text = 'Back' }) => {
  const navigate = useNavigate();

  const handleClick = () => {
    navigate(-1); // Go back one step
  };

  return (
    <div className="p-[-1px] mb-4">
      <button
        className=" text-yellow-600 font-bold text-xl border-2 border-yellow-600  rounded-lg p-1 w-[100px] flex items-center gap-2  "
        onClick={handleClick}
      >
        <ArrowLeftIcon className="h-5 w-6 mr-0.3" />
        {text}
      </button>
    </div>
  );
};
