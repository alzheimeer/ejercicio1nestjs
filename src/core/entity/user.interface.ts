/**
 * Interfaz donde se definen los campos para los usuarios
 * @author Mauricio Quintero
 */
import { IAddress } from './address.interface';

export interface IUser {
  id: string;
  name: string;
  documentNumber: string;
  documentType: string;
  addresses: IAddress[];
}