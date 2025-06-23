import { ApiProperty } from '@nestjs/swagger';
import { Exclude, Expose } from 'class-transformer';

export class UserResponseDto {
  @Expose()
  @ApiProperty({
    example: '123e4567-e89b-12d3-a456-426614174000',
    description: 'รหัสผู้ใช้ (UUID)',
  })
  id: string;

  @Expose()
  @ApiProperty({ example: 'admin', description: 'ชื่อผู้ใช้' })
  username: string;

  @Exclude()
  @ApiProperty({ example: 'password', description: 'รหัสผ่าน' })
  password: string;

  @Expose()
  @ApiProperty({ example: 'admin@example.com', description: 'อีเมลผู้ใช้' })
  email: string;

  @Expose()
  @ApiProperty({
    example: 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...',
    description: 'JWT Access Token',
  })
  access_token: string;
}
