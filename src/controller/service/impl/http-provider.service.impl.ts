/**
 * Clase para realizar las respectivas operaciones de los ms
 * @author Oscar Avila
 */
import { Injectable } from '@nestjs/common';
import { EmessageMapping } from 'src/common/utils/enums/message.enum';
import { ResponseService } from 'src/controller/dto/response-service.dto';
import { IHttpPruebaUc } from 'src/core/use-case/http-prueba.uc';
import Logging from 'src/common/lib/logging';
import { ETaskDesc, Etask } from 'src/common/utils/enums/taks.enum';
import { ELevelsErros } from 'src/common/utils/enums/logging.enum';
import GeneralUtil from 'src/common/utils/generalUtil';

@Injectable()
export class HttpPruebaService  {

  private readonly logger = new Logging(HttpPruebaService.name);
  
  constructor(private readonly _httpPruebaUc: IHttpPruebaUc) {}

  /**
    * consulta por identificador
    * @param {String} _id identificador 
    * @returns {ResponseService} Lógica del caso de uso en el response de la operación
    */
  async getById(_id: string): Promise<ResponseService<any>> {
    try {
      this.logger.write('Entrando a consumir el provider', Etask.FINDONE, ELevelsErros.INFO);
      const result = await this._httpPruebaUc.getById(_id);
      return new ResponseService(
        true,
        EmessageMapping.DEFAULT,
        200,
        result,
      );
    } catch (error) {
      GeneralUtil.assignTaskError(error, Etask.SERVICE_HTTP_PRUEBA, ETaskDesc.CONSUMED_SERVICE);
      throw error;
    }
    
  }

  /**
    * consulta segun la configuracion
    * @param {Number} page Número de página a consultar
    * @param {Number} limit Cantidad de registros por página
    * @returns {ResponseService} Lógica del caso de uso en el response de la operación
    */
  async getAll(page: number, limit: number): Promise<ResponseService<any>> {
    try {
      const request = {
        page: page,
        limit: limit
      }
      const result = new ResponseService();
      this.logger.write('Entrando a consumir el legado [Messages]', Etask.FINDALL_HTTP_PRUEBA, ELevelsErros.INFO);
      const response = await this._httpPruebaUc.getAll(page, limit);
      this.logger.write(
        'Obteniendo respuesta de la petición', 
        Etask.FINDALL_HTTP_PRUEBA, 
        ELevelsErros.INFO, 
        request,
        response
      );
      return new ResponseService(
        true,
        result
          ? 'Consulta ejecutada correctamente.'
          : 'No se encontraron datos.',
        200,
        response,
      );
    } catch (error) {
      GeneralUtil.assignTaskError(error, Etask.SERVICE_HTTP_PRUEBA, ETaskDesc.CONSUMED_SERVICE)
      throw error;
    }
  }

}
