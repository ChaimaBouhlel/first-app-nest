import { Body, Controller, Delete, Get, NotFoundException, Param, Post, Put } from "@nestjs/common";
import { Todo } from "./models/todo.model";
import { v1 as uuidv1 } from "uuid";
import { TodoStatusEnum } from "../enums/todo-status.enum";
import { AddTodoDto } from "./dto/add-todo.dto";
import { UpdateTodoDto } from "./dto/update-todo.dto";

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
    const todo = this.todos.find((actualTodo) => actualTodo.id == id);
    if (todo) return todo;
    throw new NotFoundException(`Todo of id ${id} does not exist`);
  }

  @Post()
  addTodo(@Body() newTodo: AddTodoDto) {
    console.log("add todo");
    const { name, description } = newTodo;
    const todo = new Todo(
      uuidv1(),
      name,
      description,
      new Date(),
      TodoStatusEnum.waiting
    );
    this.todos.push(todo);
    return this.todos;
  }

  @Delete("/:id")
  deleteTodo(@Param("id") id) {
    console.log("delete todo by id");
    const index = this.todos.findIndex((todo) => todo.id === id);
    if (index >= 0) {
      this.todos.splice(index, 1);
    } else {
      throw new NotFoundException(`Todo of id ${id} does not exist`);
    }
    return `Todo of id ${id} was successfully deleted`;
  }

  @Put("/:id")
  updateTodo(@Param("id") id, @Body() newTodo: UpdateTodoDto) {
    const todo = this.getTodoById(id);
    todo.description = newTodo.description
      ? newTodo.description
      : todo.description;
    todo.name = newTodo.name ? newTodo.name : todo.name;
    todo.status = newTodo.status ? newTodo.status : todo.status;
    return todo;
  }
}
