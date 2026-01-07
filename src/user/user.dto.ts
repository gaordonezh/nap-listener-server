import { IsOptional, IsString, IsMongoId, IsNotEmpty, IsEnum, ArrayNotEmpty, IsArray, IsEmail } from 'class-validator';
import { UserRolesEnum } from './user.enum';

export class UpdateParamUserDto {
  @IsMongoId()
  @IsString()
  user: string;
}

export class UserFiltersDto {
  @IsOptional()
  @IsMongoId()
  user: string;
}

export class UserBodyDto {
  @IsNotEmpty()
  @IsString()
  name: string;

  @IsNotEmpty()
  @IsString()
  lastname: string;

  @IsArray()
  @ArrayNotEmpty()
  @IsEnum(UserRolesEnum, { each: true })
  roles: Array<UserRolesEnum>;

  @IsOptional()
  @IsString()
  username: string;

  @IsOptional()
  @IsString()
  password: string;
}
