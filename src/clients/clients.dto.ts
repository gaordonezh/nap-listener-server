import { IsMongoId, IsNotEmpty, IsOptional, IsString, Length } from 'class-validator';

export class ClientQueryParamsDto {
  @IsOptional()
  @IsMongoId()
  clientId: string;

  @IsOptional()
  @IsString()
  @Length(9, 9, { message: '9 dìgitos' })
  phone: string;
}

export class ClientBodyDto {
  @IsNotEmpty()
  @IsString()
  name: string;

  @IsNotEmpty()
  @IsString()
  @Length(9, 9, { message: '9 dìgitos' })
  phone: string;
}

export class UpdateParamClientDto {
  @IsMongoId()
  @IsString()
  client: string;
}
