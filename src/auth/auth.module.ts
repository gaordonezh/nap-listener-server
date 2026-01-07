import { Module } from '@nestjs/common';
import { JwtModule } from '@nestjs/jwt';
import { TypegooseModule } from 'nestjs-typegoose';
import { AuthController } from './auth.controller';
import { AuthService } from './auth.service';
import { JwtStrategy } from './jwt.strategy';
import { JWT_SECRET_SEED } from './auth.secret-seed';
import { User } from 'src/user/user.model';

@Module({
  imports: [
    TypegooseModule.forFeature([User]),
    JwtModule.register({
      secret: JWT_SECRET_SEED.secret,
      signOptions: { expiresIn: '7d' },
    }),
  ],
  controllers: [AuthController],
  providers: [AuthService, JwtStrategy],
})
export class AuthModule {}
