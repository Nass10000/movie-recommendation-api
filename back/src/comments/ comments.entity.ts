import { Entity, PrimaryGeneratedColumn, Column, ManyToOne } from 'typeorm';
import { Movie } from '../movies/movies.entity';
import { User } from '../users/users.entity';

@Entity()
export class Comment {
  @PrimaryGeneratedColumn('uuid')
  id!: string;

  @Column()
  content!: string;

  @Column()
  author!: string;

@Column({ nullable: true })
sentiment!: string;

@ManyToOne(() => User, { nullable: true, eager: true }) // eager para que devuelva el user
user?: User;

  @ManyToOne(() => Movie, (movie: Movie) => movie.comments, { onDelete: 'CASCADE' })
  movie!: Movie;
}
