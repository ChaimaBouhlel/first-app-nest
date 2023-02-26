import { ITodo } from "../models/todo.model";
import { IsEnum, IsOptional, IsString } from "class-validator";
import { TodoStatusEnum } from "../../enums/todo-status.enum";

export class UpdateTodoDto implements Omit<ITodo, "createdAt" | "id"> {
  @IsString()
  @IsOptional()
  description: string;

  @IsString()
  @IsOptional()
  name: string;

  @IsEnum(TodoStatusEnum)
  @IsOptional()
  status: TodoStatusEnum;
}
