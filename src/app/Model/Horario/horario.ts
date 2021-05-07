import { UsuarioGeneral } from "../UsuarioGeneral/usuario-general";
import * as moment from 'moment';

export class Horario {
  id: number;
  monitor: UsuarioGeneral;
  fechaInicial: Date;
  fechaFinal: Date;

  nombreAsignatura: string;
  lugar: string;

  Horario(){

  }

  convertir(fecha: Date): string{
    const resultado: string = moment(fecha).format("DD-MMM-YYYY HH:mm");
    return resultado;
  }

  fmtFInicial() {
    return this.convertir(this.fechaInicial);
  }

  fmtFFinal() {
    return this.convertir(this.fechaFinal);
  }


}
