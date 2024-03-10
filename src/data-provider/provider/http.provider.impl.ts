/**
 * Clase generica para realizar consumos a legados de tipo SOAP y Rest
 * @author Fredy Santiago Martinez
 */

import { HttpStatus, Injectable } from '@nestjs/common';
import { HttpService } from '@nestjs/axios';
import { Etask } from './../../common/utils/enums/taks.enum';
import { IHttpProvider } from './../http.provider';
import { IRequestConfigHttp, IRequestConfigHttpSOAP } from '../model/http/request-config-http.model';
import servicesConfig from './../../common/configuration/services.config';
import { ResponseHttp } from './../model/http/response-http.model';
import Logging from './../../common/lib/logging';
import GeneralUtil from '../../common/utils/generalUtil';
import { ELevelsErros } from 'src/common/utils/enums/logging.enum';
import Traceability from 'src/common/lib/traceability';
import { EStatusTracingGeneral } from 'src/common/utils/enums/tracing.enum';
import { IServiceTracingProvider } from '../service-tracing.provider';
import { EmessageMapping } from 'src/common/utils/enums/message.enum';
import { BusinessException } from 'src/common/lib/business-exceptions';
import { lastValueFrom } from 'rxjs';

@Injectable()
export class HttpProvider implements IHttpProvider {

   private readonly logger = new Logging(HttpProvider.name);

   constructor(public readonly _serviceTracing: IServiceTracingProvider,
      private readonly _httpService: HttpService) { }

   /**
 * Operación para realizar un consumo a legados de tipo Rest
 * @param {IRequestConfigHttp} _requestConfig arreglo con información del legado a consumir
 * @param {Etask} _task nombre identificador de la tarea donde se realiza el consumo
 * @returns {ResponseHttp} arreglo con información de respuesta del legado consumido
 */
   async executeRest<R = any>(_requestConfig: IRequestConfigHttp, _task?: Etask): Promise<ResponseHttp<R>> {

      let result: ResponseHttp;

      try {

         this._httpService.axiosRef.interceptors.request.use((config) => {
            config.headers.requestStartedAt = new Date().getTime();
            return config;
         });

         this._httpService.axiosRef.interceptors.response.use(x => {
            x.config.headers.processingTime = (new Date().getTime() - Number(x.config.headers.requestStartedAt));
            return x
         },
            // Handle 4xx & 5xx responses
            x => {
               x.config.headers.processingTime = (new Date().getTime() - Number(x.config.headers.requestStartedAt));
               throw x;
            }
         )

         let traceability = new Traceability({});
         traceability.setTransactionId(GeneralUtil.getCorrelationalId);
         traceability.setRequest(_requestConfig);
         traceability.setTask('REQUEST_CONSUMO_LEGADO_' + _task);
         traceability.setStatus(EStatusTracingGeneral.LEGACY_SUCCESS);
         this._serviceTracing.createServiceTracing(traceability.getTraceability());

         this.logger.write('Request ejecución HTTP REST', _requestConfig.url, ELevelsErros.INFO, _requestConfig);

         const respose = await lastValueFrom(
            this._httpService.request<R>({
               ..._requestConfig,
               headers: _requestConfig.headers ?? { "content-type": "application/json" },
               responseType: 'json',
               timeout: servicesConfig.httpConfig.timeout
            })
         )

         result = new ResponseHttp(respose);

      }
      catch (error) {
         result = new ResponseHttp(error);
      }

      let response = {
         data: result?.data || result.message,
         status: result.status
      }

      let traceabilityRes = new Traceability({});
      traceabilityRes.setTransactionId(GeneralUtil.getCorrelationalId);
      traceabilityRes.setRequest(_requestConfig);
      traceabilityRes.setResponse(response);
      traceabilityRes.setTask('RESPONSE_CONSUMO_LEGADO_' + _task);
      traceabilityRes.setProcessingTime(result.requestInfo.headers.processingTime);
      traceabilityRes.setStatus(Traceability.getStatusTraceability(result));
      this._serviceTracing.createServiceTracing(traceabilityRes.getTraceability());

      this.logger.write('Resultado ejecución HTTP REST', _requestConfig.url, GeneralUtil.getLevelError(result), _requestConfig, response, result.requestInfo.headers.processingTime);

      if (!result.executed) {

         let document = {
            document: {
               source: result.requestInfo.url,
               info: result.message
            },
            codMessage: EmessageMapping.ERROR_TIMEOUT_LEGACY
         }
         throw new BusinessException(
            HttpStatus.CREATED,
            EmessageMapping.ERROR_TIMEOUT_LEGACY,
            true,
            document
         );
      }

      return result;
   }

   /**
     * Operación para realizar un consumo a legados de tipo SOAP
     * @param {IRequestConfigHttpSOAP} _requestConfig arreglo con información del legado a consumir
     * @param {Etask} _task nombre identificador de la tarea donde se realiza el consumo
     * @returns {ResponseHttp} arreglo con información de respuesta del legado consumido
     */
   async executeSOAP<R = any>(_requestConfig: IRequestConfigHttpSOAP, _task?: Etask): Promise<ResponseHttp<R>> {

      let result: ResponseHttp;

      try {

         this._httpService.axiosRef.interceptors.request.use((xSoap) => {
            xSoap.headers.requestStartedAt = new Date().getTime();
            return xSoap;
         });

         this._httpService.axiosRef.interceptors.response.use(xSoap => {
            xSoap.config.headers.processingTime = (new Date().getTime() - Number(xSoap.config.headers.requestStartedAt));
            return xSoap
         },
            // Handle 4xx & 5xx responses
            xSoap => {
               xSoap.config.headers.processingTime = (new Date().getTime() - Number(xSoap.config.headers.requestStartedAt));
               throw xSoap;
            }
         )

         const respose = await lastValueFrom(
            this._httpService.request<R>({
               url: _requestConfig.url,
               data: _requestConfig.data,
               method: 'POST',
               responseType: 'text',
               headers: {
                  "Content-Type": "text/xml;charset=UTF-8",
                  "soapAction": _requestConfig.soapAction
               },
               timeout: servicesConfig.httpConfig.timeout
            })
         )

         result = new ResponseHttp(respose);
      }
      catch (error) {
         result = new ResponseHttp(error);
      }

      //Se transforma respuesta xml del servicio a json
      result.data = await GeneralUtil.convertXmlToJson(result.data);

      let responseSOAP = {
         data: result?.data || result.message,
         status: result.status
      }

      const level: ELevelsErros = (result.status === 200 || result.status === 201) ? ELevelsErros.INFO : ELevelsErros.WARNING

      this.logger.write('Resultado ejecución HTTP SOAP', _requestConfig.url, level, _requestConfig, responseSOAP, result.requestInfo.headers.processingTime);

      return result;
   }

}