import { Caracteristica } from "../Caracteristica/caracteristica";

export class Tematica {
    id: number;
    nombre: string;
    caracteristicas: Caracteristica[]=[];
    constructor() {}
}
