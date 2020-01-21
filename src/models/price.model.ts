import {Column, Entity, ManyToMany, ManyToOne} from 'typeorm';
import {DefaultEntity} from './template.model';
import PriceType from './price-type.model';
import Product from './product.model';

@Entity('price')
export default class Price extends DefaultEntity {
  @Column({nullable: false})
  value!: number;

  @ManyToOne((type) => PriceType, (priceType) => priceType.prices, {nullable: false, cascade: true})
  priceType!: PriceType;

  @ManyToOne((type) => Product, (product) => product.prices, {nullable: false, cascade: true})
  product!: Product;
}
