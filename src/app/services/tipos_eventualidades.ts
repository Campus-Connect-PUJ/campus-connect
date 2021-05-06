export class tipos_eventualidades {
  public tipos = [
    {
      id: 1,
      name: "Prohibido el paso",
    },
    {
      id: 2,
      name: "Paso peligroso",
    },
    {
      id: 3,
      name: "Mucho tráfico",
    },
  ];
  getTipos() {
    return this.tipos;
  }
}
