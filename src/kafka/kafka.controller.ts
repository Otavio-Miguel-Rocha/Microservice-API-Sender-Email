import { Body, Controller, Inject, OnModuleInit, Post } from '@nestjs/common';
import { KafkaService } from './kafka.service';
import { ClientKafka, EventPattern, Payload, Transport } from '@nestjs/microservices';

@Controller('kafka')
export class KafkaController {
    constructor(private readonly kafkaService: KafkaService) {}

    // async onModuleInit() {
    //   this.kafkaService.consumeMessages('test-topic', (message) => {
    //     console.log(`Received message: ${message.value.toString()}`);
    //   });
    // }
  
    @Post()
    async produceMessage(@Body('message') message: string) {
      await this.kafkaService.sendMessage('test-topic', { value: message });
      console.log(message);
      return { message: 'Message sent to Kafka' };
    }

    @EventPattern('test-topic', Transport.KAFKA)
    handleEvent(
        @Payload() payload: any,
    ): void {
        console.log(payload);
        
    }
}
