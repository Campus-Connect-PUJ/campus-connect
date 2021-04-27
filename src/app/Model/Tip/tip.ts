import { TipoAprendizaje } from "../TipoAprendizaje/tipo-aprendizaje";
import { UsuarioGeneral } from "../UsuarioGeneral/usuario-general";

export class Tip {
    id: number;
    descripcion: string;
    idUsuarioCreador: number;
    usuario: UsuarioGeneral;
    tiposAprendizaje: TipoAprendizaje[];
    puntaje: number;
    nivelExigencia: number;

    constructor(){}
}
