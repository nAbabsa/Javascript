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

  async deleteTodos(id: String): Promise<Todos[]> {
    await this.todoModel.deleteOne({ _id : id});
    return this.getTodos();
  }

  async deleteCompleted(): Promise<Todos[]> {
    await this.todoModel.deleteMany({state : 'DONE'});
    return this.getTodos();
  }

  async postTodos(todo:TodoDto): Promise<Todos> {
    const AddTodo =  new this.todoModel(todo)
    await AddTodo.save();
    return AddTodo;
  }

  async putTodos(id:String): Promise<Todos[]>{
    const PutTodo = await this.todoModel.findById(id).exec();
  if (PutTodo.state == 'PENDING'){
      await this.todoModel.findByIdAndUpdate({_id : id}, {state: 'DONE'});
  }else{
      await this.todoModel.findByIdAndUpdate({_id : id}, {state: 'PENDING'});
    }
    await PutTodo.save();
    return this.getTodos();
  }
}
