import { Module } from '@nestjs/common';
import { TrackController } from './track.controller';
import { TrackService } from './track.service';
import { SequelizeModule } from '@nestjs/sequelize';
import { FileService } from 'src/file/file.service';
import { Track } from './models/track.model';
import { Comment } from './models/comment.model';

@Module({
  imports: [SequelizeModule.forFeature([Track, Comment])],
  controllers: [TrackController],
  providers: [TrackService, FileService],
})
export class TrackModule {}
