import { Inject, Injectable, OnModuleInit } from '@nestjs/common';
import { ClientKafka, EventPattern, Payload, Transport } from '@nestjs/microservices';
import { Kafka } from 'kafkajs';
import { kafkaConfig } from './kafka.config';
import { log } from 'console';

@Injectable()
export class KafkaService implements OnModuleInit {
  constructor(@Inject('KAFKA_SERVICE') private readonly client: ClientKafka) {}

  async onModuleInit() {
    await this.client.connect();
  }

  async sendMessage(topic: string, message: any) {
    this.client.emit(topic, message);
  }

}
