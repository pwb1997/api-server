import {Column, Entity, ManyToMany, OneToMany} from 'typeorm';
import {DefaultEntity} from './template.model';
import Price from './price.model';
import UserGroup from './user-group.model';

@Entity('priceType')
export default class PriceType extends DefaultEntity {
  @Column({nullable: false, unique: true})
  label!: string;

  @Column({nullable: false})
  symbol!: string;

  @ManyToMany((type) => UserGroup, (userGroup) => userGroup.priceTypes)
  userGroups?: UserGroup[];

  @OneToMany((type) => Price, (price) => price.priceType)
  prices?: Price[];
}
