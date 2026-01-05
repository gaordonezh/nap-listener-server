import { Body, Controller, Get, Post, Query } from '@nestjs/common';
import { EventsService } from './events.service';
import {
  GetEventsParamsDto,
  CreateEventBodyDto,
  RawDataBodyDto,
} from './events.dto';
import { EventsGateway } from './events.gateway';

@Controller('events')
export class EventsController {
  constructor(
    private readonly eventsService: EventsService,
    private readonly eventsGateway: EventsGateway,
  ) {}

  @Get()
  getEvents(@Query() params: GetEventsParamsDto) {
    return this.eventsService.getEvents(params);
  }

  @Post()
  createEvent(@Body() data: Array<RawDataBodyDto>) {
    const formatted: Array<CreateEventBodyDto> = data
      .map((item) => ({
        title: item.title,
        description: item.text,
        package: item.packageName,
        datetime: new Date(item.timestamp),
        room: 'default_room',
      }))
      .filter((item) => !!item.title && !!item.description);

    return this.eventsGateway.handleExternalCreate(formatted);
  }
}
