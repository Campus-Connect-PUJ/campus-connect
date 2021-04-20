import { GrupoEstudiantil } from "../GrupoEstudiantil/grupo-estudiantil";
import { UsuarioGeneral } from "../UsuarioGeneral/usuario-general";

export class ReseniaGrupo {
    id: number;
    estrellas: number;
    grupoEstudiantil: GrupoEstudiantil;
    usuario: UsuarioGeneral;
    constructor() {}
}
