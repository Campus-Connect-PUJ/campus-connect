import { Asignatura } from "../Asignatura/asignatura";
import { Horario } from "../Horario/horario";
import { UsuarioGeneral } from "../UsuarioGeneral/usuario-general";

export class Monitoria {
    id: number;
    usuario: UsuarioGeneral;
    asignatura: Asignatura;
    horarios: Horario[] = [];
    calificacion: number;
    cantidadVotos: number;
    Monitoria(){
        
    }
}
