import { Controller, Post, Body, Delete, HttpCode, Param, Put, Query, Get, UseGuards } from '@nestjs/common';
import { UserService } from './user.service';
import { UserBodyDto, UserFiltersDto, UpdateParamUserDto } from './user.dto';
import { JwtAuthGuard } from 'src/auth/jwt-auth.guard';

@UseGuards(JwtAuthGuard)
@Controller('users')
export class UserController {
  constructor(private readonly userService: UserService) {}

  @Get()
  listUsers(@Query() filters: UserFiltersDto) {
    return this.userService.getUsers(filters);
  }

  @HttpCode(201)
  @Post()
  createUser(@Body() body: UserBodyDto) {
    return this.userService.createUser(body);
  }

  @Put(':user')
  updateOne(@Param() params: UpdateParamUserDto, @Body() body: UserBodyDto) {
    return this.userService.updateUser(params, body);
  }

  @Delete(':user')
  deleteOne(@Param() params: UpdateParamUserDto) {
    return this.userService.deleteUser(params);
  }
}
