 /**
 * Se define la configuracion del modelo de la coleccion users
 * @author Mauricio Quintero
 */
import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';
import { AddressModel, AddressSchema } from './address.model';

@Schema({ versionKey: false })
export class UserModel {
  
  @Prop({ required: false })
  id: string;

  @Prop({ required: true })
  name: string;

  @Prop({ required: true })
  documentNumber: string;

  @Prop({ required: true })
  documentType: string;

  @Prop({ type: [AddressSchema], default: [] })
  addresses: AddressModel[];
}

export const UserSchema = SchemaFactory.createForClass(UserModel);