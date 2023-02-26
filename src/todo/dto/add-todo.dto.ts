import { ITodo } from "../models/todo.model";
import { IsString } from "class-validator";

export class AddTodoDto implements Pick<ITodo, "name" | "description"> {
  @IsString()
  name: string;

  @IsString()
  description: string;
}
