/**
 * Se define la configuracion del modelo de la coleccion coll_message
 * @author Fredy Santiago Martinez
 */

import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';

@Schema({versionKey: false})
export class MessageModel extends Document{ 

    @Prop()
    id: string;

    @Prop()
    description: string;

    @Prop()
    message: string

}

export const MessageSchema = SchemaFactory.createForClass(MessageModel);
