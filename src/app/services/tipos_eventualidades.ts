export class tipos_eventualidades {
  public tipos = [
    {
      id: 1,
      name: "Cierre",
    },
    {
      id: 2,
      name: "Peligro",
    },
    {
      id: 3,
      name: "Tráfico",
    },
  ];
  getTipos() {
    return this.tipos;
  }
}
