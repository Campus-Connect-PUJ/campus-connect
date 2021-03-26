import { TipoAprendizaje } from './TipoAprendizaje.model';
import { UsuarioGeneral } from './UsuarioGeneral.model';

export class Tip {
    id: number;
    descripcion: string;
    usuario: UsuarioGeneral;
    tiposAprendizaje: TipoAprendizaje[];

    constructor(){}
}



  /*
  @OneToOne(mappedBy = "usuario",
            fetch = FetchType.LAZY,
            cascade = CascadeType.ALL)
  private InformacionUsuario informacionUsuario;

  // relaciones muchos a muchos  ---------------------
  @ManyToMany(mappedBy = "usuarios")
  private List<UsuarioCAE> rolesCAE;

  @ManyToMany(mappedBy = "monitores")
  private List<Asignatura> monitorDe;

  @ManyToMany(mappedBy = "usuarios")
  private List<Caracteristica> caracteristicas;

  @ManyToMany(mappedBy = "usuarios")
  private List<RolAdministrador> rolesAdministrador;

  @ManyToMany(mappedBy = "usuarios")
  private List<Carrera> carrerasUsuario;

  */

