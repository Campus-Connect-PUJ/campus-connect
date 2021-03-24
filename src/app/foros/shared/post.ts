import { UsuarioGeneral } from "src/app/tips/shared/tips";

export class Post{
    id: number;
    fecha: Date;
    titulo: string;
    descripcion: string;
    reportado: boolean;

    usuario: UsuarioGeneral;
    respuestaPost: RespuestaPost;
}

export class RespuestaPost{
    id: number;
    fecha: Date;
    texto: string;
    reportado: boolean;

    post: Post;
    usuario: UsuarioGeneral;
    constructor(){
        
    }
}
