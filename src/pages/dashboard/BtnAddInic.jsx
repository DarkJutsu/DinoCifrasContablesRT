import { MdAddCircle } from "react-icons/md";
import { useNavigate } from "react-router-dom";

export const BtnAddInic = ({onOpen}) => {
  const nav = useNavigate();
  return (
    <>
      <div
        onClick={onOpen}
        className="flex items-center font-comfortaa bg-emerald-400 w-fit py-2 px-4 rounded-md cursor-pointer my-5"
      >
        <span className="text-xl text-slate-800 font-bold">
          Nuevo Libro Diario
        </span>
        <MdAddCircle className="text-slate-800 text-3xl cursor-pointer ml-2" />
      </div>
    </>
  );
};
