import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { HttpModule } from '@nestjs/axios';
import databaseConfig from '../common/configuration/database.config';
import { IHttpPruebaProvider } from './http-prueba.provider';
import { IHttpProvider } from './http.provider';
import { IMessageProvider } from './message.provider';
import { MessageModel, MessageSchema } from './model/message.model';
import { ParamModel, ParamSchema } from './model/param/param.model';
import { ServiceErrorModel, ServiceErrorSchema } from './model/service-error/service-error.model';
import { ServiceTracingModel, ServiceTracingSchema } from './model/service-tracing/service-tracing.model';
import { IParamProvider } from './param.provider';
import { HttpPruebaProvider } from './provider/http-prueba.provider.impl';
import { HttpProvider } from './provider/http.provider.impl';
import { MessageProvider } from './provider/message.provider.impl';
import { ParamProvider } from './provider/param.provider.impl';
import { ServiceErrorProvider } from './provider/service-error.provider.impl';
import { ServiceTracingProvider } from './provider/service-tracing.provider.impl';
import { IServiceErrorProvider } from './service-error.provider';
import { IServiceTracingProvider } from './service-tracing.provider';
import { IServiceTracingUc } from 'src/core/use-case/resource/service-tracing.resource.uc';
import { ServiceTracingUcimpl } from 'src/core/use-case/resource/impl/service-tracing.resource.uc.impl';
import { IOracleDBProvider } from './oracle-db.provider';
import { OracleDBProvider } from './provider/oracle-db.provider.impl';
import { IUserProvider } from './user.provider';
import { UserProvider } from './provider/user.provider.impl';
import { UserModel, UserSchema } from './model/user.model';
import { AddressModel, AddressSchema } from './model/address.model';

@Module({
  imports: [
    //Conexión a base de datos
    MongooseModule.forRoot(databaseConfig.database, {
      retryAttempts: 3,
      autoCreate: false,
      autoIndex: false
    }),
    MongooseModule.forFeature([
      { name: UserModel.name, schema: UserSchema, collection: 'coll_user'},
      { name: AddressModel.name, schema: AddressSchema, collection: 'coll_address'},

      { name: MessageModel.name, schema: MessageSchema, collection: 'coll_message'},

      { name: ParamModel.name, schema: ParamSchema, collection: 'coll_params' },
      { name: ServiceErrorModel.name, schema: ServiceErrorSchema, collection: 'coll_service_error' },
      { name: ServiceTracingModel.name, schema: ServiceTracingSchema, collection: 'coll_traceability' },
    ]),
    HttpModule
  ],
  providers: [
    { provide: IMessageProvider, useClass: MessageProvider },
    { provide: IUserProvider, useClass: UserProvider },

    { provide: IHttpProvider, useClass: HttpProvider },
    { provide: IHttpPruebaProvider, useClass: HttpPruebaProvider },
    { provide: IParamProvider, useClass: ParamProvider },
    { provide: IServiceErrorProvider, useClass: ServiceErrorProvider },
    { provide: IServiceTracingProvider, useClass: ServiceTracingProvider },
    { provide: IServiceTracingUc, useClass: ServiceTracingUcimpl},
    { provide: IOracleDBProvider, useClass: OracleDBProvider },
    HttpModule
  ],
  exports: [
    IMessageProvider,
    IUserProvider, 
    IHttpPruebaProvider, 
    IParamProvider, 
    IServiceErrorProvider, 
    IServiceTracingProvider, 
    IServiceTracingUc, 
    HttpModule, 
    IOracleDBProvider],
})
export class DataProviderModule {}
