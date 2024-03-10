/**
 * Clase abstracta para la configuración de parametros generales
 * @author Fredy Santiago Martinez
 */

import { Injectable } from '@nestjs/common';
import { IParam } from 'src/core/entity/param/param.entity';

@Injectable()
export abstract class IParamUc {

    /**
    * Función para cargar los parametros en las variables estaticas
    */
    abstract loadParams(): Promise<IParam[]>;

}