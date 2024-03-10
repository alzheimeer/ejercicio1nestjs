/**
 * Clase abstracta con la definición de operaciones a realizar en la coleccion coll_traceability
 * @author Fredy Santiago Martinez
 */

import { Injectable } from '@nestjs/common';
import { IServiceTracing } from 'src/core/entity/service-tracing/service-tracing.entity';
@Injectable()
export abstract class IServiceTracingProvider {

    /**
    * Operación de inserción de la trazabilidad de los ms
    * @param {IServiceTracing} serviceTracing arreglo con información la trazabilidad de
    */
    abstract createServiceTracing(serviceTracing: IServiceTracing);

}