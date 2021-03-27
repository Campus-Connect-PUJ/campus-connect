export class GrupoEstudiantil {
  id: number;
  tematicas: string[] = [];
  calificacion: number;
  caracteristicas: string[] = [];
  constructor(
    public descripcion: string,
    public nombre: string,
    public requisitos: string,
    public perfilGrupo: string
  ) {}
}