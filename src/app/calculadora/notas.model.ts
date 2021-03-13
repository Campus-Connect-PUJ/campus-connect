export interface Nota{
    cantidad: string;
    notaEsperada: string;
}

export interface NotaConPorcentaje{
    notaObtenida: number;
    porcentaje: number;
}

export interface NotasMateria{
    notaEsperada: number;
    nombreMateria: string;
    notas: NotaConPorcentaje[];
}