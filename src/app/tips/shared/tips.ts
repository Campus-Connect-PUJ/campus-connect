export class Tip {
    id: number;
    descripcion: string;
    
    usuario: UsuarioGeneral;
    respuestas: TipoAprendizaje[];

    constructor(){}
}

export class UsuarioGeneral {
    id: number;
    nombre: string;
    correo: string;
    semestre: number;
    tips: Array<Tip>;
    estilosAprendizaje: Array<TipoAprendizaje>

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
    constructor() {}


    
    /*
    @ManyToMany(mappedBy = "estilosAprendizaje")
    private List<UsuarioGeneral> usuarios;

    @ManyToMany(mappedBy = "tiposAprendizaje")
    private List<Tip> tips;
    */

}
