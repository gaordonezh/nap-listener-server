import { Module } from '@nestjs/common';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { TypegooseModule } from 'nestjs-typegoose';
import { EventsModule } from './events/events.module';
import { ClientsModule } from './clients/clients.module';

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
      envFilePath: '.env',
    }),
    TypegooseModule.forRootAsync({
      imports: [ConfigModule],
      inject: [ConfigService],
      useFactory: async (config: ConfigService) => ({
        uri: config.get('APP_MONGO_URI')!,
      }),
    }),
    EventsModule,
    ClientsModule,
  ],
  controllers: [],
  providers: [],
})
export class AppModule {}
