/**
 * Clase para el manejo de errores en el ms
 * @author Fredy Santiago Martinez
 */

import { Injectable } from '@nestjs/common';
import { IServiceError } from 'src/core/entity/service-error/service-error.entity';
import { IServiceErrorProvider } from 'src/data-provider/service-error.provider';
import { IServiceErrorUc } from '../service-error.resource.uc';
import { ITaskError } from 'src/core/entity/service-error/task-error.entity';
import Logging from 'src/common/lib/logging';
import { IServiceTracingInicial } from 'src/core/entity/service-tracing/service-tracing.entity';
import { ELevelsErros } from 'src/common/utils/enums/logging.enum';

@Injectable()
export class ServiceErrorUcimpl implements IServiceErrorUc {
    private readonly logger = new Logging(ServiceErrorUcimpl.name);    
    constructor(
        private readonly _serviceErrorProvider: IServiceErrorProvider
    ) { }
    /**
    * Funcion para la creación de errores en los ms
    * @param {Object} error arreglo información de error
    * @param {ITaskError} task Identificador de la tarea donde se genero el error
    * @param {IServiceTracingInicial} tracingInfoPrincipal arreglo información adicional donde se genero el error
    */
    async createServiceError(error: any, task: ITaskError, request: any, tracingInfoPrincipal:IServiceTracingInicial, nivel: ELevelsErros) {

        const dataError: IServiceError = {
            success: error.success || false,
            serviceid:tracingInfoPrincipal.id,
            origen: tracingInfoPrincipal.origen,
            method: tracingInfoPrincipal.method,
            tack:task,
            message: error.message,
            channel:tracingInfoPrincipal.channel,
            stack: error.stack,
            request:request,
            response:tracingInfoPrincipal.response,
        }
        this.logger.write('ERROR: ServiceError() ' + task.task_description, task.task_name, nivel,request || '',error.stack);
        this._serviceErrorProvider.createServiceError(dataError);
    }
}
