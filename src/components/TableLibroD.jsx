import {
  Table,
  TableBody,
  TableCell,
  TableColumn,
  TableHeader,
  TableRow,
} from "@nextui-org/react";
import { getFchFormat } from "../utils/getFchFormat.function";
import { MdDeleteForever } from "react-icons/md";
import { Link, useNavigate } from "react-router-dom";

export function TableLibroD({ libroD, remove }) {
  const nav = useNavigate();
  return (
    <div className="flex flex-col gap-3 w-3/4">
      <Table
        color={"default"}
        selectionMode="single"
        aria-label="Example static collection table"
      >
        <TableHeader>
          <TableColumn className="w-32">FECHA</TableColumn>
          <TableColumn>CONCEPTO</TableColumn>
          <TableColumn>ACCIÓN</TableColumn>
        </TableHeader>
        <TableBody>
          {libroD.map((lib, i) => (
            <TableRow key={i}>
              <TableCell
                className="cursor-pointer"
                onClick={() =>
                  nav("/DinoCifrasContablesRT/libroDiarioDetail", {
                    state: lib.fecha,
                  })
                }
              >
                {getFchFormat(lib.fecha)}
              </TableCell>
              <TableCell
                className="cursor-pointer"
                onClick={() =>
                  nav("/DinoCifrasContablesRT/libroDiarioDetail", {
                    state: lib.fecha,
                  })
                }
              >
                {lib.titulo}
              </TableCell>
              <TableCell>
                <MdDeleteForever
                  onClick={() => remove(lib)}
                  className="text-red-400 text-2xl cursor-pointer"
                />
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </div>
  );
}
