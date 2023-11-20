export class CuentaMayoriClass {
  cuenta = CuentaClass;
  debe = 0.0;
  haber = 0.0;
  constructor(cuenta, debe, haber) {
    this.cuenta = cuenta;
    this.debe = debe;
    this.haber = haber;
  }
}
