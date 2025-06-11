import { Entity, PrimaryGeneratedColumn, Column, ManyToOne, CreateDateColumn, Unique } from 'typeorm';
import { Movie } from '../movies/movies.entity';
import { User } from '../users/users.entity';

@Entity()
@Unique(['user', 'movie']) // Esto evita duplicados
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

