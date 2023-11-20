import { useState } from "react";
import { Mayorizar } from "../components/Mayorizar";
import { Button } from "@nextui-org/react";
import logo from "../assets/img/logo.png";
import { BsFiletypePdf } from "react-icons/bs";
import jsPDF from "jspdf";
import autoTable from "jspdf-autotable";

export function KardexPage() {
  const [mostrarComponente, setMostrarComponente] = useState(false);

  const [libroD, setLibroD] = useState(
    JSON.parse(localStorage.getItem("libroDObject"))
  );
  const [cuentasKar, setCuentasKar] = useState([]);

  const arrayTemp = [];

  const handleMostrarComponente = () => {
    setMostrarComponente(!mostrarComponente);
    libroD.forEach((li) => {
      li.asientos.forEach((asi) => {
        asi.cuentas.forEach((cu) => {
          if (
            cu.cuenta.codigo === "1109" ||
            cu.cuenta.codigo === "4101" ||
            cu.cuenta.codigo === "4203" ||
            cu.cuenta.codigo === "5101" ||
            cu.cuenta.codigo === "5102"
          )
            arrayTemp.push(cu);
        });
      });
    });
    setCuentasKar(arrayTemp);
  };

  let exist = 0;
  let total = 0;

  const getMyPDF = () => {
    const myPDF = new jsPDF({
      putOnlyUsedFonts: true,
      orientation: "landscape",
    });
    myPDF.addImage(logo, "PNG", 10, 10, 20, 20);
    myPDF.setFontSize(22);
    myPDF.text("dinocifras", 30, 20);
    myPDF.text("contables", 30, 27);

    myPDF.setFontSize(12);
    myPDF.setFont("helvetica", "bold");
    myPDF.text(
      "dinocifras contables S.A de C.V Planilla de Pagos",
      155,
      40,
      null,
      null,
      "center"
    );
    autoTable(myPDF, {
      html: "#myTable",
      startY: 43,
      headStyles: { halign: "center", fillColor: [100, 116, 139] },
      theme: "grid",
      footStyles: {
        fillColor: [51, 65, 85],
        halign: "right",
      },
      columnStyles: {
        10: { cellWidth: 25, halign: "right" },
        9: { cellWidth: 25, halign: "right" },
        8: { cellWidth: 25, halign: "right" },
        7: { halign: "right" },
        6: { halign: "right" },
        5: { halign: "right" },
        4: { halign: "right" },
        3: { halign: "right" },
        2: { halign: "right" },
      },
    });

    myPDF.save("Balance de Comprobación - dinocifras contables S.A de C.V.pdf");
  };

  return (
    <>
      <div className="flex justify-between items-center w-full font-comfortaa">
        <h2 className="text-3xl text-slate-800">Tarjeta Auxiliar - KARDEX</h2>
        <div>
          <Button
            className="bg-emerald-400 mt-3 p-2 rounded-md text-slate-800 uppercase font-bold font-comfortaa w-44 py-3 ml-10"
            onClick={handleMostrarComponente}
          >
            Generar
          </Button>
          <Mayorizar />
        </div>
      </div>
      <div className="mt-10 flex items-center justify-center">
        {mostrarComponente ? (
          <div className="grid">
            <div
              onClick={() => getMyPDF()}
              className="flex justify-end items-center font-comfortaa w-full py-2 px-4 rounded-md cursor-pointer"
            >
              <BsFiletypePdf className="text-2xl text-slate-700" />
            </div>
            <table
              id="myTable"
              className="table-fixed w-full border-collapse border border-slate-500"
            >
              <thead className="bg-slate-400 font-bold">
                <tr>
                  <th className="border border-slate-600 p-3 w-20">Codigo</th>
                  <th className="border border-slate-600 p-3">Concepto</th>
                  <th className="border border-slate-600 p-3 w-24">Entrada</th>
                  <th className="border border-slate-600 p-3 w-24">Salida</th>
                  <th className="border border-slate-600 p-3 w-24">
                    Existencias
                  </th>
                  <th className="border border-slate-600 p-3 w-24">
                    Costo Unitario
                  </th>
                  <th className="border border-slate-600 p-3 w-24">Debe</th>
                  <th className="border border-slate-600 p-3 w-24">Haber</th>
                  <th className="border border-slate-600 p-3 w-24">Saldo</th>
                </tr>
              </thead>
              <tbody className="p-2">
                {cuentasKar.map((cuent, i) => (
                  <tr key={i}>
                    <td className="border border-slate-700 text-end pr-5">
                      {cuent.cuenta.codigo}
                    </td>
                    <td className="border border-slate-700 text-justify pl-5">
                      {cuent.cuenta.cuenta}
                    </td>
                    <td className="border border-slate-700 text-justify pl-5">
                      {cuent.debe / 10}
                    </td>
                    <td className="border border-slate-700 text-justify pl-5">
                      {cuent.haber / 20}
                    </td>
                    <td className="border border-slate-700 text-justify pl-5">
                      {cuent.debe > 0
                        ? (exist += cuent.debe / 10)
                        : (exist -= cuent.haber / 20)}
                    </td>
                    <td className="border border-slate-700 text-justify pl-5">
                      ${10}
                    </td>
                    <td className="border border-slate-700 text-justify pl-5">
                      ${cuent.debe}
                    </td>
                    <td className="border border-slate-700 text-justify pl-5">
                      ${cuent.haber > 0 ? exist * 10 : 0}
                    </td>
                    <td className="border border-slate-700 text-justify pl-5">
                      $
                      {cuent.debe > 0
                        ? (total += parseFloat(cuent.debe))
                        : (total -= parseFloat(
                            cuent.haber > 0 ? exist * 10 : 0
                          ))}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        ) : (
          <span className="text-slate-800 text-2xl">
            Mayoriza y Genera los Datos!!!
          </span>
        )}
      </div>
    </>
  );
}
