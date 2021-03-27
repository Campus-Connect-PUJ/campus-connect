import { Caracteristica } from "../Caracteristica/caracteristica";
import { Tematica } from "../Tematica/tematica";

export class GrupoEstudiantil {
  id: number;
  tematicas: Tematica[] = [];
  calificacion: number;
  caracteristicas: Caracteristica[] = [];
  constructor(
    public descripcion: string,
    public nombre: string,
    public requisitos: string,
    public perfilGrupo: string
  ) {}
}