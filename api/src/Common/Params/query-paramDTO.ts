import { IsNumber, IsOptional, IsString } from "class-validator";

export class QueryParamDTO {
  @IsOptional()
  @IsString()
  search?: string;

  @IsOptional()
  @IsNumber()
  page?: number = 1;

  @IsOptional()
  @IsNumber()
  limit?: number = 10;
}
