import { Model } from 'mongoose';
import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Todos, TodoDocument } from 'Schemas/Todo.schema';
 import  TodoDto  from './types/TodoDto.interface';

@Injectable()
export class AppService {

  constructor(@InjectModel(Todos.name) private todoModel: Model<TodoDocument>) {}


  async getTodos(): Promise<Todos[]> {
    return this.todoModel.find().exec();

  }

  
  async postTodos(todo:TodoDto): Promise<Todos> {
    const AddTodo =  new this.todoModel(todo)
    await AddTodo.save();
    return AddTodo;
  }

 
}
