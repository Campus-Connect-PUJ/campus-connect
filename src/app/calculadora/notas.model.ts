export interface Nota{
    cantidad: string;
    notaEsperada: string;
}

export interface NotaConPorcentaje{
    notaObtenida: number;
    porcentaje: number;
}

export class NotasMateria{
    nombreMateria: string = "";
    notaEsperada: number = 0;
    notas: NotaConPorcentaje[];

    constructor(nombre: string, nota: number, notas: NotaConPorcentaje[]){
        this.nombreMateria = nombre;
        this.notaEsperada = nota;
        this.notas = notas;
    }
    
}