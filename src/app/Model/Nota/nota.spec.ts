import { Nota, NotasMateria, NotaConPorcentaje } from './nota';

describe('Nota', () => {
  it('should create an instance', () => {
    const notaConPorcentaje = Array<NotaConPorcentaje>();
    const nota = new NotasMateria("nombre", 0, notaConPorcentaje , 5, 100);
    expect(nota).toBeTruthy();
  });
});
