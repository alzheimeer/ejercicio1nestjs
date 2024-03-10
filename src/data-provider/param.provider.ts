/**
 * Clase abstracta con la definición de operaciones a realizar en la coleccion coll_params 
 * @author Fredy Santiago Martinez
 */
import { Injectable } from '@nestjs/common';
import { IParam } from 'src/core/entity/param/param.entity';

@Injectable()
export abstract class IParamProvider {

    /**
    * Operación para consultar parametros según filtro
    * @param {Number} page Número de página a consultar
    * @param {Number} limit Cantidad de registros por página
    * @param {Object} filter arreglo de campos a consultar
    */ 
    abstract getParams(page: number, limit: number, filter: any): Promise<IParam[]>;

    /**
    * Operación para consultar cantidad de registros
    * @param {*} filter arreglo de campos a consultar
    */
    abstract getTotal(filter: any): Promise<number>;

    /**
    * Operación para consultar parametros por identificador
    * @param {String} id_param identificador de parametro
    */ 
    abstract getParamByIdParam(id_param: string): Promise<IParam>;

    /**
    * Operación de actualización de un parametro
    * @param {IParam} param arreglo con información del parametro
    */
    abstract updateParam(param: IParam): Promise<IParam>;

}