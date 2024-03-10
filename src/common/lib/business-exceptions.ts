/**
 * Clase para el manejo de excepciones
 * @author Fredy Santiago Martinez
 */

import { EmessageMapping } from "../utils/enums/message.enum";
import { Etask } from "../utils/enums/taks.enum";

export class BusinessException {

  constructor(
    public readonly code: number,
    public readonly description: string,
    public readonly success: boolean = false,
    public readonly details?: IoptionalDetails
  ) { }

}

export interface IoptionalDetails {
  readonly codMessage?: EmessageMapping;
  readonly context?: string;
  readonly task?: Etask;
  readonly document?: any;
}
