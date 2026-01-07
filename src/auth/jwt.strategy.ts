import { PassportStrategy } from '@nestjs/passport';
import { Injectable } from '@nestjs/common';
import { ExtractJwt, Strategy } from 'passport-jwt';
import { JWT_SECRET_SEED } from './auth.secret-seed';

@Injectable()
export class JwtStrategy extends PassportStrategy(Strategy) {
  constructor() {
    super({
      jwtFromRequest: ExtractJwt.fromExtractors([ExtractJwt.fromAuthHeaderAsBearerToken()]),
      ignoreExpiration: false,
      secretOrKey: JWT_SECRET_SEED.secret,
    });
  }

  async validate(payload: string): Promise<{ userId: string }> {
    return { userId: payload };
  }
}
