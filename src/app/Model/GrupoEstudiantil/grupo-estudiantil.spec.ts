import { GrupoEstudiantil } from './grupo-estudiantil';

describe('GrupoEstudiantil', () => {
  it('should create an instance', () => {
    const grupo = new GrupoEstudiantil("descripcion", "nombre", "perfilGrupo");
    expect(grupo).toBeTruthy();
  });
});
