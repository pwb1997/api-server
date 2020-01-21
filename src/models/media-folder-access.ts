import {BaseEntity, Column, Entity, ManyToOne, Unique} from 'typeorm';
import MediaFolder from './media-folder.model';
import UserGroup from './user-group.model';

export enum MediaFolderAccessType {
  VIEW = 'view',
  EDIT = 'edit',
  DELETE = 'delete'
}

@Entity('mediaFolderAccess')
@Unique(['userGroup', 'mediaFolder'])
export default class MediaFolderAccess extends BaseEntity {
  @Column({nullable: false, type: 'enum', enum: MediaFolderAccessType})
  type!: MediaFolderAccessType;

  @ManyToOne((type) => UserGroup, (userGroup) => userGroup.mediaFolderAccess, {primary: true, cascade: true})
  userGroup!: UserGroup;

  @ManyToOne((type) => MediaFolder, (productFolder) => productFolder.userGroupAccess, {primary: true, cascade: true})
  mediaFolder!: MediaFolder;
}
