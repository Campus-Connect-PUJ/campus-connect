import { UsuarioGeneral } from 'src/app/Model/UsuarioGeneral/usuario-general';
import { Foro } from './foro';

describe('Foro', () => {
  it('should create an instance', () => {
    const usuario = new UsuarioGeneral("nombre", "apellido", "correo@javeriana.edu.co");
    const foro = new Foro("titulo", "descripcion", usuario);
    expect(foro).toBeTruthy();
  });
});
