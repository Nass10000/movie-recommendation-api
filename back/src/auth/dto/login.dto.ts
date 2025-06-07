import { IsString, IsNotEmpty } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';

export class LoginDto {
  @ApiProperty({ example: 'usuario123', description: 'Nombre de usuario' })
  @IsString()
  @IsNotEmpty()
  username!: string;

  @ApiProperty({ example: 'secreto123', description: 'Contraseña del usuario' })
  @IsString()
  @IsNotEmpty()
  password!: string;
}