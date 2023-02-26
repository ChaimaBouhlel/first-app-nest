import { TodoStatusEnum } from "../../enums/todo-status.enum";
export interface ITodo {
  id: string;
  name: string;
  description: string;
  createdAt: Date;
  status: TodoStatusEnum;
}
export class Todo {
  id: string;
  name: string;
  description: string;
  createdAt: Date;
  status: TodoStatusEnum;
  constructor(
    id: string,
    name: string,
    description: string,
    createdAt: Date,
    status: TodoStatusEnum
  ) {
    this.id = id;
    this.name = name;
    this.description = description;
    this.createdAt = createdAt;
    this.status = status;
  }
}
