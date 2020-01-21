import {Column, Entity, JoinTable, ManyToMany, OneToMany, ManyToOne} from 'typeorm';
import {DefaultEntity} from './template.model';
import Product from './product.model';

@Entity('category')
export default class Category extends DefaultEntity {
  @Column({nullable: false})
  name!: string;

  @ManyToOne((type) => Category, (category) => category.children, {nullable: true, cascade: true})
  parent?: Category;

  @OneToMany((type) => Category, (category) => category.parent)
  children?: Category[];

  @ManyToMany((type) => Product, (product) => product.categories)
  products?: Product[];
}
