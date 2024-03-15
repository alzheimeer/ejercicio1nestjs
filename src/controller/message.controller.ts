/**
 * Clase donde se definen los metodos a exponer por parte del servicio de metodos de mensajes
 * @author Fredy Santiago Martinez
 */
import { BadRequestException, Body, Controller, Get, Param, Put, Query, Headers } from '@nestjs/common';
import { ApiOperation, ApiResponse, ApiTags } from '@nestjs/swagger';
import generalConfig from 'src/common/configuration/general.config';
import Traceability from 'src/common/lib/traceability';
import { MethodMessage } from 'src/common/utils/enums/mapping-api-rest';
import { ETaskMessageGeneral } from 'src/common/utils/enums/message.enum';
import { EStatusTracingGeneral } from 'src/common/utils/enums/tracing.enum';
import GeneralUtil from 'src/common/utils/generalUtil';
import { IServiceTracingUc } from 'src/core/use-case/resource/service-tracing.resource.uc';
import { IMessageDTO } from './dto/message/message.dto';
import { ResponseService } from './dto/response-service.dto';
import { IMessageService } from './service/message.service';
import { ETaskDesc, Etask } from 'src/common/utils/enums/taks.enum';


@ApiTags(generalConfig.controllerMessage)
@Controller(`${generalConfig.apiVersion}${generalConfig.controllerMessage}`)

export class MessageController {
  constructor(
    private readonly _messageService: IMessageService,
    private readonly _serviceTracing: IServiceTracingUc
  ) { }


  @Get(MethodMessage.GETBYID)
  @ApiOperation({
    description: 'Obtener mensaje por id'
  })
  @ApiResponse({ type: ResponseService })
  message(@Param('Id') _id: string) {
    if (!GeneralUtil.validateValueRequired(_id))
      throw new BadRequestException(
        'Debe indicar el identificador del mensaje.',
      );
    // save traceability of request 
    let traceability = new Traceability({origen: `${generalConfig.apiVersion}${generalConfig.controllerMessage}`});
    traceability.setStatus(EStatusTracingGeneral.STATUS_SUCCESS);
    traceability.setDescription(ETaskMessageGeneral.GET_BY_ID);
    traceability.setTask(ETaskMessageGeneral.GET_BY_ID);
    this._serviceTracing.createServiceTracing(traceability.getTraceability());

    return this._messageService.getById(_id);
  }


  @Get(MethodMessage.GETALL)
  @ApiOperation({ description: 'Obtener mensajes usando filtro y paginado' })
  @ApiResponse({ type: ResponseService })
  async getAll(
    @Headers('channel') channel: string,
    @Query('page') _page: number = 1,
    @Query('limit') _limit: number = 15,
    @Query('filter') _filter: any = '{}'
  ) {
    try {
      return await this._messageService.getMessages(+_page, +_limit, _filter, channel);
    } catch (error) {
      GeneralUtil.assignTaskError(error, Etask.LOAD_MESSAGE, ETaskDesc.LOAD_MESSAGE);
      throw error;
    }
  }


  @Put(MethodMessage.UPDATE)
  @ApiOperation({
    description: 'Actualizar un mensaje'
  })
  @ApiResponse({ type: ResponseService })
  update(@Param('Id') id: string, @Body() messge: IMessageDTO) {
    if (id != messge.id)
      throw new BadRequestException('El identificador no coincide.');

    return this._messageService.update(messge);
  }
}
