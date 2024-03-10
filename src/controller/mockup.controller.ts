import { Controller, Get, Post, Body, Patch, Param, Delete, Query, Headers } from '@nestjs/common';
import { IMockupService } from './service/mockup.service';
import { CreateMockupDto } from './dto/mockup/create-mockup.dto';
import { UpdateMockupDto } from './dto/mockup/update-mockup.dto';
import { ApiOperation, ApiResponse, ApiTags } from '@nestjs/swagger';
import generalConfig from 'src/common/configuration/general.config';
import { ResponseService } from './dto/response-service.dto';
import Logging from 'src/common/lib/logging';
import { Etask } from 'src/common/utils/enums/taks.enum';
import { ELevelsErros } from 'src/common/utils/enums/logging.enum';

/**
 * En el controlador se definen los metodos a exponer por parte del servicio
 * En caso de que el servicio requiera paths diferentes, se debe crear un controller por cada path 
 */
@ApiTags('mockup')
@Controller(`${generalConfig.apiVersion}${generalConfig.controllerMockup}`)
export class MockupController {

  private readonly logger = new Logging(MockupController.name);

  //En el constructor se injecta la definición del service que procesará la petición. No se debe hacer un llamado directo a la implementación
  constructor(private readonly mockupService: IMockupService) { }


  @Post()
  @ApiOperation({
    description: "Crea un nuevo registro de mockup"
  })
  @ApiResponse({ type: ResponseService })
  create(@Body() createMockupDto: CreateMockupDto) {
    this.logger.write(`create()`, Etask.CREATE, ELevelsErros.INFO);
    return this.mockupService.create(createMockupDto);
  }

   
  @Get()
  @ApiOperation({
    description: "Crea un nuevo registro de mockup"
  })
  @ApiResponse({ type: ResponseService })
  findAll(@Headers('channel') channel: string, @Query('page') _page: number, @Query('limit') _limit: number) {
    this.logger.write(`findAll()`, Etask.FINDALL, ELevelsErros.INFO);
    return this.mockupService.findAll(channel, _page, _limit);
  }

   
  @Get(':id')
  @ApiOperation({
    description: "Consulta registro de mockup"
  })
  @ApiResponse({ type: ResponseService })
  findOne(@Param('id') id: number) {
    this.logger.write(`findOne()`, Etask.FINDONE, ELevelsErros.INFO);
    return this.mockupService.findOne(+id);
  }

   
  @Patch(':id')
  @ApiOperation({
    description: "Actualiza registro de mockup"
  })
  @ApiResponse({ type: ResponseService })
  update(@Param('id') id: number, @Body() updateMockupDto: UpdateMockupDto) {
    return this.mockupService.update(id, updateMockupDto);
  }

   
  @Delete(':id')
  @ApiOperation({
    description: "Elimina registro de mockup"
  })
  @ApiResponse({ type: ResponseService })
  remove(@Param('id') id: number) {
    return this.mockupService.remove(+id);
  }

  //Para mayor detalle, ver documentación oficial https://docs.nestjs.com/controllers
}
