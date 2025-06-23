import { ApiProperty } from '@nestjs/swagger';
import { IsString } from 'class-validator';

export class LoginDto {
  @ApiProperty({ example: 'admin', description: 'ผู้ใช้งาน' })
  @IsString()
  username: string;

  @ApiProperty({ example: 'password', description: 'รหัสผ่าน' })
  @IsString()
  password: string;
}
