import { IsNotEmpty, IsString, MaxLength, MinLength } from 'class-validator';

export class LoginAuthDto {
  @IsNotEmpty()
  @IsString()
  username: string;

  @IsNotEmpty()
  @MinLength(4)
  @MaxLength(12)
  password: string;
}

export class CheckTokenDto {
  @IsString()
  @IsNotEmpty()
  token: string;
}
