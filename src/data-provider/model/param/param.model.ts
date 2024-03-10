/**
 * Se define la configuracion del modelo de la coleccion coll_params
 * @author Fredy Santiago Martinez
 */
import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document, Mixed } from 'mongoose';

@Schema({ versionKey: false })
export class ParamModel extends Document {

    @Prop({ unique: true })
    id_param: string;

    @Prop()
    description: string;

    @Prop()
    status: boolean;

    @Prop()
    createdUser: string;

    @Prop()
    updatedUser: string;

    @Prop()
    createdAt: string;

    @Prop()
    updatedAt: string;

    @Prop({ type: 'Mixed' })
    values: Mixed;

}

export const ParamSchema = SchemaFactory.createForClass(ParamModel);
