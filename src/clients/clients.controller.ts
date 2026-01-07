import { Body, Controller, Get, Param, Post, Put, Query, UseGuards } from '@nestjs/common';
import { ClientsService } from './clients.service';
import { ClientBodyDto, ClientQueryParamsDto, UpdateParamClientDto } from './clients.dto';
import { JwtAuthGuard } from 'src/auth/jwt-auth.guard';

@Controller('clients')
export class ClientsController {
  constructor(private readonly clientsService: ClientsService) {}

  @Get('/:phone')
  getClient(@Param('phone') phoneNumber: string) {
    return this.clientsService.getClientByPhone(phoneNumber);
  }

  @UseGuards(JwtAuthGuard)
  @Get()
  getClients(@Query() query: ClientQueryParamsDto) {
    return this.clientsService.getClients(query);
  }

  @UseGuards(JwtAuthGuard)
  @Post()
  createClient(@Body() data: ClientBodyDto) {
    return this.clientsService.createClient(data);
  }

  @UseGuards(JwtAuthGuard)
  @Put('/:client')
  updateClient(@Param() params: UpdateParamClientDto, @Body() data: ClientBodyDto) {
    return this.clientsService.updateClient(params.client, data);
  }
}
