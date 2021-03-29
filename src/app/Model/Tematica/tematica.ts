import { Caracteristica } from "../Caracteristica/caracteristica";

export class Tematica {
    id: number;
    descripcion: string;
    caracteristicas: Caracteristica[]=[];
    constructor() {}
}
