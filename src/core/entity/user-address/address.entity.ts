// src/core/entity/address.entity.ts

import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';

@Schema()
export class Address extends Document {
  @Prop({ required: true })
  addressLine: string;

  @Prop({ required: true })
  city: string;

  @Prop({ required: true })
  department: string;

  @Prop({ required: true })
  country: string;

  @Prop({ default: false })
  principal: boolean;

  @Prop({ default: true })
  active: boolean;
}

export const AddressSchema = SchemaFactory.createForClass(Address);
