export class Tip {
    id: number;
    descripcion: string;
    usuario: UsuarioGeneral;
    tiposAprendizaje: TipoAprendizaje[];

    constructor(){}
}

export class UsuarioGeneral {
  id: number;
  tips: Tip[];
  estilosAprendizaje: TipoAprendizaje[];
  constructor(
    public nombre: string,
    public correo: string,
    public semestre: number
  ) {
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
}

export class TipoAprendizaje {
  id: number;
  descripcion: string;
  tips: Tip[];
  constructor() { }

  /*
  @ManyToMany(mappedBy = "estilosAprendizaje")
  private List<UsuarioGeneral> usuarios;

  @ManyToMany(mappedBy = "tiposAprendizaje")
  private List<Tip> tips;
  */

}
