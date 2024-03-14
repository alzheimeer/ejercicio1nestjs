/**
 * Clase con la definición de operaciones a realizar en la coleccion coll_messages 
 * @author Fredy Santiago Martinez
 */
import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { IMessage } from 'src/core/entity/message.entity';
import { IMessageProvider } from '../message.provider';
import { MessageModel } from '../model/message.model';
import Logging from 'src/common/lib/logging';
import GeneralUtil from 'src/common/utils/generalUtil';
import Traceability from 'src/common/lib/traceability';
import { ETaskMessageGeneral } from 'src/common/utils/enums/message.enum';
import { EStatusTracingGeneral } from 'src/common/utils/enums/tracing.enum';
import { IServiceTracingUc } from 'src/core/use-case/resource/service-tracing.resource.uc';
import { ETaskDesc, Etask } from 'src/common/utils/enums/taks.enum';
import { ELevelsErros } from 'src/common/utils/enums/logging.enum';

@Injectable()
export class MessageProvider implements IMessageProvider { 
    private readonly logger = new Logging(MessageProvider.name);
    constructor(
        @InjectModel(MessageModel.name) private readonly messageModel: Model<MessageModel>,
        private readonly _serviceTracing: IServiceTracingUc
    ) { }

    /** 
        * Operación para consultar cantidad de mensajes
        * @param {Object} filter arreglo de campos a consultar
        * @returns {Number} numero total mensajes asociados
        */
    async getTotal(filter: any): Promise<number> {
        return this.messageModel.countDocuments(filter);
    }

    /**
    * Operación para consultar mensajes según filtro
    * @param {Number} page Número de página a consultar
    * @param {Number} limit Cantidad de registros por página
    * @param {Object} filter arreglo de campos a consultar
    * @returns {Object} informacion asociada a la busquedad
    */
    async getMessages(page: number, limit: number, filter: any, projection: any = {}): Promise<IMessage[]> {
        return this.messageModel
            .find(filter, projection)
            .skip(limit * (page - 1))
            .limit(limit);
    }

    /**
    * Operación para consultar mensajes según filtro
    * @param {Number} page Número de página a consultar
    * @param {Number} limit Cantidad de registros por página
    * @param {Object} filter arreglo de campos a consultar
    * @returns {Object} informacion asociada a la busquedad
    */
    async loadMessages(page: number, limit: number, filter: any, projection: any = {}): Promise<IMessage[]> {
        try {
            const request = {
                page,
                limit,
                filter,
                projection
            }
            const startTime = process.hrtime(); 
            let traceability = new Traceability({});
            traceability.setTransactionId(GeneralUtil.getCorrelationalId);
            traceability.setTask(`REQUEST_CONSUMO_BD_${ETaskMessageGeneral.GET_ALL}`);
            traceability.setStatus(EStatusTracingGeneral.BD_SUCCESS);
            traceability.setRequest(request);
            this._serviceTracing.createServiceTracing(traceability.getTraceability());
            this.logger.write('Request ejecución BD', ETaskMessageGeneral.GET_ALL, ELevelsErros.INFO, request);
            const result = await this.getMessages(page, limit, filter, projection );

            const processingTime = this.processExecutionTime(startTime);

            let traceabilityResponse = new Traceability({});
            traceabilityResponse.setTransactionId(GeneralUtil.getCorrelationalId);
            traceabilityResponse.setTask(`RESPONSE_CONSUMO_BD_${ETaskMessageGeneral.GET_ALL}`);
            traceabilityResponse.setStatus((result.length === 0) ? EStatusTracingGeneral.BD_WARN : EStatusTracingGeneral.BD_SUCCESS);
            traceabilityResponse.setRequest(request);
            traceabilityResponse.setResponse(result);
            traceabilityResponse.setProcessingTime(processingTime);
            this._serviceTracing.createServiceTracing(traceabilityResponse.getTraceability());
            this.logger.write('Resultado ejecución BD', ETaskMessageGeneral.GET_ALL, ELevelsErros.INFO, request, result, processingTime);
            return result;
        } catch (error) {
            GeneralUtil.assignTaskError(error, Etask.LOAD_MESSAGE, ETaskDesc.LOAD_MESSAGE);
            throw error;
        }
    }

    /**
    * Operación para consultar un mensaje por su identificador
    * @param {String} id identificador de mensaje
    * @returns {Object} informacion asociada a la busquedad
    */
    async getMessage(id: string): Promise<IMessage> {
        return this.messageModel.findOne({ id });
    }


    /**
    * Operación de actualización de un mensaje
    * @param {IMessage} message arreglo con información del mensaje
    * @returns {Object} informacion asociada a la actualizacion
    */
    async updateMessage(message: IMessage): Promise<IMessage> {

        return this.messageModel.findOneAndUpdate(
            {
                id: message.id,
            },
            {
                $set: {
                    id: message.id,
                    description: message.description,
                    message: message.message
                }
            },
            {
                new: true
            }
        );
    }

    /**
    * Función para generar log informativo para el services provider de Message
    * @param {any} startTime cadena fecha inicio consulta bd
    */
    processExecutionTime(startTime: any): number {
        const endTime = process.hrtime(startTime);
        return Math.round((endTime[0] * 1000) + (endTime[1] / 1000000));
    }
}