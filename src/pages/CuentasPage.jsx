import { useEffect, useState } from "react";
import { Spinner } from "./dashboard/Spinner";
import { CuentaForm } from "../components/form/CuentaForm";
import { MdDeleteForever } from "react-icons/md";

export function CuentasPage() {
  const [cuentas, setCuentas] = useState(
    JSON.parse(localStorage.getItem("cuentasObject"))
  );
  const [loading, setLoading] = useState(true);

  const cActivo = cuentas.filter((c) => c.codigo.charAt(0) == 1);
  const cPasivo = cuentas.filter((c) => c.codigo.charAt(0) == 2);
  const cCapital = cuentas.filter((c) => c.codigo.charAt(0) == 3);
  const cResultDeu = cuentas.filter((c) => c.codigo.charAt(0) == 4);
  const cResultAcre = cuentas.filter((c) => c.codigo.charAt(0) == 5);

  const TipoCuentas = ({ tipoCuenta, remove }) => {
    return (
      <>
        {tipoCuenta.map((c, i) => (
          <div key={i} className="flex items-center justify-between p-2 m-1">
            <span>
              {c.codigo} - <span className="font-bold">{c.cuenta}</span>
            </span>
            <MdDeleteForever
              onClick={() => remove(c)}
              className="text-red-400 text-2xl cursor-pointer "
            />
          </div>
        ))}
      </>
    );
  };

  async function AddCuent(cuen) {
    localStorage.setItem("cuentasObject", JSON.stringify(cuen));
    return Promise.resolve(localStorage.getItem("cuentasObject"))
      .then((r) => setCuentas(JSON.parse(r)))
      .catch((er) => console.log("Error: ", er));
  }

  function deleteCuent(cuen) {
    const i = cuentas.indexOf(cuen);
    const tempCuent = [...cuentas];

    tempCuent.splice(i, 1);
    setCuentas(tempCuent);
    localStorage.setItem("cuentasObject", JSON.stringify(tempCuent));
  }

  useEffect(() => {
    setTimeout(() => {
      setLoading(false);
    }, 700);
  }, [cuentas]);

  return (
    <>
      {loading ? (
        <Spinner />
      ) : (
        <div className="font-comfortaa">
          <h2 className="text-3xl font-bold">Cuentas</h2>
          <CuentaForm addCuenta={AddCuent} />
          <div className="grid grid-cols-3 gap-3">
            <div className="bg-orange-50 p-3 rounded-md">
              <h3 className="text-xl underline mb-3">Cuentas Activos</h3>
              <TipoCuentas tipoCuenta={cActivo} remove={deleteCuent} />
            </div>
            <div className="bg-orange-50 p-3 rounded-md">
              <h3 className="text-xl underline mb-3">Cuentas Pasivos</h3>
              <TipoCuentas tipoCuenta={cPasivo} remove={deleteCuent} />
            </div>
            <div className="bg-orange-50 p-3 rounded-md">
              <h3 className="text-xl underline mb-3">Cuentas Capital</h3>
              <TipoCuentas tipoCuenta={cCapital} remove={deleteCuent} />
              <h3 className="text-xl underline mb-3 mt-10">Cuentas Resultado Deudoras</h3>
              <TipoCuentas tipoCuenta={cResultDeu} remove={deleteCuent} />
              <h3 className="text-xl underline mb-3 mt-10">Cuentas Resultado Acreedoras</h3>
              <TipoCuentas tipoCuenta={cResultAcre} remove={deleteCuent} />
            </div>
          </div>
        </div>
      )}
    </>
  );
}
