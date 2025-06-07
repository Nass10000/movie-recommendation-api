// create-user.dto.ts
import { IsEmail, IsEnum, IsOptional, IsString, MinLength, MaxLength } from 'class-validator';
import { UserRole } from '../../common/role.enum';

export class CreateUserDto {
  @IsString()
  @MinLength(4)
  @MaxLength(20)
  username!: string;

  @IsString()
  fullName!: string;

  @IsEmail()
  email!: string;

  @IsString()
  @MinLength(6)
  password!: string;

  @IsOptional()
  @IsEnum(UserRole)
  role?: UserRole;
}

