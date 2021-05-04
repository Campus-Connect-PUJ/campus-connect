import { Caracteristica } from "../Caracteristica/caracteristica";
import { Carrera } from "../Carrera/carrera";
import { GrupoEstudiantil } from "../GrupoEstudiantil/grupo-estudiantil";
import { InformacionUsuario } from "../InformacionUsuario/informacion-usuario";
import { Monitoria } from "../Monitoria/monitoria";
import { RegimenAlimenticio } from "../RegimenAlimenticio/regimen-alimenticio";
import { ReseniaGrupo } from "../ReseniaGrupo/reseniaGrupo";
import { ReseniaRestaurante } from "../ReseniaRestaurante/resenia-restaurante";
import { Restaurante } from "../Restaurante/restaurante";
import { Tip } from "../Tip/tip";
import { TipoAprendizaje } from "../TipoAprendizaje/tipo-aprendizaje";
import { TipoComida } from "../TipoComida/tipo-comida";

export class UsuarioGeneral {
  id: number;
  tips: Tip[] = [];
  estilosAprendizaje: TipoAprendizaje[] = [];
  reseniasGrupo: ReseniaGrupo[] = [];
  reseniaRestaurante: ReseniaRestaurante[] = [];
  regimenAlimenticio: RegimenAlimenticio;
  nivelRegimenAlimenticio: number;
  informacion: InformacionUsuario;
  gruposSugeridos: GrupoEstudiantil[]=[];
  restaurantesSugeridos: Restaurante[]=[];
  caracteristicas: Caracteristica[]=[];
  comidaFav: TipoComida[]=[];

  carreras: Carrera[] = [];
  semestre: number;

  fechaNacimiento: Date;

  enabled: boolean = true;
  accountNonExpired: boolean = true;
  accountNonLocked: boolean = true;
  credentialsNonExpired: boolean = true;
  roles: string[] = [];
  monitorDe: Monitoria[] = [];
  puntajeTotal: number;
  tipsGustados: Tip[] = [];
  tipsNoGustados: Tip[] = [];

  constructor(
    public nombre: string,
    public apellido: string,
    public email: string,
  ) { }
}
