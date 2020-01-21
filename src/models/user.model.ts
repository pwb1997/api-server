import {Column, Entity, ManyToMany, ManyToOne, OneToMany} from 'typeorm';
import Archive from './archive.model';
import {DefaultEntity} from './template.model';
import Product from './product.model';
import UserGroup from './user-group.model';

@Entity('user')
export default class User extends DefaultEntity {
  @Column({unique: true, nullable: false})
  username!: string;

  @Column({nullable: false})
  password!: string;

  @ManyToOne((type) => UserGroup, (userGroup) => userGroup.users, {nullable: true, onDelete: 'SET NULL', onUpdate: 'CASCADE'})
  userGroup?: UserGroup;

  @OneToMany((type) => Archive, (archive) => archive.user)
  archives?: Archive[];

  @ManyToMany((type) => Product, (product) => product.interestedUsers)
  interest?: Product[];
}
