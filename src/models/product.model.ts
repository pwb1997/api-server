import {Column, Entity, JoinTable, ManyToMany} from 'typeorm';
import {DefaultEntity} from './template.model';
import ProductFolder from './product-folder';
import User from './user.model';

@Entity('product')
export default class Product extends DefaultEntity {
  @Column({nullable: false, unique: true})
  reference!: string;

  @Column({nullable: true})
  name?: string;

  @Column({nullable: true, type: 'text'})
  description?: string;

  @Column({nullable: true})
  distance?: string;

  @Column({nullable: true})
  volume?: string;

  @Column({nullable: true})
  packaging?: string;

  @Column({nullable: true})
  size?: string;

  @Column({nullable: true})
  moq?: string;

  @Column({nullable: true})
  pcb?: string;

  @ManyToMany((type) => User, (user) => user.interest)
  @JoinTable({name: 'userInterest'})
  interestedUsers?: User[];

  @ManyToMany((type) => ProductFolder, (productFolder) => productFolder.products)
  folders?: ProductFolder[];
}
