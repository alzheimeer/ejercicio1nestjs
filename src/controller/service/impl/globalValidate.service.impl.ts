/**
 * Clase para realizar la validación de los canales permitidos en el ms
 * @author Fredy Santiago Martinez
 */

import { HttpStatus, Injectable } from '@nestjs/common';
import { IGlobalValidateIService } from '../globalValidate.service';
import GeneralUtil from 'src/common/utils/generalUtil';
import { IServiceErrorUc } from 'src/core/use-case/resource/service-error.resource.uc';
import { EmessageMapping } from 'src/common/utils/enums/message.enum';
import { BusinessException } from 'src/common/lib/business-exceptions';
import Logging from 'src/common/lib/logging';
import { Etask, ETaskDesc } from 'src/common/utils/enums/taks.enum';
import Traceability from 'src/common/lib/traceability';
import { EStatusTracingGeneral } from 'src/common/utils/enums/tracing.enum';
import { IServiceTracingUc } from 'src/core/use-case/resource/service-tracing.resource.uc';




@Injectable()
export class GlobalValidateIService implements IGlobalValidateIService {


    constructor(
        public readonly _serviceError: IServiceErrorUc,
        public readonly _serviceTracing: IServiceTracingUc
    ) { }

    private readonly logger = new Logging(GlobalValidateIService.name);

    /**
     * Consulta si un canal recibido es correcto
     * @param {String} channel Canal recibido por el usuario en header
     * @returns {Boolean} true si el canal es correcto o lanza una excepción
     */
    async validateChannel(channel: string) {
        try {
            //Genera el log
            this.logger.write(ETaskDesc.CHANNEL, Etask.CHANNEL);

            const channelValidate: boolean = GeneralUtil.validateChannel(channel);
            if (!channelValidate) {

                let traceability = new Traceability({});
                traceability.setStatus(EStatusTracingGeneral.STATUS_SUCCESS);
                traceability.setDescription(ETaskDesc.CHANNEL);
                traceability.setTask(ETaskDesc.CHANNEL);
                this._serviceTracing.createServiceTracing(traceability.getTraceability());

                throw new BusinessException(
                    HttpStatus.CREATED,
                    EmessageMapping.CHANNEL_ERROR,
                    true
                );
            }
            return true;
        } catch (error) {
            GeneralUtil.assignTaskError(error, Etask.CHANNEL, ETaskDesc.CHANNEL)
            throw error;
        }
    }

}
