import {BaseEntity, Column, Entity, ManyToOne, Unique} from 'typeorm';
import ProductFolder from './product-folder';
import UserGroup from './user-group.model';

export enum ProductFolderAccessType {
  VIEW = 'view',
  EDIT = 'edit',
  DELETE = 'delete'
}

@Entity('productFolderAccess')
@Unique(['userGroup', 'productFolder'])
export default class ProductFolderAccess extends BaseEntity {
  @Column({nullable: false, type: 'enum', enum: ProductFolderAccessType})
  type!: ProductFolderAccessType;

  @ManyToOne((type) => UserGroup, (userGroup) => userGroup.productFolderAccess, {primary: true, onDelete: 'CASCADE', onUpdate: 'CASCADE'})
  userGroup!: UserGroup;

  @ManyToOne((type) => ProductFolder, (productFolder) => productFolder.userGroupAccess, {primary: true, onDelete: 'CASCADE', onUpdate: 'CASCADE'})
  productFolder!: ProductFolder;
}
