import { Inject, Injectable } from '@nestjs/common';
import { Repository } from 'typeorm';
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

  async create(user: User): Promise<User> {
    const createdUser = await this.userRepository.create(user);

    const response = await this.userRepository.save(createdUser);

    return response;
  }
}
