import {
  Entity,
  PrimaryGeneratedColumn,
  CreateDateColumn,
  UpdateDateColumn,
  ManyToOne,
  JoinColumn,
} from 'typeorm';
import { users } from './users';
import { posts } from './posts';

@Entity()
export class likes {
  @PrimaryGeneratedColumn()
  id: number;

  @CreateDateColumn()
  created_at: Date;

  @UpdateDateColumn()
  updated_at: Date;

  @ManyToOne((type) => users)
  @JoinColumn({
    name: 'users_id',
    referencedColumnName: 'id',
  })
  users: users;

  @ManyToOne((type) => posts)
  @JoinColumn({
    name: 'posts_id',
    referencedColumnName: 'id',
  })
  posts: posts;
}
