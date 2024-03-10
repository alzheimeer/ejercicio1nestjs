/**
 * Se define la configuracion del modelo de la coleccion usuario-direccion
 * @author Mauricio Quintero
 */

import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import mongoose, { Document } from 'mongoose';
import { Address } from './address.model';

@Schema({ versionKey: false })
export class User extends Document {
  @Prop()
  name: string;

  @Prop()
  documentType: string;

  @Prop()
  documentNumber: string;

  @Prop({ type: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Address' }] })
  addresses: Address[];
}

export const UserSchema = SchemaFactory.createForClass(User);