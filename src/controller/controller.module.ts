import { Module } from '@nestjs/common';

import { TerminusModule } from '@nestjs/terminus';
import { HealthController } from './health.controller';

import { CoreModule } from 'src/core/core.module';
import { DataProviderModule } from 'src/data-provider/data-provider.module';

import { IGlobalValidateIService } from './service/globalValidate.service';
import { GlobalValidateIService } from './service/impl/globalValidate.service.impl';

import { MockupController } from './mockup.controller';
import { IMockupService } from './service/mockup.service';
import { MockupService } from './service/impl/mockup.service.impl';

import { HttpPruebaController } from './http-prueba.controller';
import { IHttpPruebaService } from './service/http-prueba.service';
import { HttpPruebaService } from './service/impl/http-provider.service.impl';

import { MessageController } from './message.controller';
import { IMessageService } from './service/message.service';
import { MessageService } from './service/impl/message.service.impl';

import { UserController } from './user.controller';
import { IUserService } from './service/user.service';
import { UserService } from './service/impl/user.service.impl';

@Module({
  imports: [CoreModule, TerminusModule, DataProviderModule],
  controllers: [
    MockupController,
    HttpPruebaController,
    HealthController,
    MessageController,
    UserController
  ],
  providers: [
    { provide: IMockupService, useClass: MockupService },
    { provide: IHttpPruebaService, useClass: HttpPruebaService },
    { provide: IGlobalValidateIService, useClass:GlobalValidateIService},
    
    { provide: IMessageService, useClass: MessageService },
    { provide: IUserService, useClass: UserService },
  ],
})
export class ControllerModule {}
