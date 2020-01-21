import {Column, Entity, JoinTable, ManyToMany, ManyToOne} from 'typeorm';
import {DefaultEntity} from './template.model';
import MediaFolder from './media-folder.model';
import Product from './product.model';

@Entity('media')
export default class Media extends DefaultEntity {
  @Column({nullable: false})
  name!: string;

  @ManyToOne((type) => MediaFolder, (mediaFolder) => mediaFolder.media, {nullable: false, cascade: true})
  folder!: MediaFolder;

  @ManyToMany((type) => Product, (product) => product.media)
  @JoinTable({name: 'productMedia'})
  ofProducts?: Product[];
};
