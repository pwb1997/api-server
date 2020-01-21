import {Column, Entity, JoinTable, ManyToMany, ManyToOne, OneToMany} from 'typeorm';
import {DefaultEntity} from './template.model';
import Product from './product.model';
import ProductFolderAccess from './product-folder-access';

@Entity('productFolder')
export default class ProductFolder extends DefaultEntity {
  @Column({nullable: false})
  name!: string;

  @ManyToMany((type) => Product, (product) => product.folders)
  @JoinTable({name: 'productFolderItem'})
  products?: Product[];

  @ManyToOne((type) => ProductFolder, (productFolder) => productFolder.children, {nullable: true, cascade: true})
  parent?: ProductFolder;

  @OneToMany((type) => ProductFolderAccess, (productFolderAccess) => productFolderAccess.productFolder)
  userGroupAccess!: ProductFolderAccess[];

  @OneToMany((type) => ProductFolder, (productFolder) => productFolder.parent)
  children?: ProductFolder[]
};
