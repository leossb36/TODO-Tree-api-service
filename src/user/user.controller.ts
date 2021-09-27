import { User } from './entities/user.entity';
import { UserService } from './user.service';
import { Controller, Get, Param, Body, Post, UseGuards } from '@nestjs/common';
import { ApiBearerAuth, ApiTags } from '@nestjs/swagger';
import { JwtAuthGuard } from 'src/commons/guards/jwt-auth.guard';
import { CreateUserDto } from './dto/user.dto';

@ApiTags('User')
@Controller('user')
@ApiBearerAuth()
export class UserController {
  constructor(private usersService: UserService) {}

  @Get()
  @UseGuards(JwtAuthGuard)
  async getAll(): Promise<User[]> {
    return this.usersService.getAll();
  }

  @Get(':id')
  @UseGuards(JwtAuthGuard)
  async getById(@Param('id') id: number): Promise<User> {
    return this.usersService.getById(id);
  }

  @Get(':email')
  @UseGuards(JwtAuthGuard)
  async findOne(@Param('email') email: string): Promise<User> {
    return this.usersService.getByEmail(email);
  }

  @Post()
  async create(@Body() createUserDto: CreateUserDto): Promise<User> {
    return this.usersService.create(createUserDto);
  }
}
