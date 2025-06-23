import { PartialType } from '@nestjs/mapped-types';
import { ApiPropertyOptional } from '@nestjs/swagger';
import { CreateBookDto } from './create-book.dto';

export class UpdateBookDto extends PartialType(CreateBookDto) {
  @ApiPropertyOptional({
    example: 'The Great Gatsby',
    description: 'ชื่อหนังสือ',
  })
  title?: string;

  @ApiPropertyOptional({
    example: 'F. Scott Fitzgerald',
    description: 'ชื่อผู้แต่ง',
  })
  author?: string;

  @ApiPropertyOptional({ example: 1925, description: 'ปีที่ตีพิมพ์' })
  published_year?: number;

  @ApiPropertyOptional({ example: 'Fantasy', description: 'ประเภทหนังสือ' })
  genre?: string;
}
