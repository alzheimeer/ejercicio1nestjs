/**
 * Se define la configuracion del modelo de la coleccion coll_traceability
 * @author Santiago Martinez
 */

import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document, Mixed } from 'mongoose';

@Schema({ versionKey: false, timestamps: true })
export class ServiceTracingModel extends Document {

    @Prop()
    transactionId: string;

    @Prop()
    task: string;

    @Prop()
    origen: string;

    @Prop()
    method: string;

    @Prop()
    status: string;

    @Prop({ type: Object, default: {} })  
    request: any;
   
    @Prop({ type: 'Mixed' })
    response: Mixed;

    @Prop()
    processingTime: number

}

export const ServiceTracingSchema =  SchemaFactory.createForClass(ServiceTracingModel);