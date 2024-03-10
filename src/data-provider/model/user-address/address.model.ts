/**
 * Se define la configuracion del modelo de la coleccion usuario-direccion
 * @author Mauricio Quintero
 */


import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';

@Schema({ versionKey: false })
export class Address  extends Document {
  @Prop()
  addressLine: string;

  @Prop()
  city: string;

  @Prop()
  department: string;

  @Prop()
  country: string;

  @Prop({ default: false })
  principal: boolean;

  @Prop({ default: true })
  active: boolean;
}

export const AddressSchema = SchemaFactory.createForClass(Address);
