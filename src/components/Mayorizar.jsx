import { Button } from "@nextui-org/react";
import React, { useEffect, useState } from "react";

export function Mayorizar() {
  const [libroM, setLibroM] = useState(
    JSON.parse(localStorage.getItem("libroDObject"))
  );

  const mayoriza = () => {
    const tempCuenta =
      JSON.parse(localStorage.getItem("cuentasObjectEmpty")) || [];

    libroM.forEach((li) => {
      li.asientos.forEach((asi) => {
        asi.cuentas.forEach((cu) => {
          const i = tempCuenta.findIndex((c) => c.codigo === cu.cuenta.codigo);
          if (i !== -1) {
            tempCuenta[i].debe += parseFloat(cu.debe);
            tempCuenta[i].haber += parseFloat(cu.haber);
          }
        });
      });
    });

    localStorage.setItem("cuentasObject", JSON.stringify(tempCuenta));
  };

  return (
    <>
      <Button
        className="bg-emerald-400 mt-3 p-2 rounded-md text-slate-800 uppercase font-bold font-comfortaa w-44 py-3 ml-10"
        onClick={() => mayoriza()}
      >
        Mayorizar
      </Button>
    </>
  );
}
