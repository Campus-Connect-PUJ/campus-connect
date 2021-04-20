import { Carrera } from "../Carrera/carrera";
import { InformacionUsuario } from "../InformacionUsuario/informacion-usuario";
import { Monitoria } from "../Monitoria/monitoria";
import { RegimenAlimenticio } from "../RegimenAlimenticio/regimen-alimenticio";
import { ReseniaGrupo } from "../ReseniaGrupo/reseniaGrupo";
import { ReseniaRestaurante } from "../ReseniaRestaurante/resenia-restaurante";
import { Tip } from "../Tip/tip";
import { TipoAprendizaje } from "../TipoAprendizaje/tipo-aprendizaje";

export class UsuarioGeneral {
  id: number;
  tips: Tip[] = [];
  estilosAprendizaje: TipoAprendizaje[] = [];
  reseniasGrupo: ReseniaGrupo[] = [];
  reseniaRestaurante: ReseniaRestaurante[] = [];
  regimenAlimenticio: RegimenAlimenticio;
  nivelRegimenAlimenticio: number;
  informacion: InformacionUsuario;

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

  constructor(
    public nombre: string,
    public apellido: string,
    public email: string,
  ) { }
}
