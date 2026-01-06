import { Body, Controller, Get, Param, Post, Put, Query } from '@nestjs/common';
import { ClientsService } from './clients.service';
import {
  ClientBodyDto,
  ClientQueryParamsDto,
  UpdateParamClientDto,
} from './clients.dto';

@Controller('clients')
export class ClientsController {
  constructor(private readonly clientsService: ClientsService) {}

  @Get()
  getEvents(@Query() query: ClientQueryParamsDto) {
    return this.clientsService.getClients(query);
  }

  @Post()
  createEvent(@Body() data: ClientBodyDto) {
    return this.clientsService.createClient(data);
  }

  @Put('/:client')
  updateEvent(
    @Param() params: UpdateParamClientDto,
    @Body() data: ClientBodyDto,
  ) {
    return this.clientsService.updateClient(params.client, data);
  }
}
