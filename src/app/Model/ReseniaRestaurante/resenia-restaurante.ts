import { Restaurante } from "../Restaurante/restaurante";
import { UsuarioGeneral } from "../UsuarioGeneral/usuario-general";

export class ReseniaRestaurante {
    id: number;
    estrellas: number;
    usuario: UsuarioGeneral;
    restaurante: Restaurante;
    constructor() {}
}
