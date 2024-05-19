import { Module } from '@nestjs/common';
import { TrackModule } from './track/track.module';
import { SequelizeModule } from '@nestjs/sequelize';
import { FileModule } from './file/file.module';
import { ServeStaticModule } from '@nestjs/serve-static';
import * as path from 'path';
import { AuthModule } from './auth/auth.module';
import { RolesModule } from './roles/roles.module';
import { UsersModule } from './users/users.module';
import { Role } from './roles/roles.model';
import { UserRoles } from './roles/user-roles.model';
import { User } from './users/users.model';

@Module({
  imports: [
    ServeStaticModule.forRoot({
      rootPath: path.resolve(__dirname, '..', 'uploads'),
    }),
    SequelizeModule.forRoot({
      dialect: 'postgres',
      host: process.env.POSTGRES_HOST,
      port: Number(process.env.POSTGRES_PORT),
      username: process.env.POSTGRES_USER,
      password: process.env.POSTGRES_PASSWORD,
      database: process.env.POSTGRES_DB,
      models: [User, Role, UserRoles],
      autoLoadModels: true,
    }),
    TrackModule,
    FileModule,
    UsersModule,
    RolesModule,
    AuthModule,
  ],
})
export class AppModule {}
