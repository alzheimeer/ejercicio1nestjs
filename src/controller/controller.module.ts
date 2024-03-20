import { Module } from '@nestjs/common';

import { TerminusModule } from '@nestjs/terminus';
import { HealthController } from './health.controller';

import { CoreModule } from 'src/core/core.module';
import { DataProviderModule } from 'src/data-provider/data-provider.module';

import { IGlobalValidateIService } from './service/globalValidate.service';
import { GlobalValidateIService } from './service/impl/globalValidate.service.impl';

import { UserController } from './user.controller';
import { IUserService } from './service/user.service';
import { UserService } from './service/impl/user.service.impl';

@Module({
  imports: [CoreModule, TerminusModule, DataProviderModule],
  controllers: [
    HealthController,
    UserController
  ],
  providers: [
    { provide: IGlobalValidateIService, useClass:GlobalValidateIService},
    { provide: IUserService, useClass: UserService },
  ],
})
export class ControllerModule {}
