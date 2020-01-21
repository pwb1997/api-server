import {Column, Entity, JoinTable, ManyToMany, ManyToOne, OneToMany} from 'typeorm';
import {DefaultEntity} from './template.model';
import Media from './media.model';
import MediaFolderAccess from './media-folder-access';

@Entity('mediaFolder')
export default class MediaFolder extends DefaultEntity {
  @Column({nullable: false})
  name!: string;

  @OneToMany((type) => Media, (media) => media.folder)
  media!: Media[];

  @ManyToOne((type) => MediaFolder, (mediaFolder) => mediaFolder.children, {nullable: true, cascade: true})
  parent?: MediaFolder;

  @OneToMany((type) => MediaFolder, (mediaFolder) => mediaFolder.parent)
  children?: MediaFolder[];

  @OneToMany((type) => MediaFolderAccess, (mediaFolerAccess) => mediaFolerAccess.mediaFolder)
  userGroupAccess?: MediaFolderAccess[];
};
