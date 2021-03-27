import { Caracteristica } from "../Caracteristica/caracteristica";
import { Requisito } from "../Requisito/requisito";
import { Tematica } from "../Tematica/tematica";

export class GrupoEstudiantil {
  id: number;
  tematicas: Tematica[] = [];
  calificacion: number;
  caracteristicas: Caracteristica[] = [];
  requisitos: Requisito[]=[];
  constructor(
    public descripcion: string,
    public nombre: string,
    public perfilGrupo: string
  ) {}
}