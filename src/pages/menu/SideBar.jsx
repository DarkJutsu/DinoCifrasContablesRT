import { Header } from "./Header";
import {
  BiBarChartAlt2,
  BiBookAlt,
  BiCog,
  BiCollection,
  BiHomeAlt2,
} from "react-icons/bi";
import { Divider } from "@nextui-org/react";
import { Link, NavLink } from "react-router-dom";

export function SideBar() {
  return (
    <>
      <div className="flex flex-col h-screen p-3 bg-slate-700 shadow-[0_35px_60px_-15px_rgba(51,65,85,0.9)] w-80">
        <Header />
        <Divider className="my-4" />
        <div className="grid p-5 gap-y-5 ">
          <NavLink
            to={"/DinoCifrasContablesRT/"}
            className={({ isActive }) =>
              isActive ? "bg-slate-500 rounded-md shadow-md" : ""
            }
          >
            <div className="cursor-pointer flex items-center text-orange-50 text-xl tracking-widest hover:bg-slate-600 px-4 pt-1 pb-2 rounded-md transition duration-300 ease-in-out">
              <BiHomeAlt2 className="mr-3" />
              <h2>Inicio</h2>
            </div>
          </NavLink>
          <NavLink
            to={"/DinoCifrasContablesRT/libroDiario"}
            className={({ isActive }) =>
              isActive ? "bg-slate-500 rounded-md shadow-md" : ""
            }
          >
            <div className="cursor-pointer flex items-center text-orange-50 text-xl tracking-widest hover:bg-slate-600 px-4 pt-1 pb-2 rounded-md transition duration-300 ease-in-out">
              <BiBookAlt className="mr-3" />
              <h2>Libro Diario</h2>
            </div>
          </NavLink>
          <NavLink
            to={"/DinoCifrasContablesRT/cuentas"}
            className={({ isActive }) =>
              isActive ? "bg-slate-500 rounded-md shadow-md" : ""
            }
          >
            <div className="cursor-pointer flex items-center text-orange-50 text-xl tracking-widest hover:bg-slate-600 px-4 pt-1 pb-2 rounded-md transition duration-300 ease-in-out">
              <BiCollection className="mr-3" />
              <h2>Cuentas</h2>
            </div>
          </NavLink>
          <NavLink
            to={"/DinoCifrasContablesRT/balanceCompro"}
            className={({ isActive }) =>
              isActive ? "bg-slate-500 rounded-md shadow-md" : ""
            }
          >
            <div className="cursor-pointer flex items-center text-orange-50 text-xl tracking-widest hover:bg-slate-600 px-4 pt-1 pb-2 rounded-md transition duration-300 ease-in-out">
              <BiBarChartAlt2 className="mr-3" />
              <h2>Balance De Comprobación</h2>
            </div>
          </NavLink>
          <NavLink
            to={"/DinoCifrasContablesRT/kardex"}
            className={({ isActive }) =>
              isActive ? "bg-slate-500 rounded-md shadow-md" : ""
            }
          >
            <div className="cursor-pointer flex items-center text-orange-50 text-xl tracking-widest hover:bg-slate-600 px-4 pt-1 pb-2 rounded-md transition duration-300 ease-in-out">
              <BiBarChartAlt2 className="mr-3" />
              <h2>Kardex</h2>
            </div>
          </NavLink>

          <div className="cursor-pointer flex items-center absolute bottom-0 my-10 text-slate-400 hover:text-orange-50 text-xl tracking-widest px-4 pt-1 pb-2 rounded-md transition duration-300 ease-in-out">
            <NavLink
              to={"/DinoCifrasContablesRT/ajustes"}
              className={({ isActive }) => (isActive ? "text-orange-50" : "")}
            >
              <h2 className="flex items-center">
                <BiCog className="mr-3" />
                Ajustes
              </h2>
            </NavLink>
          </div>
        </div>
      </div>
    </>
  );
}
