import {
  PrimaryGeneratedColumn,
  Generated,
  Column,
  CreateDateColumn,
  UpdateDateColumn,
  ObjectLiteral
} from 'typeorm';

export abstract class EntityDb implements ObjectLiteral {
  @PrimaryGeneratedColumn('increment', {
    name: 'id'
  })
  public id: number | undefined;

  @Generated('uuid')
  @Column({
    type: 'varchar',
    length: 36
  })
  public uuid: string | undefined;

  @CreateDateColumn({
    name: 'created_at'
  })
  public created_at: Date | undefined;

  @UpdateDateColumn({
    name: 'updated_at'
  })
  public updated_at: Date | undefined;

  @Column({
    name: 'deleted_at',
    type: 'date',
    nullable: true
  })
  public deleted_at: Date | undefined;
}
