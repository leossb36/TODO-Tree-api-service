import { Inject, Injectable } from '@nestjs/common';
import { Repository } from 'typeorm';
import { CreateUserDto } from './dto/user.dto';
import { User } from './entities/user.entity';

@Injectable()
export class UserService {
  constructor(
    @Inject('USER_REPOSITORY')
    private readonly userRepository: Repository<User>,
  ) {}

  async getAll(): Promise<User[]> {
    return await this.userRepository.find();
  }

  async getById(id: number): Promise<User> {
    return await this.userRepository.findOne(id);
  }

  async findOne(username: string): Promise<User> {
    return await this.userRepository.findOne(username);
  }

  async getByEmail(email: string): Promise<User> {
    return await this.userRepository.findOne({ email });
  }

  async create(createUserDto: CreateUserDto): Promise<User> {
    const newUser = new User();

    newUser.name = createUserDto.name;
    newUser.email = createUserDto.email;
    newUser.password = createUserDto.password;
    newUser.isAdmin = false;

    const response = await this.userRepository.save(newUser);

    delete newUser.password;
    delete newUser.isAdmin;

    return response;
  }
}
