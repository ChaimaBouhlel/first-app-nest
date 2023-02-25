import { Controller, Get, Post, Req, Res } from '@nestjs/common';
import { Request, Response } from 'express';

@Controller('todo')
export class TodoController {
  @Get()
  getTodos() {
    console.log('get todo list');
    return 'list To do';
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
  addTodos(@Req() request: Request, @Res() response: Response) {
    console.log('get todo list');
    return 'list To do';
  }
}
