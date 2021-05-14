import { Carrera } from './carrera';

describe('Carrera', () => {
  it('should create an instance', () => {
    const carrera = new Carrera("Ingenieria de sistemas")
    expect(carrera).toBeTruthy();
  });
});
