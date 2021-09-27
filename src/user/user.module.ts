import { Module } from '@nestjs/common';
import { DatabaseModule } from 'src/database/database.module';
import { Connection } from 'typeorm';
import { User } from './entities/user.entity';
import { UserController } from './user.controller';
import { UserService } from './user.service';

@Module({
  imports: [DatabaseModule],
  controllers: [UserController],
  exports: [UserService],
  providers: [
    {
      provide: 'USER_REPOSITORY',
      useFactory: (connection: Connection) => connection.getRepository(User),
      inject: ['DATABASE_CONNECTION'],
    },
    UserService,
  ],
})
export class UserModule {}
