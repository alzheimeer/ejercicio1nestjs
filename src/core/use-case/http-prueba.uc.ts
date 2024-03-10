/**
 * Clase abstracta con la funcionalidad de las peticiones 
 * @author Fredy Santiago Martinez
 */
import { Injectable } from '@nestjs/common';

@Injectable()
export abstract class IHttpPruebaUc {

    /**
    * Consulta por el Identificador
    * @param {string} _id Identificador
    */
    abstract getById(_id: string): Promise<any>;

    /**
    * Consulta segun la configuracion
    * @param {Number} page Número de página a consultar
    * @param {Number} limit Cantidad de registros por página
    */
    abstract getAll(page: number, limit: number): Promise<any>;
    
}