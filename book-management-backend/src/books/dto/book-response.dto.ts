import { ApiProperty } from '@nestjs/swagger';

export class BookResponseDto {
  @ApiProperty({
    example: '123e4567-e89b-12d3-a456-426614174000',
    description: 'รหัสหนังสือ (UUID)',
  })
  id: string;

  @ApiProperty({ example: 'The Great Gatsby', description: 'ชื่อหนังสือ' })
  title: string;

  @ApiProperty({ example: 'F. Scott Fitzgerald', description: 'ชื่อผู้แต่ง' })
  author: string;

  @ApiProperty({ example: 1925, description: 'ปีที่ตีพิมพ์' })
  published_year?: number;

  @ApiProperty({
    example: 'Classic',
    description: 'ประเภทหนังสือ',
  })
  genre?: string;

  @ApiProperty({
    example: '2024-06-23T12:34:56Z',
    description: 'วันที่สร้างข้อมูล',
  })
  created_at: Date;

  @ApiProperty({
    example: '2024-06-24T10:00:00Z',
    description: 'วันที่แก้ไขล่าสุด',
  })
  updated_at: Date;
}
