/**
 * Clase generica para realizar consumos Rest
 * @author Oscar Alvarez
 */
import { Injectable } from "@nestjs/common";
import servicesConfig from "src/common/configuration/services.config";
import { ETaskDesc, Etask } from "src/common/utils/enums/taks.enum";
import { IHttpPruebaProvider } from "../http-prueba.provider";
import { IHttpProvider } from "../http.provider";
import { EHttpMethod } from "../model/http/request-config-http.model";
import { ResponseHttp } from "../model/http/response-http.model";
import Logging from "src/common/lib/logging";
import { ELevelsErros } from "src/common/utils/enums/logging.enum";
import GeneralUtil from "src/common/utils/generalUtil";

@Injectable()
export class HttpPruebaProvider implements IHttpPruebaProvider {

    private readonly logger = new Logging(HttpPruebaProvider.name);

    constructor(
        private httpProvider: IHttpProvider
    ) { }


    /**
    * Operación para consultar por identificador
    * @param {String} _id identificador 
    * @returns informacion asociada
    */
    async getById(_id: string): Promise<ResponseHttp<any>> {
        try {
            const url = `${servicesConfig.testService}/${_id}`;
            const headers = {
                "Connection": "Keep-Alive",
                "Content-Type": "application/json; charset=utf-8",
                "Date": Date.now().toString,
                "Cache-Control": "no-cache"
            };
            const params = {
                "id": _id
            };
            this.logger.write('Consumiento la petición', Etask.FINDONE, ELevelsErros.INFO, params);
    
            return this.httpProvider.executeRest({ method: EHttpMethod.get, url, params, headers}, Etask.FINDONE);
            
        } catch (error) {
            GeneralUtil.assignTaskError(error, Etask.DATA_PROVIDER_HTTP_PRUEBA, ETaskDesc.DATA_PROVIDER_HTTP_PRUEBA);
            throw error;
        }
    }

    /**
    * Operación para consultar segun la configuracion
    * @param {Number} page Número de página a consultar
    * @param {Number} limit Cantidad de registros por página
    * @returns informacion asociada a la busquedad
    */
    async getAll(page: number, limit: number): Promise<ResponseHttp> {
        const url = servicesConfig.testService;
        const headers = {
            "Connection": "Keep-Alive",
            "Content-Type": "application/json; charset=utf-8",
            "Date": Date.now().toString,
            'channel': `EC9_B2C`,
        };
        const params = {
            page,
            limit
        };
        return this.httpProvider.executeRest({ method: EHttpMethod.get, url, params, headers}, Etask.FINDALL_HTTP_PRUEBA);
    }

}