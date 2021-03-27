import { TipoComida } from "../TipoComida/tipo-comida";

export class Restaurante {
  id: number;
  tipo: TipoComida[] = [];
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
