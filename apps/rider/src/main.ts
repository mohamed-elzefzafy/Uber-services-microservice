import { NestFactory } from '@nestjs/core';
import { RiderModule } from './rider.module';
import { MicroserviceOptions, Transport } from '@nestjs/microservices';

async function bootstrap() {
  // const app = await NestFactory.create(RiderModule);
  const app = await NestFactory.createMicroservice<MicroserviceOptions>(RiderModule, {
    transport: Transport.RMQ,
    options: {
      urls: ['amqp://guest:guest@localhost:5672'],
      queue: 'rider_queue',
      queueOptions: {
        durable: false
      },
    }
  });
  // await app.listen(process.env.port ?? 3001);
  await app.listen();
}
bootstrap();
