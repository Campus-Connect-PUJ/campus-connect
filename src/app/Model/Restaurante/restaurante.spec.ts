import { Restaurante } from './restaurante';

describe('Restaurante', () => {
  it('should create an instance', () => {
    const restaurante = new Restaurante("nombre", "descripcion", 0, 10);
    expect(restaurante).toBeTruthy();
  });
});
