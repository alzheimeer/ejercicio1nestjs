/**
 * Clase abstracta con la definición de operaciones a realizar en la coleccion coll_messages 
 * @author Fredy Santiago Martinez
 */

import { Injectable } from '@nestjs/common';
import { IMessage } from 'src/core/entity/message.entity';

@Injectable()
export abstract class IMessageProvider {

    /**
    * Operación para consultar mensajes según filtro
    * @param {Number} page Número de página a consultar
    * @param {Number} limit Cantidad de registros por página
    * @param {Object} filter arreglo de campos a consultar
    */
    abstract getMessages(page: number, limit: number, filter: any): Promise<IMessage[]>;

    /**
    * Operación para consultar mensajes según filtro
    * @param {Number} page Número de página a consultar
    * @param {Number} limit Cantidad de registros por página
    * @param {Object} filter arreglo de campos a consultar
    */
    abstract loadMessages(page: number, limit: number, filter: any): Promise<IMessage[]>;

    /** 
    * Operación para consultar cantidad de registros
    * @param {Object} filter arreglo de campos a consultar
    */
    abstract getTotal(filter: any): Promise<number> 

    /**
    * Operación para consultar un mensaje por su identificador
    * @param {String} id identificador de mensaje
    */
    abstract getMessage(id: string): Promise<IMessage>;

    /**
    * Operación de actualización de un mensaje
    * @param {IMessage} message arreglo con información del mensaje
    */
    abstract updateMessage(message: IMessage): Promise<IMessage>;

}