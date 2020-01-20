import {Column, Entity, OneToMany} from 'typeorm';
import {DefaultEntity} from './template.model';
import UserGroup from './user-group.model';

@Entity('company')
export default class Company extends DefaultEntity {
  @Column({unique: true})
  name!: string;

  @OneToMany((type) => UserGroup, (userGroup) => userGroup.company)
  userGroups?: UserGroup[];
}
