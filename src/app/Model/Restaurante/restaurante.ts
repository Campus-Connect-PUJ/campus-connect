export class Restaurante {
  id: number;
  tipo: string[] = [];
  calificacion: number;
  regimenAlimenticio: string[] = [];
  franquicia: string;
  tiempoEntrega:number;
  constructor(
    public nombre: string,
    public descripcion: string,
    public precioMin: number,
    public precioMax: number
  ) {}
}
