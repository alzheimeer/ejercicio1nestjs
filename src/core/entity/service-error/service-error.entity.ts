/**
 * Clase donde se definen los campos para el manejo de errores en el ms
 * @author Fredy Santiago Martinez
 */
import { ITaskError } from "./task-error.entity";

export interface IServiceError {
  success?: boolean;
  origen?: string;
  method?: string;
  tack?: ITaskError;
  message?: string;
  channel?: string;
  stack?: string;
  request?: any;
  serviceid?: string;
  response?:any;
}