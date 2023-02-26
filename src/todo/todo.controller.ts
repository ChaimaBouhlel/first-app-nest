import {
  Body,
  Controller,
  Delete,
  Get,
  NotFoundException,
  Param,
  Post, Put
} from "@nestjs/common";
import { Todo } from "./entities/todo.entity";
import { v1 as uuidv1 } from "uuid";
import { TodoStatusEnum } from "../enums/todo-status.enum";

@Controller("todo")
export class TodoController {
  constructor() {
    this.todos = [];
  }
  todos: Todo[];
  @Get()
  getTodos() {
    console.log("get todo list");
    return this.todos;
  }

  @Get("/:id")
  getTodoById(@Param("id") id) {
    console.log("get todo by id");
    console.log(id);
    const todo = this.todos.find((actualTodo) => actualTodo.id == id);
    if (todo) return todo;
    throw new NotFoundException(`Todo of id ${id} does not exist`);
  }

  @Post()
  addTodo(@Body() newTodo: Todo) {
    console.log("add todo list");
    newTodo.createdAt = new Date();
    newTodo.id = uuidv1();
    newTodo.status = TodoStatusEnum.waiting;
    this.todos.push(newTodo);
    console.log(newTodo);
    return this.todos;
  }

  @Delete("/:id")
  deleteTodo(@Param("id") id) {
    console.log("delete todo by id");
    console.log(id);
    const index = this.todos.findIndex((todo) => todo.id === id);
    if (index >= 0) {
      this.todos.splice(index, 1);
    } else {
      throw new NotFoundException(`Todo of id ${id} does not exist`);
    }
    return `Todo of id ${id} was successfully deleted`;
  }

  @Put("/:id")
  updateTodo(@Param("id") id, @Body() newTodo: Todo) {
    const todo = this.getTodoById(id);
    todo.description = newTodo.description
      ? newTodo.description
      : todo.description;
    todo.name = newTodo.name ? newTodo.name : todo.name;
    todo.status = newTodo.status ? newTodo.status : todo.status;
    return todo;
  }
}
