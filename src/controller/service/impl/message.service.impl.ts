/**
 * Clase para realizar las respectivas operaciones de mensajes de los ms
 * @author Fredy Santiago Martinez
 */

import { Injectable } from '@nestjs/common';
import { IMessageDTO } from '../../dto/message/message.dto';
import { IMessage } from '../../../core/entity/message.entity';
import { IMessageUc } from '../../../core/use-case/message.uc';
import { IMessageService } from '../message.service';
import { ResponseService } from 'src/controller/dto/response-service.dto';
import { EmessageMapping } from 'src/common/utils/enums/message.enum';
import { MessageUcimpl } from 'src/core/use-case/impl/message.uc.impl';
import { IGlobalValidateIService } from '../globalValidate.service';
import Logging from 'src/common/lib/logging';
import { ETaskDesc, Etask } from 'src/common/utils/enums/taks.enum';
import GeneralUtil from 'src/common/utils/generalUtil';

@Injectable()
export class MessageService implements IMessageService {
  private readonly logger = new Logging(MessageService.name);
  constructor(private readonly _messageUC: IMessageUc, public readonly _GlobalValidate: IGlobalValidateIService, ) { }
 

  /**
    * Actualiza un mensaje
    * @param {IMessageDTO} message Información asociada al mensaje
    * @returns {ResponseService} Lógica del caso de uso en el response de la operación
    */
  async update(message: IMessageDTO): Promise<ResponseService<IMessage>> {
    const result = await this._messageUC.update(message);
    return new ResponseService(
      true,
      'Mensaje actualizado correctamente.',
      200,
      result,
    );
  }


  /**
    * Consulta mensaje por Id
    * @param {string} idMessage Identificador del mensaje
    * @returns {ResponseService} Lógica del caso de uso en el response de la operación
    */
  async getById(idMessage: string): Promise<ResponseService<IMessage>> {
    const result: IMessage = await this._messageUC.getById(idMessage);
    return new ResponseService(
      true,
      result != null
        ? 'Consulta ejecutada correctamente.'
        : `No se encontró mensaje configurado con el Id "${idMessage}".`,
      200,
      result,
    );
  }


  /**
    * Consulta los mensajes segun el filtro 
    * @param {Number} page Número de página a consultar
    * @param {Number} limit Cantidad de registros por página
    * @param {Object} filter Objeto de campos a consultar
    * @param {Request} req Objeto del request
    * @returns {ResponseService} Lógica del caso de uso en el response de la operación
    */
  async getMessages(page: number, limit: number, filter: any, channel: string): Promise<ResponseService<any>> {
    try {
      //Se valida canal
      const validateChannel: boolean = await this._GlobalValidate.validateChannel(channel)
      this.logger.write("Respuesta de validacion del canal " + JSON.stringify(validateChannel), Etask.CHANNEL);

      // Mapeo de los campos de filtrado
      const _filter: object = JSON.parse(filter);

      this.logger.write("Consumiendo UC del servicio getMessages()", Etask.LOAD_MESSAGE);
      const result = await this._messageUC.getMessages(page, limit, _filter);
      return new ResponseService(
        true,
        result
          ? 'Consulta ejecutada correctamente.'
          : 'No se encontraron datos.',
        200,
        result,
      );
    } catch (error) {
      GeneralUtil.assignTaskError(error, Etask.LOAD_MESSAGE, ETaskDesc.LOAD_MESSAGE);
      throw error;
    }
    
  }

  /**
    * Consulta los mensajes segun el filtro 
    * @param {string} idMessage Identificador del mensaje
    * @returns {object} Informacion asociada a la busquedad
    */
  public static mappingMessage(idMessage: EmessageMapping): string {
    return MessageUcimpl.getMessages.find(m => m.id == idMessage) ?.message;
  }

}
