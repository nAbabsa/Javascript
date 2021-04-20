import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';

export type TodoDocument = Todos & Document;

@Schema()
export class Todos {
  @Prop()
  state: string;

  @Prop()
  name: string;
   
  @Prop()
  _id : string;
  
}

export const TodoSchema = SchemaFactory.createForClass(Todos);