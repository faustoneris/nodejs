import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { ProiotClientProducerModule } from '../producer/worker/proiot-client-producer/proiot-client-producer.module';


import { ProiotApplicationController } from './controllers/proiot-application.controller';
import { ProiotApplicationRepository } from './repositorys/proiot-application.repository';
import { ProiotApplication, ProiotApplicationSchema } from './schemas/proiot-application.schema';
import { ProiotApplicationService } from './services/proiot-application.service';


const MODELS = MongooseModule.forFeature([
    {
      name: ProiotApplication.name,
      schema: ProiotApplicationSchema,
    },
  ]);

@Module({
    imports: [MODELS, ProiotClientProducerModule],
    controllers: [ProiotApplicationController],
    providers: [ProiotApplicationRepository, ProiotApplicationService],
    exports: [ProiotApplicationRepository, ProiotApplicationService]
})
export class ProiotApplicationModule {}
