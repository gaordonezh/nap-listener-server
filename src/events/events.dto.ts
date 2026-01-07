import { IsDateString, IsNotEmpty, IsNumber, IsOptional, IsString, Length } from 'class-validator';

export class GetEventsParamsDto {
  @IsNotEmpty()
  @IsString()
  @Length(9, 9, { message: '9 dígitos' })
  room: string;
}

export class RawDataBodyDto {
  title: string;
  text: string;
  packageName: string;
  timestamp: number;
  phone: string;
}

export class SocketJoinParams {
  room: string;
  leave?: string;
}

export class CreateEventBodyDto {
  @IsNotEmpty()
  @IsString()
  room: string;

  @IsNotEmpty()
  @IsString()
  title: string;

  @IsNotEmpty()
  @IsString()
  description: string;

  @IsNotEmpty()
  @IsString()
  package: string;

  @IsNotEmpty()
  @IsDateString()
  datetime: Date;

  @IsNotEmpty()
  @IsString()
  sender: string;

  @IsNotEmpty()
  @IsNumber()
  amount: number;

  @IsNotEmpty()
  @IsString()
  securityCode: string;
}
