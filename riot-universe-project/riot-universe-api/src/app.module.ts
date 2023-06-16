import { ValorantCharacterApiModule } from './modules/valorant/valorant-character-api/valorant-character-api.module';
import { Module } from '@nestjs/common';
require('dotenv').config();
import { ValorantController } from './modules/valorant/valorant-character-api/controllers/valorant.controller';
import { MongooseModule } from '@nestjs/mongoose';
import { LolCharacterModule } from './modules/lol/lol-character-api/lol.module';
import { LolCharacterController } from './modules/lol/lol-character-api/controller/lol-character.controller';

@Module({
  imports: [
    ValorantCharacterApiModule,
    LolCharacterModule,
    MongooseModule.forRoot(`${process.env.MONGO_URI}`)
  ],
  controllers: [ValorantController, LolCharacterController],
  providers: [],
})
export class AppModule { }
