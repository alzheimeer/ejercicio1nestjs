import { Module } from '@nestjs/common';
import { APP_FILTER, APP_INTERCEPTOR } from '@nestjs/core';
import { CommonModule } from './common/common.module';
import { ExceptionManager } from './common/lib/exceptions-manager.filter';
import { ControllerModule } from './controller/controller.module';
import { RequestHttpInterceptor } from './controller/interceptor/request-http.interceptor';
import { CoreModule } from './core/core.module';
import { DataProviderModule } from './data-provider/data-provider.module';
import { UsersModule } from './users/users.module';

@Module({
  imports: [CommonModule, DataProviderModule, CoreModule, ControllerModule, UsersModule],
  controllers: [],
  providers: [
    {
      provide: APP_FILTER,
      useClass: ExceptionManager,
    },
    {
      provide: APP_INTERCEPTOR,
      useClass: RequestHttpInterceptor,
    },
  ],
})
export class AppModule {}
