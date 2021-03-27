import { Lugar } from "../Lugar/lugar";
import { TipoComida } from "../TipoComida/tipo-comida";
import { TipoRestaurante } from "../TipoRestaurante/tipo-restaurante";

export class Restaurante {
  id: number;
  tipoComida: TipoComida[] = [];
  tipoRestaurante: TipoRestaurante[] = [];
  calificacion: number;
  regimenAlimenticio: string[] = [];
  franquicia: string;
  tiempoEntrega:number;
  ambientacion: string;
  ubicacion: Lugar;
  constructor(
    public nombre: string,
    public descripcion: string,
    public precioMin: number,
    public precioMax: number
  ) {}
}
