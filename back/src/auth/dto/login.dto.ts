import { IsString } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';

export class LoginDto {
  @ApiProperty({ example: 'johndoe', description: 'Nombre de usuario registrado' })
  @IsString()
  username!: string;

  @ApiProperty({ example: 'Str0ngP@ss!', description: 'Contraseña del usuario' })
  @IsString()
  password!: string;
}
