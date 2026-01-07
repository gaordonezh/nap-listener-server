import { Injectable, Logger } from '@nestjs/common';
import { HttpException, UnauthorizedException } from '@nestjs/common/exceptions';
import { compare } from 'bcrypt';
import { JwtService } from '@nestjs/jwt';
import { User } from 'src/user/user.model';
import { LoginAuthDto } from './auth.dto';
import { _QueryFilter, Model } from 'mongoose';
import { InjectModel } from '@nestjs/mongoose';

@Injectable()
export class AuthService {
  constructor(
    @InjectModel(User.name) private readonly usersModel: Model<User>,
    private readonly jwtAuthService: JwtService,
  ) {}

  private readonly logger = new Logger(AuthService.name);

  async login(userObject: LoginAuthDto) {
    const { username, password } = userObject;

    const { pass, user } = await this.findOrFail({ username, isActive: true });

    const checkPassword = await compare(password, pass);
    if (!checkPassword) throw new HttpException('USER_OR_PASSWORD_INCORRECT', 403);

    // @ts-expect-error _ID already exists
    const ID = user._id;

    const token = this.jwtAuthService.sign({ payload: ID });

    const data = { user, token };

    return data;
  }

  async check(rawToken: string): Promise<Partial<User>> {
    try {
      const [_, token] = rawToken.split(' ');
      const { payload } = await this.jwtAuthService.verify(token);

      const { user } = await this.findOrFail({ _id: payload, isActive: true });
      return user;
    } catch (error) {
      this.logger.debug(error);
      throw new UnauthorizedException();
    }
  }

  async findOrFail(condition: _QueryFilter<User>): Promise<{ pass: string; user: Partial<User> }> {
    const userFinder = await this.usersModel.findOne(condition).select('name lastname roles password');

    if (!userFinder) throw new UnauthorizedException();

    const userJson = userFinder.toObject();
    const { password, ...user } = userJson;

    return { pass: password, user };
  }
}
