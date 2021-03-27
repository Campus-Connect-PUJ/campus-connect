import { Caracteristica } from "../Caracteristica/caracteristica";
import { Facultad } from "../Facultad/facultad";
import { Requisito } from "../Requisito/requisito";
import { Tematica } from "../Tematica/tematica";

export class GrupoEstudiantil {
  id: number;
  tematicas: Tematica[] = [];
  calificacion: number;
  caracteristicas: Caracteristica[] = [];
  requisitos: Requisito[]=[];
  facultad: Facultad;
  constructor(
    public descripcion: string,
    public nombre: string,
    public perfilGrupo: string
  ) {}
}