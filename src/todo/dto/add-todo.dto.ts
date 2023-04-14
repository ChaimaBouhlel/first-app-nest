import { ITodo } from "../models/todo.model";
import { IsNotEmpty, IsString } from "class-validator";

export class AddTodoDto implements Pick<ITodo, "name" | "description"> {
  @IsString()
  @IsNotEmpty()
  name: string;

  @IsString()
  description: string;
}
