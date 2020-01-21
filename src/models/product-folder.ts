import {Entity, JoinTable, ManyToMany, ManyToOne, OneToMany} from 'typeorm';
import {DefaultEntity} from './template.model';
import Product from './product.model';
import UserGroup from './user-group.model';

@Entity('productFolder')
export default class ProductFolder extends DefaultEntity {
  @ManyToMany((type) => Product, (product) => product.folders)
  @JoinTable({name: 'productFolder'})
  products?: Product[];

  @ManyToOne((type) => ProductFolder, (productFolder) => productFolder.children)
  parent?: ProductFolder;

  @OneToMany((type) => ProductFolder, (productFolder) => productFolder.parent)
  children?: ProductFolder[];
};
