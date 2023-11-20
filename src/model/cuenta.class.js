export class CuentaClass {
  codigo = "";
  cuenta = "";
  tipo = "";
  debe = 0.0;
  haber = 0.0;
  constructor(codigo, cuenta) {
    this.codigo = codigo;
    this.cuenta = cuenta.toUpperCase();
    this.veriTipo(this.codigo);
  }

  aumentarDebe(monto) {
    this.debe = this.debe + monto;
  }
  aumentarHaber(monto) {
    this.haber = this.haber + monto;
  }

  total() {
    return `El total de ${this.cuenta} es 100`;
  }

  veriTipo(codigo) {
    const cod = codigo.slice(0, 4);
    switch (cod) {
      case "1101":
        this.tipo = "EFECTIVO Y EQUIVALENTES DE EFECTIVO";
        break;
      case "1103":
        this.tipo = "CUENTAS Y DOCUMENTOS POR COBRAR";
        break;
      case "1107":
        this.tipo = "DEUDORES DIVERSOS";
        break;
      case "1109":
        this.tipo = "INVENTARIOS";
        break;
      case "1111":
        this.tipo = "GASTOS PAGADOS POR ANTICIPADOS";
        break;
      case "1113":
        this.tipo = "IVA CREDITO FISCAL";
        break;
      case "1201":
        this.tipo = "PROPIEDAD PLANTA Y EQUIPO";
        break;
      case "1202":
        this.tipo = "DEPRECIACIONES";
        break;
      case "2102":
        this.tipo = "CUENTAS Y DOCUMENTOS POR PAGAR";
        break;
      case "2106":
        this.tipo = "PRESTAMOS POR PAGAR";
        break;
      case "2107":
        this.tipo = "ACREEDORES VARIOS";
        break;
      case "2111":
        this.tipo = "IVA PERCIBIDO Y RETENIDO POR PAGAR";
        break;
      case "3101":
        this.tipo = "CAPITAL SOCIAL";
        break;
      case "3102":
        this.tipo = "RESERVA LEGAL";
        break;
      case "3104":
        this.tipo = "UTILIDAD DEL EJERCICIO";
        break;
      case "4201":
        this.tipo = "GASTOS DE ADMINISTRACION";
        break;
      case "4203":
        this.tipo = "REBAJAS Y DEVOLUCIONES SOBRE VENTAS";
        break;
      case "4101":
        this.tipo = "COMPRAS";
        break;
      case "4301":
        this.tipo = "GASTOS FINANCIEROS";
        break;
      case "5101":
        this.tipo = "INGRESOS DE OPERACIÓN";
        break;
      case "5102":
        this.tipo = "REBAJAS Y DEVOLUCIONES SOBRE COMPRAS";
        break;
      default:
        this.tipo = "--";
        break;
    }
  }
}
