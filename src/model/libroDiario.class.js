export class LibroDiarioClass {
  fecha = "";
  titulo = "";
  asientos = [];
  constructor(fecha, titulo) {
    this.fecha = fecha;
    this.titulo = titulo.toUpperCase();
  }

  setAsiento(asiento) {
    this.asientos.push(asiento);
  }
}
