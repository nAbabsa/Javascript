import {Body, Controller, Delete, Get, Param, Post, Put} from '@nestjs/common';
import { AppService } from './app.service';
import {filter} from "rxjs/operators";

interface TodoDTO {
  _id: string;
  name: string;
  state: 'DONE' | 'PENDING';
}

let TestTodo: TodoDTO[] = [
  { _id: '0', name: 'AAA', state: 'DONE' },
  { _id: '1', name: 'BBB', state: 'PENDING' },
];

@Controller('/todos')
export class AppController {
  constructor(private readonly appService: AppService) {}

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

  @Delete(':id')
  async deleteTodos(@Param('id') id: string, @Body() todo): Promise<TodoDTO[]> {
    const filterTodo = TestTodo.filter((ftodo) => ftodo._id != id);
    TestTodo = filterTodo;
    return todo;
  }

/*  @Put(':id')
  async putTodos(@Param('id') id: string, @Body() todo): Promise<TodoDTO[]> {
    const filterTodo = TestTodo.filter((ftodo) => ftodo._id != id);
    TestTodo = filterTodo;
    return todo;
  }*/

  @Delete('/completed')
  deleteCompletedTodos(): Array<TodoDTO> {
    console.log('hello');
    const filterTodo = TestTodo.filter((ftodo) => ftodo.state != 'DONE');
    TestTodo = filterTodo;
    console.log('hello2');
    return this.getTodos();
  }
}
