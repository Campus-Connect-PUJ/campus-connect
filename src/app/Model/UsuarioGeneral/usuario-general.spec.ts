import { UsuarioGeneral } from './usuario-general';

describe('UsuarioGeneral', () => {
  it('should create an instance', () => {
    const usuario = new UsuarioGeneral("nombre", "apellido", "correo@javeriana.edu.co");
    expect(usuario).toBeTruthy();
  });
});
