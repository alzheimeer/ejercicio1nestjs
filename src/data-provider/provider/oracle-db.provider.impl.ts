import { Connection, ResultSet, getConnection } from 'oracledb';
import { ELevelsErros } from 'src/common/utils/enums/logging.enum';
import { Etask } from 'src/common/utils/enums/taks.enum';
import { Injectable } from '@nestjs/common';
import { IOracleDBProvider } from '../oracle-db.provider';
import { IServiceTracingProvider } from '../service-tracing.provider';
import { ResponseOracleDB } from 'src/core/entity/response-oracle/response-oracle.entity';
import databaseConfig from 'src/common/configuration/database.config';
import GeneralUtil from 'src/common/utils/generalUtil';
import Logging from 'src/common/lib/logging';

@Injectable()
export class OracleDBProvider implements IOracleDBProvider {
  private readonly logger = new Logging(OracleDBProvider.name);
  constructor(private readonly _serviceTracing: IServiceTracingProvider) {}

  /**
   * Función para ejecutar un sp en Oracle
   * @param {String} procedure definición de la consulta
   * @param {params} params parametros para la consulta
   * @param {string} cursorName nombre del cursor a ejecutar
   * @param {boolean} isMaped De ser verdadero regresa el resultado como un objeto {[header]: value}, en caso contrario un arreglo de valores, por defecto es false.
   */
  async consultSP<T = any>(procedure: string, params: any, cursorName: string, isMaped?: boolean): Promise<ResponseOracleDB<T>> {
    const request = { procedure, params };
    this.logger.write('Request ejecución', Etask.EXECUTE_SP_ORACLE, ELevelsErros.INFO, request);
    this._serviceTracing.createServiceTracing(
      GeneralUtil.traceabilityForLegacy(Etask.EXECUTE_SP_ORACLE, request),
    );
    const startTime = process.hrtime();
    let conn: Connection;
    let endtime: number[], executionTime: number;
    let response: ResponseOracleDB<T>;
    try {
      conn = await getConnection(databaseConfig.oracleConnection);
      let result = await conn.execute<any>(procedure, params);
      response = {
        code: result.outBinds?.po_codigo || 200,
        description: result.outBinds?.po_descripcion || 'Ejecución exitosa.',
        data: isMaped
          ? await this.dataFromResultSet<T>(result.outBinds[`${cursorName}`])
          : await result.outBinds[`${cursorName}`].getRows(),
      };
      return response;
    } catch (error) {
      response = error;
      return {
        code: error?.errorNum || 500,
        description: error?.message || 'Error no controlado (consultSP)',
        data: [],
      };
    } finally {
      if (conn) conn.close();
      endtime = process.hrtime(startTime);
      executionTime = Math.round(endtime[0] * 1000 + endtime[1] / 1000000);
      this.logger.write(
        'Response ejecución',
        Etask.EXECUTE_SP_ORACLE,
        ELevelsErros.INFO,
        request,
        response,
        executionTime,
      );
      this._serviceTracing.createServiceTracing(
        GeneralUtil.traceabilityForLegacy(Etask.EXECUTE_SP_ORACLE, request, response, executionTime),
      );
    }
  }

  /**
   * Transforma un resulset en un objeto {[key]: value} de acuerdo al header del cursor.
   * @param {ResultSet<any>} data  Resultado de la ejecución del sp Oracle
   * @returns Arreglo de objeto de tipo <T>
   */
  private async dataFromResultSet<T = any>(data: ResultSet<any>): Promise<T[]> {
    const keys = data.metaData.map((value) => value.name);
    let response = [];
    for (const row of await data.getRows()) {
      let obj = {};
      keys.forEach((key, index) => {
        obj[key] = row[index];
      });
      response.push(obj);
    }
    return <T[]>response;
  }
}
