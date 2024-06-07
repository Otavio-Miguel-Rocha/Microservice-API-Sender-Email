import { Module } from '@nestjs/common';
import { KafkaService } from './kafka.service';
import { KafkaController } from './kafka.controller';
import { ClientsModule } from '@nestjs/microservices';
import { kafkaConfig } from './kafka.config';
@Module({
  imports: [
    ClientsModule.register([
      {
        name: 'KAFKA_SERVICE',
        ...kafkaConfig,
      },
    ]),
  ],
  providers: [KafkaService],

  controllers:[KafkaController],
  exports: [KafkaService],
})
export class KafkaModule {}
