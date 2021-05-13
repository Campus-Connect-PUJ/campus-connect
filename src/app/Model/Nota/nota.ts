export interface Nota{
    cantidad: number;
    notaEsperada: number;
}

export class NotaConPorcentaje{
    notaObtenida: number;
    porcentaje: number;
}

export class NotasMateria{
    nombreMateria: string = "";
    notaEsperada: number = 0;
    notas: NotaConPorcentaje[];
    notaActual: number = 0;
    porcentajeActual: number = 0;

    constructor(nombre: string, nota: number, notas: NotaConPorcentaje[], notaActual: number, porcentajeActual: number ){
        this.nombreMateria = nombre;
        this.notaEsperada = nota;
        this.notas = notas;
        this.notaActual = notaActual;
        this.porcentajeActual = porcentajeActual;
    }

}
