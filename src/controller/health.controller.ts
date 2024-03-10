/**
 * Clase donde se definen los metodos a exponer por parte del servicio para validar que servicios internos esten activos
 * @author Fredy Santiago Martinez
 */

import { Controller, Get } from '@nestjs/common';
import { ApiOperation, ApiTags } from '@nestjs/swagger';
import { HealthCheck, HealthCheckService, HttpHealthIndicator, MongooseHealthIndicator } from '@nestjs/terminus';
import servicesConfig from 'src/common/configuration/services.config';
import { ResponseService } from './dto/response-service.dto';
import { EmessageMapping } from 'src/common/utils/enums/message.enum';

@ApiTags('healthCheck')
@Controller('health')
export class HealthController {
  constructor(
    private health: HealthCheckService,
    private dbMongo: MongooseHealthIndicator,
    private http: HttpHealthIndicator,
  ) { }

  @Get('')
  @ApiOperation({
    description: 'Health check de base de datos y servicios http'
  })
  async validate() {
    const status = {
      database: await this.checkDB(),
      httpService: await this.checkServiceHttp({ name: 'test-service', endPoint: servicesConfig.testService }),
    };
    return new ResponseService(true, EmessageMapping.DEFAULT, 200, status);
  }


  @HealthCheck()
  private async checkDB() {
    try {
      const status = await this.health.check([() => this.dbMongo.pingCheck('database_mongo')]);
      return status.details;
    }
    catch (error) {
      return error.response;
    }
  }

  @HealthCheck()
  private async checkServiceHttp(service: { name: string, endPoint: string }) {
    let result: { name?: string, endPoint?: string, status?: any } = { ...service };

    try {
      result.status = await this.http.pingCheck(service.name, service.endPoint);
    }
    catch (error) {
      result.status = error.causes[service.name];
    }

    return result;
  }
}
