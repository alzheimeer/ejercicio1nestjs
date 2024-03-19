/**
 * Clase donde se definen los métodos a exponer por parte del servicio de métodos de peticiones
 * @author Fredy Santiago Martinez
 */
import { Controller, Get, Param, Query } from "@nestjs/common";
import { ApiOperation, ApiResponse, ApiTags } from "@nestjs/swagger";
import generalConfig from "src/common/configuration/general.config";
import { ResponseService } from "./dto/response-service.dto";
import { IHttpPruebaService } from "./service/http-prueba.service";
import Logging from "src/common/lib/logging";
import { Etask } from "src/common/utils/enums/taks.enum";
import { ELevelsErros } from "src/common/utils/enums/logging.enum";

@ApiTags('httpProvider') 
@Controller(`${generalConfig.apiVersion}${generalConfig.controllerHttpProvider}`)
export class HttpPruebaController {
  constructor(private readonly _httpPruebaService: IHttpPruebaService) {}

  private readonly logger = new Logging(HttpPruebaController.name);

  @Get('/:id')
  @ApiOperation({ 
    description: 'Petición de httpProvider por id' 
  })
  @ApiResponse({ type: ResponseService })
  getById(@Param('id') _id: string) {
    this.logger.write(`getById()`, Etask.FINDONE_HTTP_PRUEBA, ELevelsErros.INFO);
    return this._httpPruebaService.getById(_id);
  }

  
  @Get('/')
  @ApiOperation({ 
    description: 'Petición de httpProvider con paginado' 
  })
  @ApiResponse({ type: ResponseService })
  getAll(
    @Query('page') _page: number = 1,
    @Query('limit') _limit: number = 15
  ) {
    this.logger.write(`getAll()`, Etask.FINDALL_HTTP_PRUEBA, ELevelsErros.INFO);
    return this._httpPruebaService.getAll(_page, _limit);
  }

}