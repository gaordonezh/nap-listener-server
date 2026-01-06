import { Module } from '@nestjs/common';
import { TypegooseModule } from 'nestjs-typegoose';
import { Client } from './clients.model';
import { ClientsController } from './clients.controller';
import { ClientsService } from './clients.service';

@Module({
  imports: [TypegooseModule.forFeature([Client])],
  controllers: [ClientsController],
  providers: [ClientsService],
})
export class ClientsModule {}
