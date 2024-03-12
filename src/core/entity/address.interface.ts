/**
 * Interfaz donde se definen los campos para la direccion
 * @author Mauricio Quintero
 */
export interface IAddress {
    id: string;
    address: string;
    isActive: boolean;
    isPrimary: boolean;
  }