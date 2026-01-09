import { Body, Controller, Get, Param, Post } from '@nestjs/common';
import { CraeteCoordinatesDTO } from './dto/create-coordinates.dto';
import { RiderCoordinatesService } from './rider-coordinates.service';

@Controller('rider-coordinates')
export class RiderCoordinatesController {
  constructor(private readonly riderCoordinatesService : RiderCoordinatesService) {}
  @Get(":id")
  riderCoordinates(@Param() param : any) {
    return this.riderCoordinatesService.getRiderCoordinates(param.id);
  }

  @Post()
  saveRiderCoordinate(@Body() craeteCoordinatesDTO: CraeteCoordinatesDTO) {
    return this.riderCoordinatesService.saveRiderCoordinate(craeteCoordinatesDTO);
  }
}
