import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { ValorantController } from './controllers/valorant.controller';
import { ValorantRepository } from './repository/valorant.repository';
import { ValorantCharacters, ValorantCharactersSchema } from './schemas/valorant.schema';
import { ValorantService } from './service/valorant.service';

const MODELS = MongooseModule.forFeature([
    {
      name: ValorantCharacters.name,
      schema: ValorantCharactersSchema,
    },
  ]);

@Module({
    imports: [MODELS],
    controllers: [ValorantController],
    providers: [ValorantService, ValorantRepository],
    exports: [ValorantService, ValorantRepository]
})
export class ValorantCharacterApiModule {}
