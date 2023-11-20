import {
  Button,
  Select,
  SelectItem,
  SelectSection,
  Table,
  TableBody,
  TableCell,
  TableColumn,
  TableHeader,
  TableRow,
} from "@nextui-org/react";
import notie from "notie";
import "notie/dist/notie.css";
import { ErrorMessage, Field, Form, Formik } from "formik";
import { useState } from "react";
import CurrencyInput from "react-currency-input-field";
import { json, useLocation, useNavigate } from "react-router-dom";
import * as Yup from "yup";
import { MdDeleteForever } from "react-icons/md";
import { AsientoClass } from "../../model/Asiento.class";
import { BackBtn } from "../../pages/dashboard/BackBtn";

const AsientoSchema = Yup.object().shape({
  fecha: Yup.date().required("Fecha del Asiento requerida!"),
  concep: Yup.string()
    .min(5, "El concepto del Asiento debe poseer almenos 5 caracteres!")
    .required("Concepto del Asiento requerido!"),
  comm: Yup.string()
    .min(10, "El comentario del Asiento debe poseer almenos 10 caracteres!")
    .required("Concepto del Asiento requerido!"),
});

export function AsientoFormModal() {
  const nav = useNavigate();
  const libro = useLocation().state;

  const existLibro = JSON.parse(localStorage.getItem("libroDObject")) || [];

  const [cuentasAsi, setCuentasAsi] = useState([]);
  const [cuentas, setCuentas] = useState(
    JSON.parse(localStorage.getItem("cuentasObject"))
  );

  const [valorInput1, setValorInput1] = useState("0");
  const [valorInput2, setValorInput2] = useState("0");
  const [debeT, setDebeT] = useState(0);
  const [haberT, setHaberT] = useState(0);
  const [diferencia, setDiferencia] = useState(0);
  const [cuentasSeleccionadas, setCuentasSeleccionadas] = useState();

  const handleAgregar = () => {
    const nuevaEntrada = {
      cuenta: cuentas[cuentasSeleccionadas],
      debe: valorInput1,
      haber: valorInput2,
    };

    setDebeT(debeT + parseFloat(valorInput1));
    setHaberT(haberT + parseFloat(valorInput2));
    setDiferencia(
      diferencia + (parseFloat(valorInput1) - parseFloat(valorInput2))
    );

    setCuentasAsi([...cuentasAsi, nuevaEntrada]);
  };

  function deleteCuenta(cuen) {
    const i = cuentasAsi.indexOf(cuen);
    const tempcuentasAsi = [...cuentasAsi];

    tempcuentasAsi.splice(i, 1);
    let dM = 0;
    let hM = 0;
    tempcuentasAsi.forEach((c) => {
      dM += parseFloat(c.debe);
      hM += parseFloat(c.haber);
    });
    setDebeT(parseFloat(dM));
    setHaberT(parseFloat(hM));
    setDiferencia(parseFloat(dM) - parseFloat(hM));

    setCuentasAsi(tempcuentasAsi);
  }

  const handleInputChange1 = (value, name) => {
    setValorInput1(value);

    if (value.trim() !== "0") {
      setValorInput2("0");
    }
  };

  const handleInputChange2 = (value, name) => {
    setValorInput2(value);

    if (value.trim() !== "0") {
      setValorInput1("0");
    }
  };

  const initialCredentials = {
    fecha: "",
    concep: "",
    comm: "",
  };

  function setAsient(asiento) {
    const i = existLibro.findIndex((ld) => ld.fecha === libro.fecha);
    existLibro[i].asientos.push(asiento);
    localStorage.setItem("libroDObject", JSON.stringify(existLibro));
  }

  return (
    <>
      <h2 className="text-3xl text-slate-800">Agregar Asiento</h2>
      <BackBtn lib={libro.fecha} />
      <Formik
        initialValues={initialCredentials}
        validationSchema={AsientoSchema}
        onSubmit={async (values) => {
          await new Promise((r) => setTimeout(r, 1000));

          if (cuentasAsi.length === 0) {
            notie.alert({
              type: "error",
              text: `No has Agregado cuentas en el Asiento, Agrega cuentas!`,
            });
          } else {
            if (diferencia > 0 || diferencia < 0) {
              notie.alert({
                type: "error",
                text: `La Diferencia debe de ser $0!!!`,
              });
            } else {
              const newAsi = new AsientoClass(
                values.fecha,
                values.concep,
                cuentasAsi,
                debeT,
                haberT,
                values.comm
              );
              console.log(newAsi);
              setAsient(newAsi);
              nav("/DinoCifrasContablesRT/libroDiarioDetail", {
                state: libro.fecha,
              });
            }
          }
        }}
      >
        {({
          values,
          touched,
          errors,
          isSubmitting,
          handleChange,
          handleBlur,
          setFieldValue,
        }) => (
          <Form autoComplete="off">
            <div className="bg-orange-50 shadow-md rounded px-8 pt-6 pb-8 mb-4 flex flex-col my-2 font-comfortaa mt-10">
              <div className="-mx-3 md:flex mb-6">
                <div className="md:w-1/2 px-3 mb-6 md:mb-0">
                  <label
                    className="block uppercase tracking-wide text-grey-darker text-sm font-bold mb-2"
                    htmlFor="fecha"
                  >
                    Fecha
                  </label>
                  <Field
                    id="fecha"
                    name="fecha"
                    type="date"
                    placeholder="Nombre del Empleado"
                    className="appearance-none block w-full bg-slate-700 text-grey-darker border border-red rounded py-3 px-4 mb-3 text-orange-50"
                  />
                  {errors.fecha && touched.fecha && (
                    <ErrorMessage
                      className="text-red-400"
                      component="span"
                      name="fecha"
                    />
                  )}
                </div>
                <div className="md:w-1/2 px-3 mb-6 md:mb-0">
                  <label
                    className="block uppercase tracking-wide text-grey-darker text-sm font-bold mb-2"
                    htmlFor="concep"
                  >
                    Concepto
                  </label>
                  <Field
                    id="concep"
                    name="concep"
                    type="text"
                    placeholder="Concepto del Asiento"
                    className="appearance-none block w-full bg-slate-700 text-grey-darker border border-red rounded py-3 px-4 mb-3 text-orange-50"
                  />
                  {errors.concep && touched.concep && (
                    <ErrorMessage
                      className="text-red-400"
                      component="span"
                      name="concep"
                    />
                  )}
                </div>
                <div className="md:w-1/2 px-3 mb-6 md:mb-0">
                  <label
                    className="block uppercase tracking-wide text-grey-darker text-sm font-bold mb-2"
                    htmlFor="comm"
                  >
                    Comentario
                  </label>
                  <Field
                    id="comm"
                    name="comm"
                    type="text"
                    placeholder="Comentario del Asiento"
                    className="appearance-none block w-full bg-slate-700 text-grey-darker border border-red rounded py-3 px-4 mb-3 text-orange-50"
                  />
                  {errors.comm && touched.comm && (
                    <ErrorMessage
                      className="text-red-400"
                      component="span"
                      name="comm"
                    />
                  )}
                </div>
              </div>

              <label className="block uppercase tracking-wide text-grey-darker text-sm font-bold mb-2">
                Cuentas
              </label>
              <div className="mb-5">
                <Table
                  color={"default"}
                  selectionMode="single"
                  aria-label="Example static collection table"
                >
                  <TableHeader>
                    <TableColumn className="w-32">CODIGO</TableColumn>
                    <TableColumn>CUENTA</TableColumn>
                    <TableColumn>DEBE</TableColumn>
                    <TableColumn>HABER</TableColumn>
                    <TableColumn>ACCIÓN</TableColumn>
                  </TableHeader>
                  <TableBody>
                    {cuentasAsi.map((ca, i) => (
                      <TableRow key={i}>
                        <TableCell>{ca.cuenta.codigo}</TableCell>
                        <TableCell>{ca.cuenta.cuenta}</TableCell>
                        <TableCell>{ca.debe}</TableCell>
                        <TableCell>{ca.haber}</TableCell>
                        <TableCell>
                          <MdDeleteForever
                            onClick={() => deleteCuenta(ca)}
                            className="text-red-400 text-2xl cursor-pointer"
                          />
                        </TableCell>
                      </TableRow>
                    ))}
                  </TableBody>
                </Table>
              </div>
              <div className="-mx-3 md:flex mb-6">
                <div className="md:w-1/2 px-3 mb-6 md:mb-0 flex items-center gap-3">
                  <Select
                    label="Cuentas"
                    placeholder="Selecciona una Cuenta"
                    color="secondary"
                    className="max-w-xs text-slate-800 font-comfortaa mt-3"
                    onChange={(event) => {
                      setCuentasSeleccionadas(event.target.value);
                    }}
                  >
                    {cuentas.map((a, i) => (
                      <SelectItem
                        key={i}
                        value={a.cuenta}
                        textValue={`${a.codigo} - ${a.cuenta}`}
                      >
                        {a.codigo} - {a.cuenta}
                      </SelectItem>
                    ))}
                  </Select>
                  <div className="md:w-1/2 px-3">
                    <label
                      className="block uppercase tracking-wide text-grey-darker text-sm font-bold"
                      htmlFor="debe"
                    >
                      Debe
                    </label>
                    <CurrencyInput
                      id="debe"
                      name="debe"
                      placeholder="Please enter a number"
                      defaultValue={0}
                      prefix="$"
                      decimalSeparator="."
                      groupSeparator=","
                      decimalsLimit={2}
                      value={valorInput1}
                      onValueChange={(value) =>
                        handleInputChange1(value, "debe")
                      }
                      className="appearance-none block w-full h-14 bg-slate-700 text-grey-darker border border-red rounded-xl py-3 px-4 mb-3 text-orange-50"
                    />
                  </div>
                  <div className="md:w-1/2 px-3">
                    <label
                      className="block uppercase tracking-wide text-grey-darker text-sm font-bold"
                      htmlFor="haber"
                    >
                      Haber
                    </label>
                    <CurrencyInput
                      id="haber"
                      name="haber"
                      placeholder="Please enter a number"
                      defaultValue={0}
                      prefix="$"
                      decimalSeparator="."
                      groupSeparator=","
                      decimalsLimit={2}
                      value={valorInput2}
                      onValueChange={(value) =>
                        handleInputChange2(value, "haber")
                      }
                      className="appearance-none block w-full h-14 bg-slate-700 text-grey-darker border border-red rounded-xl py-3 px-4 mb-3 text-orange-50"
                    />
                  </div>
                  <Button
                    onClick={handleAgregar}
                    className="flex items-center font-comfortaa font-bold text-slate-800 hover:text-orange-50 bg-transparent w-96 py-2 px-4 rounded-md cursor-pointer mb-5 mt-9 border border-slate-800 hover:bg-emerald-500"
                  >
                    Agregar
                  </Button>
                </div>
              </div>
              <div className="-mx-3 md:flex mb-6 ml-10">
                <div className="md:w-32 px-3 mb-6 md:mb-0">
                  <label
                    className="block uppercase tracking-wide text-grey-darker text-sm font-bold mb-2"
                    htmlFor="debeT"
                  >
                    Debe
                  </label>
                  <CurrencyInput
                    id="debeT"
                    name="debeT"
                    placeholder="Please enter a number"
                    defaultValue={0}
                    prefix="$"
                    value={debeT}
                    disabled
                    decimalSeparator="."
                    groupSeparator=","
                    decimalsLimit={2}
                    onValueChange={(value) => setFieldValue("debeT", value)}
                    className="appearance-none block w-full bg-transparent text-slate-800 py-3 px-4 mb-3"
                  />
                  {errors.debeT && touched.debeT && (
                    <ErrorMessage
                      className="text-red-400"
                      component="span"
                      name="debeT"
                    />
                  )}
                </div>
                <div className="md:w-32 px-3 mb-6 md:mb-0">
                  <label
                    className="block uppercase tracking-wide text-grey-darker text-sm font-bold mb-2"
                    htmlFor="haberT"
                  >
                    Haber
                  </label>
                  <CurrencyInput
                    id="haberT"
                    name="haberT"
                    placeholder="Please enter a number"
                    defaultValue={0}
                    prefix="$"
                    value={haberT}
                    disabled
                    decimalSeparator="."
                    groupSeparator=","
                    decimalsLimit={2}
                    onValueChange={(value) => setFieldValue("haberT", value)}
                    className="appearance-none block w-full bg-transparent text-slate-800 py-3 px-4 mb-3"
                  />
                  {errors.haberT && touched.haberT && (
                    <ErrorMessage
                      className="text-red-400"
                      component="span"
                      name="haberT"
                    />
                  )}
                </div>
                <div className="md:w-1/2 px-3 mb-6 md:mb-0">
                  <label
                    className="block uppercase tracking-wide text-grey-darker text-sm font-bold mb-2"
                    htmlFor="dif"
                  >
                    Diferencia
                  </label>
                  <div className="flex items-center pt-2">
                    <span>$</span>
                    <Field
                      id="dif"
                      name="dif"
                      value={diferencia}
                      type="number"
                      disabled
                      className="appearance-none block w-full bg-transparent text-slate-800"
                    />
                  </div>
                </div>
              </div>
            </div>
            <Button
              className="bg-emerald-400 mt-3 p-2 rounded-md text-slate-800 uppercase font-bold font-comfortaa w-44 py-3 ml-10"
              type="submit"
            >
              Finalizar Asiento
            </Button>
            {/* {isSubmitting ? <span>Loooooogin your credentials...</span> : null} */}
          </Form>
        )}
      </Formik>
    </>
  );
}
