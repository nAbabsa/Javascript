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

  // @Delete('/completed')
  // deleteCompletedTodos(): Array<TodoDTO> {
  //   const filterTodo = TestTodo.filter((ftodo) => ftodo.state != 'DONE');
  //   TestTodo = filterTodo;
  //   return [];
  //   // return this.getTodos();
  // }

  // @Delete(':id')
  // async deleteTodos(@Param('id') id: string, @Body() todo): Promise<Todos> {
  //   const filterTodo = TestTodo.filter((ftodo) => ftodo._id != id);
  //   TestTodo = filterTodo;
  //   return todo;
  // }

  // @Put(':id')
  // async putTodos(@Param('id') id: string, @Body() todo): Promise<TodoDTO[]> {
  //   const filterTodo = TestTodo.filter((ftodo) => ftodo._id == id);
  //   if (filterTodo[0].state == 'PENDING'){
  //     filterTodo[0].state = 'DONE';
  //   }else{
  //     filterTodo[0].state = 'PENDING';
  //   }
  //   return todo;
  // }


}
