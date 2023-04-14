import { ITodo } from "../models/todo.model";
import {
  IsEnum,
  IsOptional,
  IsString,
  Length,
  MinLength,
} from "class-validator";
import { TodoStatusEnum } from "../../enums/todo-status.enum";
import { lengthNameError, minLengthDescriptionError } from "../error-msgs-todo";

export class UpdateTodoDto implements Omit<ITodo, "createdAt" | "id"> {
  @IsString()
  @IsOptional()
  @MinLength(10, { message: minLengthDescriptionError })
  description: string;

  @IsString()
  @IsOptional()
  @Length(3, 10, { message: lengthNameError })
  name: string;

  @IsEnum(TodoStatusEnum)
  @IsOptional()
  status: TodoStatusEnum;
}
