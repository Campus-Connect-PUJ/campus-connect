import { Lugar } from "../Lugar/lugar";
import { RegimenAlimenticio } from "../RegimenAlimenticio/regimen-alimenticio";
import { ReseniaRestaurante } from "../ReseniaRestaurante/resenia-restaurante";
import { TipoComida } from "../TipoComida/tipo-comida";
import { TipoRestaurante } from "../TipoRestaurante/tipo-restaurante";

export class Restaurante {
  id: number;
  tiposComida: TipoComida[] = [];
  tipoRestaurante: TipoRestaurante[] = [];
  calificacion: number;
  franquicia: string;
  tiempoEntrega:number;
  ambientacion: string;
  ubicacion: Lugar;
  contacto: string;
  reseniaRestaurnate: ReseniaRestaurante[]=[];
  regimenesAlimenticios: RegimenAlimenticio[]=[];
  constructor(
    public nombre: string,
    public descripcion: string,
    public precioMin: number,
    public precioMax: number
  ) {}
}
