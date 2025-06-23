import { ApiProperty } from '@nestjs/swagger';
import { IsInt, IsNotEmpty, IsOptional, IsString } from 'class-validator';

export class CreateBookDto {
  @IsNotEmpty()
  @IsString()
  @ApiProperty({ example: 'The Great Gatsby', description: 'ชื่อหนังสือ' })
  title: string;

  @IsNotEmpty()
  @IsString()
  @ApiProperty({ example: 'F. Scott Fitzgerald', description: 'ชื่อผู้เขียน' })
  author: string;

  @IsOptional()
  @IsInt()
  @ApiProperty({ example: 1925, required: false, description: 'ปีที่ตีพิมพ์' })
  published_year?: number;

  @IsOptional()
  @IsString()
  @ApiProperty({
    example: 'Fantasy',
    required: false,
    description: 'ประเภทหนังสือ',
  })
  genre?: string;
}
