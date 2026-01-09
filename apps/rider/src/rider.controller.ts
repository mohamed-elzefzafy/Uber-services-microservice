import { Controller, Get, Param } from '@nestjs/common';
import { RiderService } from './rider.service';
import e from 'express';
import { Ctx, MessagePattern, Payload, RmqContext } from '@nestjs/microservices';

@Controller('rider')
export class RiderController {
  constructor(private readonly riderService: RiderService) {}

  // @Get(":id")
  @MessagePattern({ cmd: 'get-rider' })
  async getRiderById(@Payload() data: any, @Ctx() context : RmqContext) {
        console.log(`Pattern: ${context.getPattern()}`);
    console.log(`Message`, JSON.stringify(context.getMessage()));
    console.log('Channel', context.getChannelRef());
    return Promise.resolve({
      _id: data.id,
      name: 'Rider Name',
      lastname: 'Rider Lastname',
      email: 'joun@gmail.com',
    });
  }
}
