import { Model } from 'mongoose';
import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Todos, TodoDocument } from 'Schemas/Todo.schema';
// import { CreateTodoDto } from './dto/create-cat.dto';

@Injectable()
export class AppService {

  constructor(@InjectModel(Todos.name) private todoModel: Model<TodoDocument>) {}

    async getHello(): Promise<Todos[]> {
    const todo =  new this.todoModel({_id: "ifwueg", name: "toto", state: "completed"})
    await todo.save();
    return this.todoModel.find().exec();
  }
}
