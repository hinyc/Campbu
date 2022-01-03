import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  CreateDateColumn,
  UpdateDateColumn,
  OneToMany,
  ManyToOne,
  JoinColumn,
} from 'typeorm';
import { likes } from './likes';
import { reservation } from './reservation';
import { users } from './users';

@Entity()
export class posts {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  category: string;

  @Column()
  deposit: number;

  @Column()
  rental_fee: number;

  @Column('simple-array')
  unavailable_dates: string[];

  @Column()
  title: string;

  @Column()
  content: string;

  @Column()
  longitude: number;

  @Column()
  latitude: number;

  @Column()
  address: string;

  @Column('simple-array')
  img_urls: string[];

  @CreateDateColumn()
  created_at: Date;

  @UpdateDateColumn()
  updated_at: Date;

  @OneToMany((type) => likes, (likes) => likes.posts)
  likes: likes[];

  @OneToMany((type) => reservation, (reservation) => reservation.posts)
  reservation: reservation[];

  @ManyToOne((type) => users)
  @JoinColumn({
    name: 'users_id',
    referencedColumnName: 'id',
  })
  users: users;
}
