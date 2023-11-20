import { MdAddCircle } from "react-icons/md";
import { Link, useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";
import { Header } from "./menu/Header";
import { BtnAddLibroD } from "./dashboard/BtnAddLibroD";

export function HomePage() {
  const [empleList, setEmpleList] = useState(
    JSON.parse(localStorage.getItem("empleObject"))
  );
  const nav = useNavigate();

  return (
    <>
      <div className="mt-10">
        {empleList == null ? (
          <BtnAddLibroD />
        ) : empleList.length === 0 ? (
          <BtnAddLibroD />
        ) : (
          <div>
            <AddHome />
            <div className="-mx-3 md:flex mt-8">
              <div className="md:w-fit ml-5 mt-3">
                <Link
                  to="/DinoCifrasContablesRT/planillaAll"
                  state={{ state: empleList }}
                >
                  <div className="flex items-center font-comfortaa bg-slate-300 w-fit py-2 px-4 rounded-md cursor-pointer shadow-md">
                    <span className="text-1xl text-slate-800 font-bold">
                      Planilla de Pagos
                    </span>
                  </div>
                </Link>
              </div>
            </div>
            {/* <EmpleList /> */}
          </div>
        )}
      </div>
    </>
  );
}
