import { IsEnum, IsIn, IsOptional } from "class-validator";
import { TodoStatusEnum } from "../../enums/todo-status.enum";

export class SearchTodoDto {
  @IsOptional()
  critere: string;

  @IsOptional()
  @IsEnum(TodoStatusEnum)
  status: string;
}
