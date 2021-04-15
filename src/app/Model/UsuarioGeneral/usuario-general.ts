import { Carrera } from "../Carrera/carrera";
import { InformacionUsuario } from "../InformacionUsuario/informacion-usuario";
import { RegimenAlimenticio } from "../RegimenAlimenticio/regimen-alimenticio";
import { ReseniaGrupo } from "../ReseniaGrupo/reseniaGrupo";
import { ReseniaRestaurante } from "../ReseniaRestaurante/resenia-restaurante";
import { Rol } from "../Rol/rol";
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

  public enabled: boolean;
  public accountNonExpired: boolean;
  public accountNonLocked: boolean;
  public credentialsNonExpired: boolean;
  public rol: Rol;

  constructor(
    public nombre: string,
    public last_name: string,
    public email: string,
    public semestre: number
  ) {
    this.rol = undefined;
    this.id = undefined;
    this.enabled = undefined;
    this.accountNonExpired = undefined;
    this.accountNonLocked = undefined;
    this.credentialsNonExpired = undefined;
  }
}
