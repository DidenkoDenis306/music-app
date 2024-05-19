import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/sequelize';
import { Track } from './models/track.model';
import { Comment } from './models/comment.model';
import { CreateTrackDto } from './dto/create-track.dto';
import { CreateCommentDto } from './dto/create-comment.dto';
import { FileService, FileType } from 'src/file/file.service';
import { Op } from 'sequelize';

@Injectable()
export class TrackService {
  constructor(
    @InjectModel(Track) private trackModel: typeof Track,
    @InjectModel(Comment) private commentModel: typeof Comment,
    private fileService: FileService
  ) {}

  async create(dto: CreateTrackDto, picture, audio): Promise<Track> {
    const audioPath = this.fileService.createFile(FileType.AUDIO, audio);
    const picturePath = this.fileService.createFile(FileType.IMAGE, picture);

    const track = await this.trackModel.create({
      ...dto,
      listens: 0,
      audio: audioPath,
      picture: picturePath,
    });

    return track;
  }

  async getAll(count = 50, offset = 0): Promise<Track[]> {
    const tracks = await this.trackModel.findAll({ offset, limit: count });

    return tracks;
  }

  async search(query: string): Promise<Track[]> {
    const tracks = await this.trackModel.findAll({
      where: { name: { [Op.iLike]: `%${query}%` } },
    });

    return tracks;
  }

  async getOne(id: number): Promise<Track> {
    const track = await this.trackModel.findByPk(id, { include: [Comment] });

    return track;
  }

  async delete(id: number): Promise<number> {
    const track = await this.trackModel.findByPk(id);

    await this.fileService.removeFile(track.audio);
    await this.fileService.removeFile(track.picture);

    await track.destroy();

    return id;
  }

  async addComment(dto: CreateCommentDto): Promise<Comment> {
    const track = await this.trackModel.findByPk(dto.trackId);
    const comment = await this.commentModel.create({ ...dto });

    track.comments.push(comment);
    await track.save();

    return comment;
  }

  async listen(id: number) {
    const track = await this.trackModel.findByPk(id);

    track.listens++;
    await track.save();
  }
}
