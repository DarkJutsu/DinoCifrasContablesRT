import logo from "../assets/img/logo.png";
import { useState } from "react";
import { Mayorizar } from "../components/Mayorizar";
import { Button } from "@nextui-org/react";
import jsPDF from "jspdf";
import autoTable from "jspdf-autotable";
import { BsFiletypePdf } from "react-icons/bs";

export function BalanceComproPage() {
  const [cuentas, setCuentas] = useState(
    JSON.parse(localStorage.getItem("cuentasObject"))
  );

  const [mostrarComponente, setMostrarComponente] = useState(false);
  const handleMostrarComponente = () => {
    setMostrarComponente(!mostrarComponente);
  };

  const cuentasUse = cuentas.filter((c) => c.debe > 0 || c.haber > 0);

  let debeS = 0;
  let haberS = 0;
  let deuS = 0;
  let acreeS = 0;

  cuentasUse.forEach((c) => {
    debeS += c.debe;
    haberS += c.haber;
    deuS += c.haber > c.debe ? 0 : c.debe - c.haber;
    acreeS += c.debe > c.haber ? 0 : -(c.debe - c.haber);
  });

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
        <h2 className="text-3xl text-slate-800">Balance de Comprobación</h2>
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
                  <th className="border border-slate-600 p-3 w-52">Codigo</th>
                  <th className="border border-slate-600 p-3">Cuenta</th>
                  <th className="border border-slate-600 p-3 w-44">Debe</th>
                  <th className="border border-slate-600 p-3 w-44">Haber</th>
                  <th className="border border-slate-600 p-3 w-44">Deudor</th>
                  <th className="border border-slate-600 p-3 w-44">Acreedor</th>
                </tr>
              </thead>
              <tbody className="p-2">
                {cuentasUse.map((cuent, i) => (
                  <tr key={i}>
                    <td className="border border-slate-700 text-end pr-5">
                      {cuent.codigo}
                    </td>
                    <td className="border border-slate-700 text-justify pl-5">
                      {cuent.cuenta}
                    </td>
                    <td className="border border-slate-700 text-justify pl-5">
                      ${cuent.debe}
                    </td>
                    <td className="border border-slate-700 text-justify pl-5">
                      ${cuent.haber}
                    </td>
                    <td className="border border-slate-700 text-justify pl-5">
                      ${cuent.haber > cuent.debe ? 0 : cuent.debe - cuent.haber}
                    </td>
                    <td className="border border-slate-700 text-justify pl-5">
                      $
                      {cuent.debe > cuent.haber
                        ? 0
                        : -(cuent.debe - cuent.haber)}
                    </td>
                  </tr>
                ))}
              </tbody>
              <tfoot>
                <tr className="bg-emerald-400 font-bold">
                  <td
                    colSpan={2}
                    className="border border-slate-700 text-end pr-5"
                  >
                    SUMAS TOTALES
                  </td>
                  <td className="border border-slate-700 text-justify pl-5">
                    ${debeS}
                  </td>
                  <td className="border border-slate-700 text-justify pl-5">
                    ${haberS}
                  </td>
                  <td className="border border-slate-700 text-justify pl-5">
                    ${deuS}
                  </td>
                  <td className="border border-slate-700 text-justify pl-5">
                    ${acreeS}
                  </td>
                </tr>
              </tfoot>
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
