import { IsString, IsNotEmpty, IsEmail, MinLength } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';

export class RegisterDto {
  @ApiProperty({ example: 'usuario123', description: 'Nombre de usuario único' })
  @IsString()
  @IsNotEmpty()
  username!: string;

  @ApiProperty({ example: 'Juan Pérez', description: 'Nombre completo del usuario' })
  @IsString()
  @IsNotEmpty()
  fullName!: string;

  @ApiProperty({ example: 'correo@ejemplo.com', description: 'Correo electrónico válido' })
  @IsEmail()
  email!: string;

  @ApiProperty({ minLength: 8, example: 'secreto123', description: 'Contraseña (mínimo 8 caracteres)' })
  @MinLength(8)
  @IsString()
  password!: string;

  @ApiProperty({ example: 'secreto123', description: 'Confirmación de la contraseña' })
  @IsString()
  @IsNotEmpty()
  confirmPassword!: string;
}