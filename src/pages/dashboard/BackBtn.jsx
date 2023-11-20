import { MdArrowBack } from "react-icons/md";
import { useNavigate } from "react-router-dom";

export const BackBtn = ({lib}) => {
  const nav = useNavigate();
  return (
    <>
      <div className="w-fit">
        <div onClick={() => nav("/DinoCifrasContablesRT/libroDiarioDetail", {state: lib})} className="flex items-center font-comfortaa text-slate-800 hover:text-orange-50 bg-transparent w-fit py-2 px-4 rounded-md cursor-pointer mb-5 mt-9 border border-slate-800 hover:bg-slate-600">
          <MdArrowBack className="text-2xl cursor-pointer mr-2" />
          <span className="text-md font-bold">Volver</span>
        </div>
      </div>
    </>
  );
};
