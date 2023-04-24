import {
  ConflictException,
  Injectable,
  NotFoundException,
} from "@nestjs/common";

import { AddTodoDto } from "../dto/add-todo.dto";
import { UpdateTodoDto } from "../dto/update-todo.dto";
import { TodoEntity } from "../entities/todo.entity";
import { InjectRepository } from "@nestjs/typeorm";
import { Like, Repository } from "typeorm";
import { SearchTodoDto } from "../dto/search-todo.dto";
import { TodoStatusEnum } from "../../enums/todo-status.enum";

@Injectable()
export class TodoDbService {
  constructor(
    @InjectRepository(TodoEntity)
    private todoRepository: Repository<TodoEntity>
  ) {}
  async todoById(id: number) {
    const promise = await this.todoRepository.findBy({ id: id });
    if (!promise) {
      throw new NotFoundException();
    }
    return promise;
  }

  async addTodo(todoDto: AddTodoDto) {
    const newTodo = this.todoRepository.create(todoDto);
    try {
      return await this.todoRepository.save(newTodo);
    } catch (e) {
      throw new ConflictException(
        "exception detected while adding a new todo to the list "
      );
    }
  }
  async deleteTodo(id: number) {
    return await this.todoRepository.delete(id);
  }

  async restoreTodo(id: number) {
    return await this.todoRepository.restore(id);
  }

  async softDeleteTodo(id: number) {
    return await this.todoRepository.softDelete(id);
  }

  async updateTodo(id: number, newTodo: UpdateTodoDto) {
    return await this.todoRepository.update(id, newTodo);
  }

  async countByStatus() {
    const waitingCount = await this.todoRepository.count({
      where: { status: TodoStatusEnum.waiting },
    });
    console.log(waitingCount);
    const actifCount = await this.todoRepository.count({
      where: { status: TodoStatusEnum.active },
    });
    const doneCount = await this.todoRepository.count({
      where: { status: TodoStatusEnum.done },
    });
    return {
      "En Cours": actifCount,
      "En attente": waitingCount,
      "Finalisé": doneCount,
    };
  }

  async getAllTodos(searchCriteria: SearchTodoDto) {
    if (searchCriteria) {
      if (searchCriteria.status || searchCriteria.critere) {
        return await this.todoRepository.find({
          where: [
            { name: Like(`%${searchCriteria.critere}%`) },
            { description: Like(`%${searchCriteria.critere}%`) },
            { status: searchCriteria.status },
          ],
        });
      }
    }
    return await this.todoRepository.find();
  }
}
