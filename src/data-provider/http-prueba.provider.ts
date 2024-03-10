/**
 * Clase abstracta generica para realizar peticiones 
 * @author Fredy Santiago Martinez
 */

import { Injectable } from "@nestjs/common";
import { ResponseHttp } from "./model/http/response-http.model";

@Injectable()
export abstract class IHttpPruebaProvider {

    /**
    * Operación para consultar por identificador
    * @param {String} _id identificador 
    */
    abstract getById(_id: string): Promise<ResponseHttp>;

    /**
    * Operación para consultar segun la configuracion
    * @param {Number} page Número de página a consultar
    * @param {Number} limit Cantidad de registros por página
    */
    abstract getAll(page: number, limit: number): Promise<ResponseHttp>;

}