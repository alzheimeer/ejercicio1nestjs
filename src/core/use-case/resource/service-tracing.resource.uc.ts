/**
 * Clase donde se definen métodos para crear la trazabilidad
 * @author Fredy Santiago Martinez
 */

import { Injectable } from '@nestjs/common';
import { IServiceTracing } from 'src/core/entity/service-tracing/service-tracing.entity';
@Injectable()
export abstract class IServiceTracingUc {

    /**
    * Lógica creación de la trazabilidad de los ms
    * @param {IServiceTracing} serviceTracing arreglo información de la trazabilidad de los ms
    */
    abstract createServiceTracing(serviceTracing: IServiceTracing);

}