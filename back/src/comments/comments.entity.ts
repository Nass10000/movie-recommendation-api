import { Entity, PrimaryGeneratedColumn, Column, ManyToOne, CreateDateColumn } from 'typeorm';
import { Movie } from '../movies/movies.entity';
import { User } from '../users/users.entity';

@Entity()
export class Comment {
  @PrimaryGeneratedColumn('uuid')
  id!: string;

  @Column()
  content!: string;

  @Column({ nullable: true })
  sentiment!: string;

  @Column({ type: 'int', nullable: true })
  rating?: number;

  @ManyToOne(() => User, { nullable: true, eager: true, onDelete: 'SET NULL' })
  user?: User;

  @ManyToOne(() => Movie, (movie: Movie) => movie.comments, { onDelete: 'CASCADE' })
  movie!: Movie;

  @CreateDateColumn()
  createdAt!: Date;
}

