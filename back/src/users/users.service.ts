// users.service.ts
import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { User } from './users.entity';
import { CreateUserDto } from '../users/dto/create-user.dto';
import * as bcrypt from 'bcrypt';

@Injectable()
export class UsersService {
  constructor(
    @InjectRepository(User)
    private userRepo: Repository<User>,
  ) {}

  async register(dto: CreateUserDto): Promise<User> {
    const existing = await this.userRepo.findOneBy({ email: dto.email });
    if (existing) throw new Error('Correo ya registrado');

    const hashed = await bcrypt.hash(dto.password, 10);
    const user = this.userRepo.create({ ...dto, password: hashed });
    return this.userRepo.save(user);
  }

  findAll(): Promise<User[]> {
    return this.userRepo.find();
  }

  async findById(id: string): Promise<User> {
    const user = await this.userRepo.findOneBy({ id });
    if (!user) {
      throw new Error('Usuario no encontrado');
    }
    return user;
  }

  async findByUsername(username: string): Promise<User | undefined> {
    // Replace 'username' with the correct property name from your User entity, e.g., 'email' if that's what you want to search by
    const user = await this.userRepo.findOne({ where: { email: username } });
    return user === null ? undefined : user;
  }

  async create(userData: CreateUserDto): Promise<User> {
    const user = this.userRepo.create(userData);
    return this.userRepo.save(user);
  }
}
