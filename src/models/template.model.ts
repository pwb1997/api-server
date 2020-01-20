import {BaseEntity, Column, CreateDateColumn, Entity, ManyToOne, OneToMany, PrimaryGeneratedColumn, Timestamp, UpdateDateColumn} from 'typeorm';

@Entity()
export class DefaultEntity extends BaseEntity {
  @PrimaryGeneratedColumn()
  id!: number;

  @CreateDateColumn()
  createdAt!: Timestamp;

  @UpdateDateColumn()
  updatedAt!: Timestamp;
};

@Entity()
export class FolderEntity extends DefaultEntity {
  @Column()
  name!: string;

  @ManyToOne((type) => FolderEntity, (folderEntity) => folderEntity.children)
  parent?: FolderEntity;

  @OneToMany((type) => FolderEntity, (FolderEntity) => FolderEntity.parent)
  children?: FolderEntity[];
}
