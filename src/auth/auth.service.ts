import { BadRequestException, Inject, Injectable, UnauthorizedException } from '@nestjs/common';

import { JwtService } from '@nestjs/jwt';
import { LoginInput } from './dto/input/login.input';
import { checkPassword, hashPassword } from '@common/helpers/password';
import { AuthResponse } from './dto/responses/auth.response';
import { RegisterInput } from './dto/input/register.input';
import { UserRole } from '@common/enums';
import { InjectRepository } from '@nestjs/typeorm';
import { User } from '@common/entities';
import { Repository } from 'typeorm';

@Injectable()
export class AuthService {
  constructor(
    private jwtService: JwtService,
    @InjectRepository(User) private readonly userModel: Repository<User>,
  ) { }
  async login(input: LoginInput): Promise<AuthResponse> {
    const user = await this.userModel.findOne({ where: { email: input.email } });
    if (!user || !(await checkPassword(input.password, user.password))) {
      throw new UnauthorizedException('invalid credentials');
    }

    const accessToken = this.jwtService.sign({
      id: user.id,
      role: user.role,
    });

    return {
      user,
      accessToken,
    };
  }
  async register(input: RegisterInput): Promise<AuthResponse> {
    let user = await this.userModel.findOne({ where: { email: input.email } });


    if (user) {
      throw new BadRequestException('email already exists')
    }

    user  = await this.userModel.save({
      email: input.email,
      password: hashPassword(input.password),
      role: UserRole.Employee
    })

    if(!user) {
      throw new BadRequestException('failed to create user')
    }

    const accessToken = this.jwtService.sign({
      id: user.id,
      role: user.role
    })

    return {
      user,
      accessToken
    }
  }

  async profile(id: string) {
   const user = await this.userModel.findOne({ where: { id } })

      if (!user ) {
      throw new UnauthorizedException('invalid credentials')
    }

    return user
  }

}
