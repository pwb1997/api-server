import {Column, Entity, OneToMany} from 'typeorm';
import {DefaultEntity} from './template.model';
import UserGroup from './user-group.model';

@Entity('country')
export default class Country extends DefaultEntity {
  @Column({unique: true})
  name!: string;

  @OneToMany((type) => UserGroup, (userGroup) => userGroup.country)
  userGroups?: UserGroup[];
}
