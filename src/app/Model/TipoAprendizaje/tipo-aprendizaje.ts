import { Tip } from "../Tip/tip";

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
