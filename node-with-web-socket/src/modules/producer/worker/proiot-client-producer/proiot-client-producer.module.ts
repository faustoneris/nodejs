import { Module } from "@nestjs/common";
import { ProiotClientProducer } from "./proiot-client-producer";

@Module({
    providers: [ProiotClientProducer],
    exports: [ProiotClientProducer]
})
export class ProiotClientProducerModule {}