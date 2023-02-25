import { Body, Controller, Get, Post, Req, Res } from '@nestjs/common';
import { Request, Response } from 'express';
import { Todo } from './entities/todo.entity';

@Controller('todo')
export class TodoController {
  constructor() {
    this.todos = [];
  }
  todos: Todo[];
  @Get()
  getTodos() {
    console.log('get todo list');
    return this.todos;
  }

  @Get('getV2')
  getTodosV2(@Req() request: Request, @Res() response: Response) {
    console.log('get todo list V2');
    response.status(205);
    response.json({
      content: 'todos list',
    });
  }
  @Post()
  addTodo(@Body() newTodo) {
    console.log('add todo list');
    console.log(newTodo);
    return 'add new todo to the list';
  }

  @Post('postV2')
  addTodoV2(
    @Body('id') id: string,
    @Body('name') name: string,
    @Body('description') description: string,
  ) {
    console.log('add todo list');
    console.log(id, name, description);
    return 'add new todo to the list';
  }

  @Post('postV3')
  addTodoV3(@Body() newTodo: Todo) {
    console.log('add todo list');
    if (this.todos.length) {
      newTodo.id = this.todos.length + 1;
    } else {
      newTodo.id = 1;
    }
    this.todos.push(newTodo);
    console.log(newTodo);
    return this.todos;
  }
}
