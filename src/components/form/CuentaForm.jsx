import { Button } from "@nextui-org/react";
import { ErrorMessage, Field, Form, Formik } from "formik";
import * as Yup from "yup";
import { CuentaClass } from "../../model/cuenta.class";

const cuentaSchema = Yup.object().shape({
  cod: Yup.number()
    .min(999, "El codigo de debe tener mas de 4 números")
    .required("Codigo de cuenta requerido"),
  cuent: Yup.string()
    .min(4, "El nombre de la cuenta debe poseer mas de 4 caracteres")
    .required("Nombre de cuenta requerido"),
});

export function CuentaForm({ addCuenta }) {
  const arrayExist = JSON.parse(localStorage.getItem("cuentasObject") || "[]");

  const initialCredentials = {
    cod: "",
    cuent: "",
  };

  return (
    <>
      <Formik
        initialValues={initialCredentials}
        validationSchema={cuentaSchema}
        onSubmit={async (values) => {
          await new Promise((r) => setTimeout(r, 700));
          const newCuent = new CuentaClass(values.cod, values.cuent);

          arrayExist.push(newCuent);
          addCuenta(arrayExist);

          values.cod = "";
          values.cuent = "";
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
            <div className="flex flex-col mt-7">
              <div className="-mx-3 md:flex mb-6">
                <div className="md:w-1/5 px-3 mb-6 md:mb-0">
                  <label
                    className="block uppercase tracking-wide text-grey-darker text-sm font-bold mb-2"
                    htmlFor="cod"
                  >
                    Codigo Cuenta
                  </label>
                  <Field
                    id="cod"
                    name="cod"
                    type="text"
                    placeholder="Codigo Cuenta"
                    className="appearance-none block w-full bg-slate-700 text-grey-darker border border-red rounded py-3 px-4 mb-3 text-orange-50"
                  />
                  {errors.cod && touched.cod && (
                    <ErrorMessage
                      className="text-red-400"
                      component="span"
                      name="cod"
                    />
                  )}
                </div>
                <div className="md:w-1/3 px-3 mb-6 md:mb-0">
                  <label
                    className="block uppercase tracking-wide text-grey-darker text-sm font-bold mb-2"
                    htmlFor="cuent"
                  >
                    Nombre de Cuenta
                  </label>
                  <Field
                    id="cuent"
                    name="cuent"
                    type="text"
                    placeholder="Nombre de Cuenta"
                    className="appearance-none block w-full bg-slate-700 text-grey-darker border border-red rounded py-3 px-4 mb-3 text-orange-50"
                  />
                  {errors.cuent && touched.cuent && (
                    <ErrorMessage
                      className="text-red-400"
                      component="span"
                      name="cuent"
                    />
                  )}
                </div>
                <div className="flex items-center">
                  <Button
                    type="submit"
                    className="bg-emerald-400 uppercase text-lg font-bold text-slate-800 h-12 w-44 ml-10 rounded"
                  >
                    Agregar
                  </Button>
                </div>
              </div>
            </div>
          </Form>
        )}
      </Formik>
    </>
  );
}
