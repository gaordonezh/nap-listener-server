import { Body, Controller, Get, Post, Query, UseGuards } from '@nestjs/common';
import { EventsService } from './events.service';
import { GetEventsParamsDto, CreateEventBodyDto, RawDataBodyDto } from './events.dto';
import { EventsGateway } from './events.gateway';
import { parseYapeTextContent } from 'src/utils/functions';
import { JwtAuthGuard } from 'src/auth/jwt-auth.guard';

@Controller('events')
export class EventsController {
  constructor(
    private readonly eventsService: EventsService,
    private readonly eventsGateway: EventsGateway,
  ) {}

  @UseGuards(JwtAuthGuard)
  @Get()
  getEvents(@Query() params: GetEventsParamsDto) {
    return this.eventsService.getEvents(params);
  }

  @Post()
  createEvent(@Body() data: Array<RawDataBodyDto>) {
    const formatted: Array<CreateEventBodyDto> = data
      .filter((item) => !!item.title && !!item.text && !!item.phone)
      .map((item) => {
        const sender = parseYapeTextContent(item.text, 0, 'te envió');
        const rawAmount = parseYapeTextContent(item.text, 'S/ ', '. El cód.');
        const amount = Number.isNaN(Number.parseFloat(rawAmount)) ? 0 : Number.parseFloat(rawAmount);
        const securityCode = parseYapeTextContent(item.text, 'seguridad es: ', item.text.length);

        return {
          title: item.title,
          description: item.text,
          package: item.packageName,
          datetime: new Date(item.timestamp),
          room: item.phone,
          sender,
          amount,
          securityCode,
        };
      });

    return this.eventsGateway.handleExternalCreate(formatted);
  }
}
