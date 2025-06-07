// create-user.dto.ts
import { IsEmail, IsEnum, IsOptional, IsString, MinLength, MaxLength } from 'class-validator';
import { UserRole } from '../../common/role.enum';
import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';

export class CreateUserDto {
  @ApiProperty({ minLength: 4, maxLength: 20, example: 'usuario123' })
  @IsString()
  @MinLength(4)
  @MaxLength(20)
  username!: string;

  @ApiProperty({ example: 'Juan Pérez' })
  @IsString()
  fullName!: string;

  @ApiProperty({ example: 'correo@ejemplo.com' })
  @IsEmail()
  email!: string;

  @ApiProperty({ minLength: 6, example: 'secreto123' })
  @IsString()
  @MinLength(6)
  password!: string;

  @ApiPropertyOptional({ enum: UserRole, example: UserRole.USER })
  @IsOptional()
  @IsEnum(UserRole)
  role?: UserRole;
}

