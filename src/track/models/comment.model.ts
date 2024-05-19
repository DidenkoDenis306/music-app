import {
  Table,
  Column,
  Model,
  ForeignKey,
  BelongsTo,
} from 'sequelize-typescript';
import { Track } from './track.model';

@Table({
  tableName: 'comments',
})
export class Comment extends Model<Comment> {
  @Column
  username: string;

  @Column
  text: string;

  @ForeignKey(() => Track)
  @Column
  trackId: number;

  @BelongsTo(() => Track)
  track: Track;
}
