import { ITodo } from "../models/todo.model";
import { IsNotEmpty, IsString, Length, MinLength } from "class-validator";
import {
  emptyDescriptionError,
  emptyNameError,
  lengthNameError,
  minLengthDescriptionError,
} from "../error-msgs-todo";

export class AddTodoDto implements Pick<ITodo, "name" | "description"> {
  @IsNotEmpty({ message: emptyNameError })
  @Length(3, 10, { message: lengthNameError })
  @IsString()
  name: string;

  @MinLength(10, { message: minLengthDescriptionError })
  @IsNotEmpty({ message: emptyDescriptionError })
  @IsString()
  description: string;
}
