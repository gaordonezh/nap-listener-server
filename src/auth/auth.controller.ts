import { Body, Controller, Post, Headers, UnauthorizedException, UseGuards, HttpCode } from '@nestjs/common';
import { AuthService } from './auth.service';
import { LoginAuthDto } from './auth.dto';
import { JwtAuthGuard } from './jwt-auth.guard';

@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @HttpCode(200)
  @Post()
  loginUser(@Body() userObject: LoginAuthDto) {
    return this.authService.login(userObject);
  }

  @HttpCode(200)
  @UseGuards(JwtAuthGuard)
  @Post('validate')
  checkToken(@Headers('Authorization') token: string) {
    if (!token) throw new UnauthorizedException();
    return this.authService.check(token);
  }
}
