import { ResponseOracleDB } from 'src/core/entity/response-oracle/response-oracle.entity';

export abstract class IOracleDBProvider {
  /**
   * Función para ejecutar un sp en Oracle
   * @param {String} procedure definición de la consulta
   * @param {params} params parametros para la consulta
   * @param {string} cursorName nombre del cursor a ejecutar
   * @param {boolean} isMaped De ser verdadero regresa el resultado como un objeto {[header]: value}, en caso contrario un arreglo de valores, por defecto es false.
   */
  abstract consultSP<T = any>(
    procedure: string,
    params: any,
    cursorName: string,
    isMaped?: boolean,
  ): Promise<ResponseOracleDB<T>>;
}
