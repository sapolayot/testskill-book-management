import { Type } from 'class-transformer';
import { IsInt, IsNotEmpty, Min } from 'class-validator';

export class PaginationQueryDto {
  @IsNotEmpty()
  @Type(() => Number)
  @IsInt()
  @Min(1)
  page: number;

  @IsNotEmpty()
  @Type(() => Number)
  @IsInt()
  @Min(1)
  limit: number;
}
