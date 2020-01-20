import {BeforeInsert, BeforeUpdate, Column, Entity, JoinTable, ManyToMany, ManyToOne, OneToMany} from 'typeorm';
import assert, {AssertionError} from 'assert';
import Company from './company.model';
import Country from './country.model';
import {DefaultEntity} from './template.model';
import PriceType from './price-type.model';
import User from './user.model';

export enum UserGroupType {
  ADMIN = 'admin',
  BU = 'businessUnit',
}

@Entity('userGroup')
export default class UserGroup extends DefaultEntity {
  @Column({nullable: false, unique: true})
  name!: string;

  @Column({nullable: false, type: 'enum', enum: UserGroupType})
  type!: UserGroupType;

  @OneToMany((type) => User, (user) => user.userGroup)
  users?: User[];

  @ManyToOne((type) => Company, (company) => company.userGroups, {nullable: true, onDelete: 'CASCADE'})
  company?: Company;

  @ManyToOne((type) => Country, (country) => country.userGroups, {nullable: true, onDelete: 'CASCADE'})
  country?: Country;

  @ManyToMany((type) => PriceType, (priceType) => priceType.userGroups)
  @JoinTable({name: 'priceTypeAccess'})
  priceTypes?: PriceType[];

  @BeforeInsert()
  @BeforeUpdate()
  async validate() {
    try {
      if (this.type === UserGroupType.BU) {
        assert.notEqual(this.company, undefined);
        assert.notEqual(this.country, undefined);
      }
    } catch {
      throw new AssertionError({
        message: `company and country can't be null`,
      });
    }
  }
}
