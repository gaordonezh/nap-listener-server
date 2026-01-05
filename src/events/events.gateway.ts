import {
  SubscribeMessage,
  WebSocketGateway,
  WebSocketServer,
} from '@nestjs/websockets';
import { Server, Socket } from 'socket.io';
import { SocketKeys } from './events.enum';
import { EventsService } from './events.service';
import { CreateEventBodyDto } from './events.dto';

@WebSocketGateway({
  cors: {
    origin: '*',
  },
})
export class EventsGateway {
  @WebSocketServer()
  server: Server;

  constructor(private readonly messageService: EventsService) {}

  handleDisconnect(client: Socket) {
    console.log('DISCONECTED');
  }

  handleConnection(client: Socket) {
    console.log('CONECTED');
    this.messageService.registerClient(client);
  }

  @SubscribeMessage(SocketKeys.JOIN)
  handleJoin(client: Socket, roomId: string) {
    // if (params.leave) client.leave(params.leave);
    this.server.socketsJoin(roomId);
  }

  @SubscribeMessage(SocketKeys.SEND)
  createEvent(client: Socket, body: CreateEventBodyDto) {
    this.server.to(body.room).emit(SocketKeys.LAST_MESSAGE, body);
    this.messageService.createEvent(body);
  }

  handleExternalCreate(body: Array<CreateEventBodyDto>) {
    const grouped: Record<string, Array<CreateEventBodyDto>> = {};

    body.forEach((item) => {
      if (!grouped[item.room]) grouped[item.room] = [];
      grouped[item.room].push(item);
    });

    Object.entries(grouped).forEach(async ([room, items]) => {
      this.server.to(room).emit(SocketKeys.MASSIVE_MESSAGES, items);
      this.messageService.createMassiveEvents(items);
    });
  }
}
