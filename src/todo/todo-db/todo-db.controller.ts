import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  ParseIntPipe,
  Patch,
  Post,
  Put,
  Query,
} from "@nestjs/common";
import { AddTodoDto } from "../dto/add-todo.dto";
import { UpdateTodoDto } from "../dto/update-todo.dto";
import { TodoDbService } from "./todo-db.service";
import { SearchTodoDto } from "../dto/search-todo.dto";
import { PaginateTodoDto } from "../dto/paginated-todo.dto";

@Controller({
  path: "todo",
  version: "2",
})
export class TodoDbController {
  constructor(private readonly todoDbService: TodoDbService) {}
  @Post()
  addTodo(@Body() newTodo: AddTodoDto) {
    return this.todoDbService.addTodo(newTodo);
  }

  @Delete("/:id")
  deleteTodo(@Param("id", ParseIntPipe) id) {
    return this.todoDbService.deleteTodo(id);
  }
  @Delete("soft-delete/:id")
  softDeleteTodo(@Param("id") id) {
    return this.todoDbService.softDeleteTodo(id);
  }

  @Patch(":id")
  restoreTodo(@Param("id", ParseIntPipe) id: number) {
    return this.todoDbService.restoreTodo(id);
  }

  @Put("/:id")
  updateTodo(@Param("id", ParseIntPipe) id, @Body() newTodo: UpdateTodoDto) {
    return this.todoDbService.updateTodo(id, newTodo);
  }
  @Get("all")
  getTodos(@Query() searchCriteria: SearchTodoDto) {
    return this.todoDbService.getAllTodos(searchCriteria);
  }
  @Get("count")
  countByStatus() {
    console.log("hii");
    return this.todoDbService.countByStatus();
  }
  @Get("/:id")
  getTodoById(@Param("id", ParseIntPipe) id) {
    return this.todoDbService.todoById(id);
  }
  @Get()
  getAllTodosPaginated(@Query() paginateTodo: PaginateTodoDto) {
    return this.todoDbService.getAllTodosPaginated(
      paginateTodo.page,
      paginateTodo.limit
    );
  }
}
