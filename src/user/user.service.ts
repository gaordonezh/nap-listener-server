import { BadRequestException, Injectable, Logger } from '@nestjs/common';
import { User } from './user.model';
import { UpdateParamUserDto, UserBodyDto, UserFiltersDto } from './user.dto';
import { hash } from 'bcrypt';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import InitialConfig from 'src/utils/initialConfig';

@Injectable()
export class UserService {
  constructor(
    @InjectModel(User.name) private usersModel: Model<User>,
    private readonly initialConfig: InitialConfig,
  ) {
    this.compileFirstRun();
  }

  private readonly logger = new Logger(UserService.name);

  async getUsers(params: UserFiltersDto): Promise<Array<User>> {
    const { user } = params;

    const filters: Record<string, unknown> = {
      isActive: true,
    };

    if (user) filters._id = user;

    return this.usersModel.find(filters).select('name lastname roles');
  }

  async createUser(body: UserBodyDto) {
    try {
      if (!body.password || !body.username) {
        throw new BadRequestException({}, 'PASSWORD AND USERNAME ARE REQUIRED');
      }

      body.password = await hash(body.password, 10);

      await this.usersModel.create(body);
      return { success: true };
    } catch (error) {
      this.logger.debug(error);
      return { success: false };
    }
  }

  async updateUser(params: UpdateParamUserDto, body: UserBodyDto) {
    try {
      await this.usersModel.findByIdAndUpdate(params.user, body);
      return { success: true };
    } catch (error) {
      this.logger.debug(error);
      return { success: false };
    }
  }

  async deleteUser(params: UpdateParamUserDto): Promise<boolean> {
    try {
      await this.usersModel.findByIdAndUpdate(params.user, { isActive: false });
      return true;
    } catch (error) {
      this.logger.debug(error);
      return false;
    }
  }

  compileFirstRun() {
    (async () => {
      try {
        const response = await this.usersModel.findOne({ isActive: true });
        if (response) return;
        this.logger.log('..:: START > Initial Config ::..');

        const userResponse = { ...this.initialConfig.globalUser() };
        const plainToHash = await hash(userResponse.password, 10);
        await this.usersModel.create({ ...userResponse, password: plainToHash });

        this.logger.log('..:: Global user was created ::..');
        this.logger.log(`USER: ${userResponse.username}`);
        this.logger.log(`PASSWORD: ${userResponse.password}`);
        this.logger.log('..:: END > Initial Config ::..');
      } catch (error) {
        this.logger.debug(error, '..:: ERROR > Initial Config ::..');
      }
    })();
  }
}
