/**
 * Se define la configuracion del modelo de la coleccion address
 * @author Mauricio Quintero
 */
import * as mongoose from 'mongoose';
import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';

@Schema({ versionKey: false })
export class AddressModel extends Document {
  
  @Prop({ required: true, type: mongoose.Schema.Types.ObjectId, ref: 'User' })
  userId: mongoose.Types.ObjectId;

  @Prop({ required: true })
  address: string;

  @Prop({ required: true })
  isActive: boolean;

  @Prop({ required: true })
  isPrimary: boolean;
}

export const AddressSchema = SchemaFactory.createForClass(AddressModel);