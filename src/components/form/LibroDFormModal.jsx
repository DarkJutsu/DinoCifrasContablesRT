import {
  Button,
  Input,
  Modal,
  ModalBody,
  ModalContent,
  ModalFooter,
  ModalHeader,
} from "@nextui-org/react";
import { ErrorMessage, Field, Form, Formik } from "formik";
import * as Yup from "yup";
import notie from "notie";
import "notie/dist/notie.css";
import { LibroDiarioClass } from "../../model/libroDiario.class";
import { getFchFormat } from "../../utils/getFchFormat.function";

const libroDSchema = Yup.object().shape({
  fecha: Yup.date().required("Fecha del Libro Diario requerida!"),
  concep: Yup.string()
    .min(10, "El titulo del Libro Diario de poseer almenos 10 caracteres!")
    .required("Titulo del Libro Diario requerido!"),
});

export function LibroDFormModal({ addLibroD, isOpen, onOpenChange }) {
  const arrayExist = JSON.parse(localStorage.getItem("libroDObject") || "[]");

  const initialCredentials = {
    fecha: "",
    concep: "",
  };

  return (
    <>
      <Modal
        size="xl"
        backdrop="opaque"
        isOpen={isOpen}
        onOpenChange={onOpenChange}
        placement="top-center"
        classNames={{
          body: "py-6",
          backdrop: "bg-[#292f46]/50 backdrop-opacity-40",
          base: "border-[#292f46] bg-[#19172c] dark:bg-orange-50 text-[#a8b0d3]  font-comfortaa",
        }}
      >
        <ModalContent>
          {(onClose) => (
            <>
              <Formik
                initialValues={initialCredentials}
                validationSchema={libroDSchema}
                onSubmit={async (values) => {
                  await new Promise((r) => setTimeout(r, 700));
                  const fchExist = arrayExist.find(
                    (l) => l.fecha === values.fecha
                  );

                  if (!fchExist) {
                    const newLibro = new LibroDiarioClass(
                      values.fecha,
                      values.concep
                    );
                    arrayExist.push(newLibro);
                    addLibroD(arrayExist);
                  } else {
                    notie.alert({
                      type: "error",
                      text: `Ya existe un Libro Diario en esta ${getFchFormat(
                        values.fecha
                      )} fecha, Utiliza Otra Fecha!`,
                    });
                  }

                  values.fecha = "";
                  values.concep = "";
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
                    <ModalHeader className="flex flex-col gap-1 text-2xl text-slate-800">
                      Agregar Libro Diario
                    </ModalHeader>
                    <ModalBody>
                      <Field
                        autoFocus
                        label="Fecha"
                        id="fecha"
                        name="fecha"
                        type="date"
                        placeholder="Fecha"
                        className="appearance-none block w-full bg-slate-700 text-grey-darker border border-red rounded py-3 px-4 text-orange-50"
                      />
                      {errors.fecha && touched.fecha && (
                        <ErrorMessage
                          className="text-red-400"
                          component="span"
                          name="fecha"
                        />
                      )}
                      <Field
                        label="Concepto"
                        id="concep"
                        name="concep"
                        type="text"
                        placeholder="Concepto"
                        className="appearance-none block w-full bg-slate-700 text-grey-darker border border-red rounded py-3 px-4 text-orange-50"
                      />
                      {errors.concep && touched.concep && (
                        <ErrorMessage
                          className="text-red-400"
                          component="span"
                          name="concep"
                        />
                      )}
                    </ModalBody>
                    <ModalFooter>
                      <Button onPress={onClose} className="bg-red-300 text-slate-800 font-bold">
                        Cancelar
                      </Button>
                      <Button type="submit" onPress={onClose} className="text-slate-800 bg-emerald-400 font-bold">
                        Agregar
                      </Button>
                    </ModalFooter>
                  </Form>
                )}
              </Formik>
            </>
          )}
        </ModalContent>
      </Modal>
    </>
  );
}
