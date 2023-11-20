import { useLocation } from "react-router-dom";
import { getFchFormat } from "../utils/getFchFormat.function";
import { useEffect, useState } from "react";
import { BtnAddAsient } from "./dashboard/BtnAddAsient";
import { BtnAddInicAsient } from "./dashboard/BtnAddInicAsient";
import { Spinner } from "./dashboard/Spinner";
import { BackBtnLD } from "./dashboard/BackBtnLD";

export function LibroDiarioDetailPage() {
  const existLibro = JSON.parse(localStorage.getItem("libroDObject")) || [];
  const param = useLocation().state;

  const i = existLibro.findIndex((ld) => ld.fecha === param);

  const [libroD, setLibroD] = useState(existLibro[i]);
  const [loading, setLoading] = useState(true);


  useEffect(() => {
    setTimeout(() => {
      setLoading(false);
    }, 700);
  }, [libroD]);
  return (
    <>
      {loading ? (
        <Spinner />
      ) : (
        <div className="font-comfortaa">
          <h2 className="text-3xl font-bold text-slate-800">
            Libro Diario {libroD.titulo} - {getFchFormat(libroD.fecha)}
          </h2>
          <div>
            {libroD.asientos == null ? (
              <BtnAddInicAsient lib={libroD} />
            ) : libroD.asientos.length === 0 ? (
              <BtnAddAsient lib={libroD} />
            ) : (
              <>
                <BackBtnLD />
                <BtnAddInicAsient lib={libroD} />
                <div>
                  <table
                    id="myTable"
                    className="table-fixed w-full border-collapse border border-slate-500"
                  >
                    <thead className="bg-slate-400 font-bold">
                      <tr>
                        <th className="border border-slate-600 p-3 w-32">
                          Codigo
                        </th>
                        <th className="border border-slate-600 p-3 w-48">
                          Fecha
                        </th>
                        <th className="border border-slate-600 p-3">
                          Concepto
                        </th>
                        <th className="border border-slate-600 p-3 w-52">
                          Debe
                        </th>
                        <th className="border border-slate-600 p-3 w-52">
                          Haber
                        </th>
                      </tr>
                    </thead>
                    <tbody className="p-2">
                      {libroD.asientos.map((asien, i) => (
                        <tr key={i}>
                          <td className="border border-slate-700 text-center">AS{i+1}</td>
                          <td className="border border-slate-700 text-center">
                            {asien.fecha}
                          </td>
                          <td className="border border-slate-700 py-2 px-10">
                            <span className="font-bold underline">{asien.concepto}</span>
                            {asien.cuentas.map((cu, i) => (
                              <p key={i} className="pl-3">{cu.cuenta.cuenta}</p>
                            ))}
                            <span className="font-bold">"{asien.comentario}"</span>
                          </td>
                          <td className="border border-slate-700 text-center pt-4">
                            {asien.cuentas.map((cu, i) => (
                              <p key={i}>${cu.debe}</p>
                            ))}
                            <span className="bg-emerald-600 p-2 text-orange-50 rounded-md">${asien.debe}</span>
                          </td>
                          <td className="border border-slate-700 text-center pt-4">
                            {asien.cuentas.map((cu, i) => (
                              <p key={i}>${cu.haber}</p>
                            ))}
                            <span className="bg-emerald-600 p-2 text-orange-50 rounded-md">${asien.haber}</span>
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              </>
            )}
          </div>
        </div>
      )}
    </>
  );
}
