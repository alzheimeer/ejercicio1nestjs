/**
 * Intercepta todas la solicitudes http que llegen al servicio para formatear la respuesta
 * @author Fredy Santiago Martinez
 */

import { CallHandler, ExecutionContext, Injectable, NestInterceptor } from '@nestjs/common';
import * as moment from 'moment';
import { map, Observable, tap } from 'rxjs';
import General from 'src/common/utils/generalUtil';
import { ResponseService } from '../dto/response-service.dto';
import { IServiceTracingUc } from 'src/core/use-case/resource/service-tracing.resource.uc';


@Injectable()
export class RequestHttpInterceptor implements NestInterceptor<ResponseService> {

  constructor(public readonly _serviceTracing: IServiceTracingUc) { }
  
  intercept(context: ExecutionContext, next: CallHandler): Observable<ResponseService> {
    const now = moment();
    const requestTime = moment().format();
    const req = context.switchToHttp().getRequest();
    const resp = context.switchToHttp().getResponse();
    const time = Date.now();
    const request = (General.isEmptyObject(req.body)) ? req.body : req.query;

    General.logRequestResponse(req, request, RequestHttpInterceptor.name);
    const traceabilityStart =  General.traceabilityInterceptor(req, request);
    this._serviceTracing.createServiceTracing(traceabilityStart.getTraceability());

    return next.handle()
      .pipe(
        map(data => 
          ({
            ...data,
            requestTime,
            responseTime: moment().diff(now),
            method: req.method,
            origen: General.getOrigin(context.getArgs()[0]['url']),
            status: data?.status || resp?.statusCode
          }) 
        ),
        tap((data) => {
          const executionTime = Date.now() - time;  
          const traceabilityEnd =  General.traceabilityInterceptor(req, request, data, executionTime);
          this._serviceTracing.createServiceTracing(traceabilityEnd.getTraceability());
          General.logRequestResponse(req, request, RequestHttpInterceptor.name, data, executionTime);
          resp.status(data.status);
        })
      )
  }

}
