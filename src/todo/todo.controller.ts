import {
  Body,
  Controller,
  Delete,
  Get,
  NotFoundException,
  Param,
  Post,
  Put,
} from "@nestjs/common";
import { Todo } from "./models/todo.model";
import { AddTodoDto } from "./dto/add-todo.dto";
import { UpdateTodoDto } from "./dto/update-todo.dto";
import { TodoService } from "./todo.service";

@Controller({
  path: "todo",
  version: "1",
})
export class TodoController {
  constructor(private readonly todoService: TodoService) {}
  @Get()
  getTodos(): Todo[] {
    return this.todoService.getTodos();
  }

  @Get("/:id")
  getTodoById(@Param("id") id) {
    return this.todoService.getTodo(id);
  }

  @Post()
  addTodo(@Body() newTodo: AddTodoDto) {
    return this.todoService.addTodo(newTodo);
  }

  @Delete("/:id")
  deleteTodo(@Param("id") id) {
    return this.todoService.deleteTodo(id);
  }

  @Put("/:id")
  updateTodo(@Param("id") id, @Body() newTodo: UpdateTodoDto) {
    return this.todoService.updateTodo(id, newTodo);
  }
}
