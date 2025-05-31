import { Entity, PrimaryGeneratedColumn, Column, OneToMany } from 'typeorm';
import { Comment } from '../comments/ comments.entity';

@Entity()
export class Movie {
 @PrimaryGeneratedColumn('uuid')
id!: string;


  @Column()
  title!: string;

  @Column()
  description!: string;

  @Column()
  genre!: string;

  @Column({ nullable: true })
  imageUrl!: string;

  @OneToMany(() => Comment, (comment) => comment.movie)
  comments!: Comment[];
}
