import { Button, useDisclosure } from "@nextui-org/react";
import { useEffect, useState } from "react";
import { Spinner } from "./dashboard/Spinner";
import { BtnAddLibroD } from "./dashboard/BtnAddLibroD";
import { LibroDFormModal } from "../components/form/LibroDFormModal";
import { BtnAddInic } from "./dashboard/BtnAddInic";
import { TableLibroD } from "../components/TableLibroD";

export function LibroDiarioPage() {
  const [libroD, setLibroD] = useState(
    JSON.parse(localStorage.getItem("libroDObject"))
  );

  const { isOpen, onOpen, onOpenChange } = useDisclosure();
  const [loading, setLoading] = useState(true);

  async function AddLibro(lib) {
    localStorage.setItem("libroDObject", JSON.stringify(lib));
    return Promise.resolve(localStorage.getItem("libroDObject"))
      .then((r) => setLibroD(JSON.parse(r)))
      .catch((er) => console.log("Error: ", er));
  }

  function deleteLibro(lib) {
    const i = libroD.indexOf(lib);
    const tempLibro = [...libroD];

    tempLibro.splice(i, 1);
    setLibroD(tempLibro);
    localStorage.setItem("libroDObject", JSON.stringify(tempLibro));
  }

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
          <h2 className="text-3xl font-bold text-slate-800">Libro Diario</h2>
          <LibroDFormModal
            addLibroD={AddLibro}
            isOpen={isOpen}
            onOpenChange={onOpenChange}
          />
          <div>
            {libroD == null ? (
              <BtnAddLibroD onOpen={onOpen} />
            ) : libroD.length === 0 ? (
              <BtnAddLibroD onOpen={onOpen} />
            ) : (
              <>
                <BtnAddInic onOpen={onOpen} />
                <TableLibroD libroD={libroD} remove={deleteLibro} />
              </>
            )}
          </div>
        </div>
      )}
    </>
  );
}
