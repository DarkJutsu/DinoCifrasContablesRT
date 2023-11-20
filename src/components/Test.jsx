import { useState } from "react";
import { LibroDiarioClass } from "../model/libroDiario.class";
import { AsientoClass } from "../model/Asiento.class";

function Test() {
  const [cuentas, setCuentas] = useState(
    JSON.parse(localStorage.getItem("cuentasObject"))
  );

  const cCaja = cuentas.find((c) => c.cuenta === "CAJA");
  const cCapSoc = cuentas.find((c) => c.cuenta === "CAPITAL SOCIAL");

  const libroD1 = new LibroDiarioClass("12/09/2023", "Compras");
  const asiento1 = new AsientoClass(
    "12/10/2023",
    "Caja",
    cCaja,
    200,
    0,
    "Inicio"
  );
  const asiento2 = new AsientoClass(
    "13/10/2023",
    "Capital",
    cCapSoc,
    0,
    200,
    "Inicio"
  );

  libroD1.setAsiento(asiento1);
  libroD1.setAsiento(asiento2);

  const updateCuentas = () => {
    const tempCuenta = [...cuentas];

    libroD1.asientos.forEach((asient) => {
      const i = tempCuenta.findIndex(
        (cu) => cu.codigo === asient.cuenta.codigo
      );
      if (i !== -1) {
        tempCuenta[i].debe += asient.debe;
        tempCuenta[i].haber += asient.haber;
        console.log(i);
      }
    });

    setCuentas(tempCuenta);
    localStorage.setItem("cuentasObject", JSON.stringify(tempCuenta));
  };

  return (
    <><h1>TEST</h1></>
  )
}
