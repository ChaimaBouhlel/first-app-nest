import { Inject, Injectable, NotFoundException } from "@nestjs/common";
import { Todo } from "./models/todo.model";
import { AddTodoDto } from "./dto/add-todo.dto";
import { TodoStatusEnum } from "../enums/todo-status.enum";
import { UpdateTodoDto } from "./dto/update-todo.dto";

@Injectable()
export class TodoService {
  private todos: Todo[] = [];

  @Inject("uuid") uuid: () => string;

  getTodos(): Todo[] {
    return this.todos;
  }

  getTodo(id: string): Todo {
    const todo = this.todos.find((actualTodo) => actualTodo.id == id);
    if (todo) return todo;
    throw new NotFoundException(`Todo of id ${id} does not exist`);
  }

  addTodo(todo: AddTodoDto): Todo {
    const newTodo = new Todo(
      this.uuid(),
      todo.name,
      todo.description,
      new Date(),
      TodoStatusEnum.waiting
    );
    this.todos.push(newTodo);
    return newTodo;
  }

  deleteTodo(id: string) {
    const index = this.todos.findIndex((todo) => todo.id === id);
    if (index >= 0) {
      this.todos.splice(index, 1);
    } else {
      throw new NotFoundException(`Todo of id ${id} does not exist`);
    }
    return `Todo of id ${id} was successfully deleted`;
  }

  updateTodo(id: string, newTodo: UpdateTodoDto) {
    const todo = this.getTodo(id);
    todo.description = newTodo.description
      ? newTodo.description
      : todo.description;
    todo.name = newTodo.name ? newTodo.name : todo.name;
    todo.status = newTodo.status ? newTodo.status : todo.status;
    return todo;
  }
}
