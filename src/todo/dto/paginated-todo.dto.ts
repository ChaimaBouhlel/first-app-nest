import { IsOptional } from "class-validator";

export class PaginateTodoDto {
  @IsOptional()
  limit: number;

  @IsOptional()
  page: number;
}
