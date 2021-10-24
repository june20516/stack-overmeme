import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';

import { TypeOrmModule } from '@nestjs/typeorm';
import * as Joi from 'joi'

import { AppController } from './app.controller';
import { AppService } from './app.service';
import { MemesModule } from './memes/memes.module';
import { UsersModule } from './users/users.module';

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
      envFilePath: process.env.NODE_ENV === 'dev' ? '.env.dev' : '.env.test',
      ignoreEnvFile: process.env.NODE_ENV === 'prod', // prod할 때는 따로 넣기로
      validationSchema: Joi.object({ 
        NODE_ENV: Joi.string().valid('dev', 'prod').required(), 
        DB_HOST: Joi.string().required(), 
        DB_PORT: Joi.string().required(), 
        DB_USERNAME: Joi.string().required(), 
        DB_PASSWORD: Joi.string().required(), 
        DB_NAME: Joi.string().required(), 
      }),
    }),
    TypeOrmModule.forRoot(), 
    MemesModule, 
    UsersModule
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
