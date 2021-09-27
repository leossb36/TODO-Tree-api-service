import { Injectable } from '@nestjs/common';
import { UserService } from '../../user/user.service';
import { JwtService } from '@nestjs/jwt';
import { from, Observable } from 'rxjs';
import * as bcrypt from 'bcrypt';

@Injectable()
export class AuthService {
  constructor(
    private usersService: UserService,
    private jwtService: JwtService,
  ) {}

  async validateUser(userEmail: string, userPassword: string): Promise<any> {
    const user = await this.usersService.getByEmail(userEmail);
    if (user && user.password === userPassword) {
      const { id, name, email } = user;
      return { id, name, email };
    }
    return null;
  }

  async login(user: any) {
    const payload = { email: user.email, sub: user.id };
    return {
      access_token: this.jwtService.sign(payload),
    };
  }

  async hashPassword(password: string): Promise<Observable<string>> {
    return from<string>(await bcrypt.hash(password, 12));
  }

  async comparePassword(
    password: string,
    hashPassword: string,
  ): Promise<Observable<any>> {
    return from<any>(await bcrypt.compare(password, hashPassword));
  }
}
