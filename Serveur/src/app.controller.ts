import {Body, Controller, Delete, Get, Param, Post, Put} from '@nestjs/common';
import { AppService } from './app.service';
import {filter} from "rxjs/operators";
import { Todos } from 'Schemas/Todo.schema';
import  TodoDto  from './types/TodoDto.interface';




@Controller('todos')
export class AppController {
  constructor(private readonly appService: AppService) {}



  @Get()
  async getTodos(): Promise<Todos[]> {
    const getTodo = await this.appService.getTodos();
    return getTodo;
  }


  @Post()
  async postTodos(@Body() todo:TodoDto): Promise<Todos> {
    const AddTodo = await this.appService.postTodos(todo);
    return AddTodo;
  }

  @Delete('/completed')
  async deleteCompletedTodos():  Promise<Todos[]>{
    const getTodo = await this.appService.deleteCompleted();
    return getTodo;
  }

  @Delete(':id')
  async deleteTodos(@Param('id') id: string): Promise<Todos[]> {
    const getTodo = await this.appService.deleteTodos(id);
    return getTodo;
  }

  @Put(':id')
  async putTodos(@Param('id') id: string) {
    const getTodo = await this.appService.putTodos(id);
    return getTodo;
  }



}
