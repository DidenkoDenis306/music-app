import { Table, Column, Model, DataType, HasMany } from 'sequelize-typescript';
import { Comment } from './comment.model';

@Table({
  tableName: 'tracks',
})
export class Track extends Model<Track> {
  @Column({
    type: DataType.INTEGER,
    allowNull: false,
    primaryKey: true,
    autoIncrement: true,
  })
  id: number;

  @Column({
    type: DataType.STRING,
    allowNull: false,
  })
  name: string;

  @Column({
    type: DataType.STRING,
    allowNull: false,
  })
  artist: string;

  @Column({
    type: DataType.STRING,
    allowNull: false,
  })
  text: string;

  @Column({
    type: DataType.INTEGER,
    allowNull: false,
  })
  listens: number;

  @Column({
    type: DataType.STRING,
    allowNull: false,
  })
  picture: string;

  @Column({
    type: DataType.STRING,
    allowNull: false,
  })
  audio: string;

  @HasMany(() => Comment)
  comments: Comment[];
}
