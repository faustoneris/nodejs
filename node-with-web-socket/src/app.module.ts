import { ProiotApplicationModule } from './modules/proiot-application/proiot-application.module';
import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import * as dotenv from 'dotenv'
dotenv.config()
@Module({
  imports: [
    ProiotApplicationModule,
    MongooseModule.forRoot(`${process.env.MONGO_URI}`)
  ],
  controllers: [],
  providers: [],
})
export class AppModule { }
