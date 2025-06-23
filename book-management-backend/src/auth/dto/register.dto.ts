import { ApiProperty } from '@nestjs/swagger';
import { IsEmail, IsString, MinLength } from 'class-validator';

export class RegisterDto {
  @ApiProperty({ example: 'admin', description: 'ผู้ใช้งาน' })
  @IsString()
  username: string;

  @ApiProperty({ example: 'admin@example.com', description: 'อีเมล' })
  @IsEmail()
  email: string;

  @ApiProperty({ example: 'password', description: 'รหัสผ่าน' })
  @IsString()
  @MinLength(6)
  password: string;
}
