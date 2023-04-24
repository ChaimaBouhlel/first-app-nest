import { Module } from "@nestjs/common";
import { TodoController } from "./todo.controller";
import { TodoService } from "./todo.service";
import { TypeOrmModule } from "@nestjs/typeorm";
import { TodoEntity } from "./entities/todo.entity";
import { TodoDbController } from "./todo-db/todo-db.controller";
import { TodoDbService } from "./todo-db/todo-db.service";

@Module({
  imports: [TypeOrmModule.forFeature([TodoEntity])],
  controllers: [TodoController, TodoDbController],
  providers: [TodoService, TodoDbService],
})
export class TodoModule {}
