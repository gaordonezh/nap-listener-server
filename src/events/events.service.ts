import { InjectModel } from '@nestjs/mongoose';
import { Injectable } from '@nestjs/common';
import { Socket } from 'socket.io';
import { Model } from 'mongoose';
import { Event } from './events.model';
import { CreateEventBodyDto, GetEventsParamsDto } from './events.dto';

interface ConnectedClient {
  [id: string]: Socket;
}

@Injectable()
export class EventsService {
  constructor(@InjectModel(Event.name) private eventModel: Model<Event>) {}

  private connectedClient: ConnectedClient = {};

  registerClient(client: Socket) {
    this.connectedClient[client.id] = client;
  }

  getEvents(params: GetEventsParamsDto): Promise<Array<Event>> {
    return this.eventModel.find(params).sort({ datetime: -1 });
  }

  createEvent(body: CreateEventBodyDto): Promise<Event> {
    return this.eventModel.create(body);
  }

  createMassiveEvents(data: Array<CreateEventBodyDto>): Promise<Array<Event>> {
    return this.eventModel.insertMany(data);
  }
}
