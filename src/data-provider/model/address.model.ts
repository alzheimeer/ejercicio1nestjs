/**
 * Se define la configuracion del modelo de la coleccion address
 * @author Mauricio Quintero
 */
import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';

@Schema({ versionKey: false })
export class Address extends Document {
  @Prop({ required: true })
  address: string;

  @Prop({ required: true })
  isActive: boolean;

  @Prop({ required: true })
  isPrimary: boolean;
}

export const AddressSchema = SchemaFactory.createForClass(Address);