import { Module } from '@nestjs/common';
import { TypegooseModule } from 'nestjs-typegoose';
import { User } from './user.model';
import { UserController } from './user.controller';
import { UserService } from './user.service';
import InitialConfig from 'src/utils/initialConfig';

@Module({
  imports: [TypegooseModule.forFeature([User])],
  controllers: [UserController],
  providers: [UserService, InitialConfig],
})
export class UserModule {}
