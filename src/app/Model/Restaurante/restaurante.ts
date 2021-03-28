import { Lugar } from "../Lugar/lugar";
import { RegimenAlimenticio } from "../RegimenAlimenticio/regimen-alimenticio";
import { ReseniaRestaurante } from "../ReseniaRestaurante/resenia-restaurante";
import { TipoComida } from "../TipoComida/tipo-comida";
import { TipoRestaurante } from "../TipoRestaurante/tipo-restaurante";

export class Restaurante {
  id: number;
  tipoComida: TipoComida[] = [];
  tipoRestaurante: TipoRestaurante[] = [];
  calificacion: number;
  franquicia: string;
  tiempoEntrega:number;
  ambientacion: string;
  ubicacion: Lugar;
  reseniaRestaurnate: ReseniaRestaurante[]=[];
  regimenAlimenticio: RegimenAlimenticio[]=[];
  constructor(
    public nombre: string,
    public descripcion: string,
    public precioMin: number,
    public precioMax: number
  ) {}
}
