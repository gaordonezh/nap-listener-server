import { InjectModel } from '@nestjs/mongoose';
import { BadRequestException, Injectable, Logger } from '@nestjs/common';
import { Model } from 'mongoose';
import { Client } from './clients.model';
import { ClientBodyDto, ClientQueryParamsDto } from './clients.dto';

@Injectable()
export class ClientsService {
  constructor(@InjectModel(Client.name) private clientModel: Model<Client>) {}

  private readonly logger = new Logger(Client.name);

  async getClientByPhone(phone: string): Promise<Client> {
    if (!phone || phone.length !== 9) return null;

    const finder = await this.clientModel.findOne({ phone });
    if (!finder) return null;

    return finder;
  }

  getClients(params: ClientQueryParamsDto): Promise<Array<Client>> {
    const { clientId, phone } = params;

    const query: Record<string, string> = {};
    if (clientId) query._id = clientId;
    if (phone) query.phone = phone;

    return this.clientModel.find(query);
  }

  createClient(body: ClientBodyDto): Promise<Client> {
    try {
      return this.clientModel.create(body);
    } catch (error) {
      this.logger.error(error);
      throw new BadRequestException(error);
    }
  }

  async updateClient(clientId: string, body: ClientBodyDto): Promise<boolean> {
    try {
      await this.clientModel.findByIdAndUpdate(clientId, body);
      return true;
    } catch (error) {
      this.logger.debug(error);
      return false;
    }
  }
}
