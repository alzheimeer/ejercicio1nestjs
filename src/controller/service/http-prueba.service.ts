/**
 * Clase abstracta para realizar las respectivas operaciones del ms
 * @author Fredy Santiago Martinez
 */
import { Injectable } from "@nestjs/common";
import { ResponseService } from "../dto/response-service.dto";

@Injectable()
export abstract class IHttpPruebaService {

    /**
    * consulta por identificador
    * @param {String} _id identificador 
    */
    abstract getById(_id: string): Promise<ResponseService>;
 
    /**
    * consulta segun la configuracion
    * @param {Number} page Número de página a consultar
    * @param {Number} limit Cantidad de registros por página
    */
    abstract getAll(page: number, limit: number): Promise<ResponseService>;

}