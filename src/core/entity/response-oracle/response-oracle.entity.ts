/**
 * Clase donde se definen los atributos para una respuesta de una consulta a OracleDB
 * @author Damian Duarte
 */

export interface ResponseOracleDB<T> {
  code: number;
  description: string;
  data: T[];
}
