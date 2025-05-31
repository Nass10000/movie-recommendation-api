import { Entity, PrimaryGeneratedColumn, Column, ManyToOne } from 'typeorm';
import { Movie } from '../movies/movies.entity';

@Entity()
export class Comment {
  @PrimaryGeneratedColumn('uuid')
  id!: string;

  @Column()
  content!: string;

  @Column()
  author!: string;

  @ManyToOne(() => Movie, (movie: Movie) => movie.comments, { onDelete: 'CASCADE' })
  movie!: Movie;
}
