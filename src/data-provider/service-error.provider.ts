/**
 * Clase abstracta con la definición de operaciones a realizar en la coleccion coll_service_error
 * @author Fredy Santiago Martinez
 */

import { Injectable } from '@nestjs/common';
import { IServiceError } from 'src/core/entity/service-error/service-error.entity';

@Injectable()
export abstract class IServiceErrorProvider {

    /**
    * Operación de inserción de un error
    * @param {IServiceError} ServiceErrors arreglo con información del error
    */
    abstract createServiceError(ServiceErrors: IServiceError);

}