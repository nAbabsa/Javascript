import {Body, Controller, Delete, Get, Param, Post, Put} from '@nestjs/common';
import { AppService } from './app.service';
import {filter} from "rxjs/operators";
import { Todos } from 'Schemas/Todo.schema';

interface TodoDTO {
  _id: string;
  name: string;
  state: 'DONE' | 'PENDING';
}

let TestTodo: TodoDTO[] = [
  { _id: '0', name: 'AAA', state: 'DONE' },
  { _id: '1', name: 'BBB', state: 'PENDING' },
];

@Controller('todos')
export class AppController {
  constructor(private readonly appService: AppService) {}

  @Get('/hello')
  async getHello(): Promise<Todos[]> {
    const todo = await this.appService.getHello();
    console.log(todo);
    return todo;
  }

  @Get()
  getTodos(): Array<TodoDTO> {
    return TestTodo;
  }


  @Post()
  async postTodos(@Body() todo): Promise<TodoDTO[]> {
    todo._id = Math.random();
    TestTodo.push(todo);
    return todo;
  }

  @Delete('/completed')
  deleteCompletedTodos(): Array<TodoDTO> {
    const filterTodo = TestTodo.filter((ftodo) => ftodo.state != 'DONE');
    TestTodo = filterTodo;
    return [];
    // return this.getTodos();
  }

  @Delete(':id')
  async deleteTodos(@Param('id') id: string, @Body() todo): Promise<TodoDTO[]> {
    const filterTodo = TestTodo.filter((ftodo) => ftodo._id != id);
    TestTodo = filterTodo;
    return todo;
  }

  @Put(':id')
  async putTodos(@Param('id') id: string, @Body() todo): Promise<TodoDTO[]> {
    const filterTodo = TestTodo.filter((ftodo) => ftodo._id == id);
    if (filterTodo[0].state == 'PENDING'){
      filterTodo[0].state = 'DONE';
    }else{
      filterTodo[0].state = 'PENDING';
    }
    return todo;
  }


}
