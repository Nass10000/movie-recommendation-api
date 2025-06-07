// users.entity.ts
import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  CreateDateColumn,
  UpdateDateColumn,
} from 'typeorm';
import { UserRole } from '../common/role.enum';

@Entity('users')
export class User {
  @PrimaryGeneratedColumn('uuid')
  id!: string;

  @Column({ unique: true, length: 20 }) // 👈 agrega esto
  username!: string;

  @Column({ length: 100 })
  fullName!: string;

  @Column({ unique: true })
  email!: string;


  @Column({ select: false }) 
  password!: string;

  @Column({ type: 'enum', enum: UserRole, default: UserRole.USER })
  role!: UserRole;

  @CreateDateColumn()
  createdAt!: Date;

  @UpdateDateColumn()
  updatedAt!: Date;
}
