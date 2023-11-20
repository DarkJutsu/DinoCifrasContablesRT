import { CuentaClass } from "./cuenta.class";

export class AsientoClass {
  fecha = "";
  concepto = "";
  cuentas = [];
  debe = 0.0;
  haber = 0.0;
  comentario = "";
  constructor(fecha, concepto, cuentas, debe, haber, comentario) {
    this.fecha = fecha;
    this.concepto = concepto;
    this.cuentas = cuentas;
    this.debe = debe;
    this.haber = haber;
    this.comentario = comentario;
  }
}
