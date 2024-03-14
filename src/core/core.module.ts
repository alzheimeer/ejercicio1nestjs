import { CacheModule, Module } from '@nestjs/common';
import { DataProviderModule } from 'src/data-provider/data-provider.module';
import { IHttpPruebaUc } from './use-case/http-prueba.uc';
import { HttpPruebaUcimpl } from './use-case/impl/http-prueba.uc.impl';
import { MessageUcimpl } from './use-case/impl/message.uc.impl';
import { IMessageUc } from './use-case/message.uc';
import { ParamUcimpl } from './use-case/resource/impl/param.resource.uc.impl';
import { ServiceErrorUcimpl } from './use-case/resource/impl/service-error.resource.uc.impl';
import { ServiceTracingUcimpl } from './use-case/resource/impl/service-tracing.resource.uc.impl';
import { IParamUc } from './use-case/resource/param.resource.uc';
import { IServiceErrorUc } from './use-case/resource/service-error.resource.uc';
import { IServiceTracingUc } from './use-case/resource/service-tracing.resource.uc';
import { IUserUc } from './use-case/user.uc';
import { UserUcImpl } from './use-case/impl/user.uc.impl';

@Module({
  imports: [CacheModule.register(),DataProviderModule],
  providers: [
    { provide: IMessageUc, useClass: MessageUcimpl },
    { provide: IUserUc, useClass: UserUcImpl },

    { provide: IHttpPruebaUc, useClass: HttpPruebaUcimpl },
    { provide: IParamUc, useClass: ParamUcimpl },
    { provide: IServiceErrorUc, useClass: ServiceErrorUcimpl },
    { provide: IServiceTracingUc, useClass:ServiceTracingUcimpl},
  ],
  
  exports: [IMessageUc, IUserUc, IHttpPruebaUc, IParamUc, IServiceErrorUc, IServiceTracingUc],
})
export class CoreModule {}
