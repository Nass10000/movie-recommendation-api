import { IsString, IsEmail, MinLength, MaxLength, Matches } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';
import { Match } from './match.decorator';

export class RegisterDto {
  @ApiProperty({ example: 'johndoe', description: 'Nombre de usuario único' })
  @IsString()
  @MinLength(4, { message: 'El username debe tener al menos 4 caracteres' })
  @MaxLength(20, { message: 'El username debe tener máximo 20 caracteres' })
  username!: string;

  @ApiProperty({ example: 'John Doe', description: 'Nombre completo del usuario' })
  @IsString()
  fullName!: string;

  @ApiProperty({ example: 'john@example.com', description: 'Correo válido' })
  @IsEmail({}, { message: 'El correo no es válido' })
  email!: string;

  @ApiProperty({
    example: 'Str0ngP@ss!',
    description: 'Mínimo 8 caracteres, al menos 1 mayúscula, 1 número y 1 especial'
  })
  @IsString()
  @MinLength(8, { message: 'La contraseña debe tener al menos 8 caracteres' })
  @Matches(/(?=.*\d)/, { message: 'La contraseña debe contener al menos un número' })
  @Matches(/(?=.*[A-Z])/, { message: 'La contraseña debe contener al menos una letra mayúscula' })
  @Matches(/(?=.*[!@#$%^&*])/, { message: 'La contraseña debe contener al menos un caracter especial' })
  password!: string;

  @ApiProperty({ example: 'Str0ngP@ss!', description: 'Repite la contraseña' })
  @IsString()
  @Match('password', { message: 'Las contraseñas no coinciden' })
  confirmPassword!: string;
}
