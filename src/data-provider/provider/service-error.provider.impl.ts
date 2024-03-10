/**
 * Clase con la definición de operaciones a realizar en la coleccion coll_service_error
 * @author Fredy Santiago Martinez
 */

import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { IServiceError } from 'src/core/entity/service-error/service-error.entity';
import { ServiceErrorModel } from '../model/service-error/service-error.model';
import { IServiceErrorProvider } from '../service-error.provider';
import { Etask } from 'src/common/utils/enums/taks.enum';
import { ELevelsErros } from 'src/common/utils/enums/logging.enum';
import Logging from 'src/common/lib/logging';

@Injectable()
export class ServiceErrorProvider implements IServiceErrorProvider {
    private readonly logger = new Logging(ServiceErrorProvider.name);
    constructor(
        @InjectModel(ServiceErrorModel.name) private readonly serviceErrorModel: Model<ServiceErrorModel>,
    ) { }

    /**
    * Operación de inserción de un error
    * @param {IServiceError} serviceError arreglo con información del error
    */
    async createServiceError(serviceError: IServiceError) {
        const startTime = process.hrtime();
        const result = await this.serviceErrorModel.insertMany(serviceError);
        this.logServiceError(startTime, result, serviceError)
    }

    /**
    * Función para generar log informativo de proceso de inserción en bd de coll_service_error
    * @param {any} startTime cadena fecha inicio consulta bd
    * @param {any} response Arreglo con información de respuesta consulta bd 
    * @param {any} request Arreglo con información de inserción consulta bd 
    * @param {Etask} etask Identificación tarea a insertar en consulta bd
    */
    logServiceError(startTime: any, response: any, request: any, etask: Etask = Etask.SERVICE_ERROR): void {
        const endTime = process.hrtime(startTime);
        const executionTime = Math.round((endTime[0] * 1000) + (endTime[1] / 1000000));
        this.logger.write(`Insert service_error`, etask, ELevelsErros.INFO, request, response, executionTime)
    }

}