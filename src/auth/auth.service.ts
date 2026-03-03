import {
  CanActivate,
  ExecutionContext,
  HttpException,
  HttpStatus,
  Injectable,
  UnauthorizedException,
} from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { UsersService } from '../modules/users/users.service';
import { AuthLoginDto } from './dto/auth-login.dto';
import { User } from '../modules/users/entities/user.entity';


@Injectable()
export class AuthService implements CanActivate {
  constructor(
    private userService: UsersService,
    private jwtService: JwtService,
  ) {}

  async canActivate(ctx: ExecutionContext): Promise<boolean> {
    return true;
  }

  async login(authLoginDto: AuthLoginDto) {
    const user = await this.validateUser(authLoginDto);

    delete user.password;

    const payload = {
      userId: user.id,
      is_active: user.is_active,
    };

    return {
      access_token: this.jwtService.sign(payload),
      user,
    };
  }

  async validateUser(authLoginDto: AuthLoginDto): Promise<User> {
    const { email, password } = authLoginDto;

    const user = await this.userService.findByEmail(email);

    if (!(await user?.validatePassword(password))) {
      throw new UnauthorizedException();
    }

    if (!user.is_active) {
      throw new UnauthorizedException();
    }

    return user;
  }


  // async validateToken(email: string, token: string): Promise<boolean> {
  //   if (email && token) {
  //     const user = await this.userService.findByEmail(email);
  //     if (token !== user.token || !user.token) {
  //       throw new HttpException('INVALID_TOKEN', HttpStatus.FORBIDDEN);
  //     } else if (moment().subtract(24, 'hours').isAfter(user.token_created_at)) {
  //       throw new HttpException('EXPIRED_TOKEN', HttpStatus.FORBIDDEN);
  //     }

  //     return true;
  //   }
  //   throw new HttpException('MISSING_FIELDS', HttpStatus.PARTIAL_CONTENT);
  // }

}
