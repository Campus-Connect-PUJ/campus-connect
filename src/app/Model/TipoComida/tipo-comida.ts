export class TipoComida {
    id: number;
    tipo: string;
    constructor() {}

    toString(){
        return this.id+" "+this.tipo;
    }
}
