import { CuentaClass } from "../model/cuenta.class";

export function genCuentas() {
  const arrayExistente =
    JSON.parse(localStorage.getItem("cuentasObject")) || [];
  arrayExistente.push(new CuentaClass("110101", "caja"));
  arrayExistente.push(new CuentaClass("110102", "banco"));
  arrayExistente.push(new CuentaClass("110301", "clientes"));
  arrayExistente.push(new CuentaClass("110701", "Anticipos a proveedores"));
  arrayExistente.push(new CuentaClass("1109", "inventarios"));
  arrayExistente.push(new CuentaClass("111102", "Alquileres"));
  arrayExistente.push(new CuentaClass("111103", "Papelería y útiles"));
  arrayExistente.push(new CuentaClass("111104", "Pago a cuenta"));
  arrayExistente.push(new CuentaClass("120101", "Terrenos"));
  arrayExistente.push(new CuentaClass("120102", "Edificios"));
  arrayExistente.push(new CuentaClass("120103", "Instalaciones"));
  arrayExistente.push(new CuentaClass("120104", "Equipo de reparto"));
  arrayExistente.push(
    new CuentaClass("120105", "Mobiliario y equipo de oficina")
  );
  arrayExistente.push(new CuentaClass("120106", "Equipo de Cómputo"));
  arrayExistente.push(new CuentaClass("120107", "Máquinaria"));
  arrayExistente.push(new CuentaClass("120201", "Edificio"));
  arrayExistente.push(new CuentaClass("120202", "Instalaciones"));
  arrayExistente.push(new CuentaClass("210201", "PROVEEDORES LOCALES"));
  arrayExistente.push(new CuentaClass("210202", "PROVEEDORES EXTRANJEROS"));
  arrayExistente.push(new CuentaClass("210501", "Bancarios"));
  arrayExistente.push(new CuentaClass("210704", "Pago a cuenta"));
  arrayExistente.push(new CuentaClass("210709", "Alquileres por pagar"));
  arrayExistente.push(new CuentaClass("3101", "CAPITAL SOCIAL"));
  arrayExistente.push(new CuentaClass("3102", "RESERVA LEGAL"));
  arrayExistente.push(new CuentaClass("3104", "UTILIDAD DEL EJERCICIO"));
  arrayExistente.push(new CuentaClass("4101", "compras"));
  arrayExistente.push(new CuentaClass("4203", "DEVOLUCIONES SOBRE VENTAS"));
  arrayExistente.push(new CuentaClass("430101", "Intereses"));
  arrayExistente.push(new CuentaClass("5101", "VENTAS"));
  arrayExistente.push(new CuentaClass("5102", "DEVOLUCIONES SOBRE COMPRAS"));

  localStorage.setItem("cuentasObject", JSON.stringify(arrayExistente));
}
