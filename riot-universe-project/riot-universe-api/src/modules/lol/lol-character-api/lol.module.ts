import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { LolCharacterController } from './controller/lol-character.controller';
import { HeroRepository as LolCharacterRepository } from './repository/lol-character.repository';
import { LolHero, LolCharacterSchema } from './schemas/lol.schema';
import { LolCharacterService } from './services/lol-character.service';

const MODELS = MongooseModule.forFeature([
    {
      name: LolHero.name,
      schema: LolCharacterSchema,
    },
  ]);

@Module({
    imports: [MODELS],
    controllers: [LolCharacterController],
    providers: [LolCharacterService, LolCharacterRepository],
    exports: [LolCharacterService, LolCharacterRepository ]
})
export class LolCharacterModule {}
