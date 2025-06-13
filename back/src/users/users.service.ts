import { Injectable, NotFoundException, BadRequestException } from '@nestjs/common';
import { Repository } from 'typeorm';
import { User } from './users.entity';
import { InjectRepository } from '@nestjs/typeorm';
import * as bcrypt from 'bcrypt';
import { RegisterDto } from '../auth/dto/register.dto';

@Injectable()
export class UsersService {
  constructor(
    @InjectRepository(User)
    private usersRepository: Repository<User>,
  ) {}

  async findOneByUsername(username: string): Promise<User> {
    const user = await this.usersRepository.findOne({
      where: { username },
      select: ['id', 'username', 'fullName', 'email', 'password', 'role', 'createdAt', 'updatedAt'],
    });
    if (!user) {
      throw new NotFoundException('User not found');
    }
    return user;
  }

  async create(registerDto: RegisterDto): Promise<User> {
    console.log('🛠️ Intentando crear usuario:', registerDto);
    try {
      // Validación de contraseñas
      if (registerDto.password !== registerDto.confirmPassword) {
        console.error('❌ Contraseñas no coinciden');
        throw new BadRequestException('Las contraseñas no coinciden');
      }

      // Validación de usuario/email existente
      const existingUser = await this.usersRepository.findOne({
        where: [{ email: registerDto.email }, { username: registerDto.username }],
      });
      if (existingUser) {
        console.error('❌ Usuario o email ya existe');
        throw new BadRequestException('El usuario o email ya existe');
      }

      // Hashear y guardar
      const hashedPassword = await bcrypt.hash(registerDto.password, 10);
      console.log('🔑 Password hasheada:', hashedPassword);
      const user = this.usersRepository.create({
        ...registerDto,
        password: hashedPassword,
      });
      const savedUser = await this.usersRepository.save(user);
      console.log('✅ Usuario creado:', savedUser);
      return savedUser;
    } catch (err) {
      console.error('❌ Error al crear usuario:', err);
      // Si ya es una excepción de Nest, relanza tal cual
      if (err instanceof BadRequestException) throw err;
      if (err instanceof Error) {
        throw new BadRequestException(err.message || 'Error al registrar');
      }
      throw new BadRequestException('Error al registrar');
    }
  }

  async findById(id: string): Promise<User> {
    const user = await this.usersRepository.findOne({ where: { id } });
    if (!user) throw new NotFoundException('User not found');
    return user;
  }

  async findAll(): Promise<User[]> {
    return this.usersRepository.find();
  }

  async findByEmail(email: string): Promise<User | undefined> {
    const user = await this.usersRepository.findOne({ where: { email } });
    return user === null ? undefined : user;
  }

  // alias para register si tu controller lo usa
  async register(dto: RegisterDto): Promise<User> {
    return this.create(dto);
  }
}
