import { Module } from '@nestjs/common';
import { EventsGateway } from './events.gateway';
import { EventsService } from './events.service';
import { EventsController } from './events.controllet';
import { TypegooseModule } from 'nestjs-typegoose';
import { Event } from './events.model';

@Module({
  imports: [TypegooseModule.forFeature([Event])],
  controllers: [EventsController],
  providers: [EventsGateway, EventsService],
})
export class EventsModule {}
