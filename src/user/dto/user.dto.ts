import { IsEmail, IsNotEmpty } from 'class-validator';

export class CreateUserDto {
  @IsNotEmpty({ message: 'Cannot use Empty name!' })
  name: string;

  @IsEmail()
  email: string;

  password: string;
}
