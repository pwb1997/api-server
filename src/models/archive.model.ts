import {Column, Entity, ManyToOne} from 'typeorm';
import {DefaultEntity} from './template.model';
import User from './user.model';

@Entity('archive')
export default class Archive extends DefaultEntity {
  @Column({nullable: false})
  name!: string;

  @Column({nullable: true})
  description?: string;

  @Column({nullable: false})
  numberProduct!: number;

  @ManyToOne((type) => User, (user) => user.archives, {nullable: false, cascade: true})
  user!: User;
}
