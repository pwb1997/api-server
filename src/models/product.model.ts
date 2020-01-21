import {Column, Entity, JoinTable, ManyToMany, OneToMany} from 'typeorm';
import {DefaultEntity} from './template.model';
import Media from './media.model';
import Price from './price.model';
import ProductFolder from './product-folder';
import User from './user.model';
import Category from './category.model';

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

  @ManyToMany((type) => Media, (media) => media.ofProducts)
  media?: Media[];

  @OneToMany((type) => Price, (price) => price.product)
  prices?: Price[];

  @ManyToMany((type) => Category, (category) => category.products)
  @JoinTable({name: 'productCategory'})
  categories?: Category[];
}
