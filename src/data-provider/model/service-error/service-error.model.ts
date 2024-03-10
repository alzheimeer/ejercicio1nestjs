/**
 * Se define la configuracion del modelo de la coleccion coll_service_error
 * @author Fredy Santiago Martinez
 */

import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';


@Schema()
class Documentos extends Document {
    @Prop()
    error: string;

    @Prop({default:""})
    request: string;

    @Prop({default:""})
    response: string;
}

@Schema({ versionKey: false, timestamps: true })
export class ServiceErrorModel extends Document {

    @Prop({default: false})
    success?: boolean;

    @Prop()
    origen?: string;

    @Prop()
    method: string;

    @Prop({ type: Object, default: {} })
    tack?: any;

    @Prop()
    message?: string;

    @Prop()
    stack?: string;

    @Prop()
    channel?: string;

    @Prop({ type: Object, default: {} })
    request?: any;

    @Prop({ type: Object, default: {} })
    response?: any;

    @Prop()
    serviceid?: string;

    @Prop({ type: Documentos })
    documents?: Documentos;
}

export const ServiceErrorSchema =  SchemaFactory.createForClass(ServiceErrorModel);
