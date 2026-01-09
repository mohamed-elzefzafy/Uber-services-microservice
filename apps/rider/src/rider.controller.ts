import { Controller, Get, Param } from '@nestjs/common';
import { RiderService } from './rider.service';
import e from 'express';
import { MessagePattern } from '@nestjs/microservices';

@Controller('rider')
export class RiderController {
  constructor(private readonly riderService: RiderService) {}

  // @Get(":id")
  @MessagePattern({ cmd: 'get-rider' })
  async getRiderById(data: any) {
    return Promise.resolve({
      _id: data.id,
      name: 'Rider Name',
      lastname: 'Rider Lastname',
      email: 'joun@gmail.com',
    });
  }
}
