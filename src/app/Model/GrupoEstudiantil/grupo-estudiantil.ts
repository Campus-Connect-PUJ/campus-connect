import { Caracteristica } from "../Caracteristica/caracteristica";

export class GrupoEstudiantil {
  id: number;
  tematicas: string[] = [];
  calificacion: number;
  caracteristicas: Caracteristica[] = [];
  constructor(
    public descripcion: string,
    public nombre: string,
    public requisitos: string,
    public perfilGrupo: string
  ) {}
}