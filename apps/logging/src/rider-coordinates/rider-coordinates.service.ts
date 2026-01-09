import { Inject, Injectable } from '@nestjs/common';
import { CraeteCoordinatesDTO } from './dto/create-coordinates.dto';
import { InjectModel } from '@nestjs/mongoose';
import { RiderCoordinate } from './scemas/rider-coordinates.schema';
import { Model } from 'mongoose';
import { ClientProxy } from '@nestjs/microservices';
import { firstValueFrom } from 'rxjs';

@Injectable()
export class RiderCoordinatesService {
  constructor(
    @InjectModel(RiderCoordinate.name)
    private riderCoordinateModel: Model<RiderCoordinate>,
    @Inject('RIDER_SERVICE') private readonly client: ClientProxy,
  ) {}

  async saveRiderCoordinate(craeteCoordinatesDTO: CraeteCoordinatesDTO) {
    return this.riderCoordinateModel.create(craeteCoordinatesDTO);
  }

  async getRiderCoordinates(riderId: string) {
    const coordinates = await this.riderCoordinateModel.find({
      rider: riderId,
    });
    
    if (coordinates.length === 0) { 
      return { message: 'No coordinates found for this rider.' };
    };
    const pattern = { cmd: 'get-rider' };
    const payload = { id: riderId };
    const rider = await firstValueFrom(this.client.send(pattern, payload));
    return { coordinates, rider };
  }
}
