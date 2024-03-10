/**
 * Clase abstracta con la funcionalidad de los mensajes del microservicio
 * @author Fredy Santiago Martinez
 */
import { Injectable } from '@nestjs/common';
import { ResponsePaginator } from 'src/controller/dto/response-paginator.dto';
import { IMessage } from '../entity/message.entity';
@Injectable()
export abstract class IMessageUc {
    /**
    * Función para cargar los mensajes en las variables estaticas
    */
    abstract loadMessages(): Promise<any>;

    /**
    * Actualiza el mensaje
    * @param {IMessage} message Objeto con información del mensaje
    */
    abstract update(message: IMessage): Promise<IMessage>;

    /** 
    * Consulta mensaje por Identificador
    * @param {string} idMessage Identificador del mensaje
    */
    abstract getById(idMessage: string): Promise<IMessage>;

    /**
    * Consulta mensajes configurados
    * @param {Number} page Número de página a consultar
    * @param {Number} limit Cantidad de registros por página
    * @param {Object} filter Objeto de campos a consultar
    */
    abstract getMessages(page: number, limit: number, filter: any): Promise<ResponsePaginator<IMessage>>;

}