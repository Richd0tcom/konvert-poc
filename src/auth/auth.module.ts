import { Module } from '@nestjs/common';
import { AuthService } from './auth.service';
import { AuthController } from './auth.controller';
import { JwtModule } from '@nestjs/jwt';
import { PassportModule } from '@nestjs/passport';
import { JwtStrategy } from './strategy/jwt.strategy';
import { CasbinModule } from './casbin/casbin.module';
import { newEnforcer } from 'casbin';
import { join } from 'node:path';
import { TypeOrmModule } from '@nestjs/typeorm';
import { User } from '@common/entities';

@Module({
  imports: [
    PassportModule,
    JwtModule.registerAsync({
      useFactory: ()=>({
        secret: process.env.JWT_SECRET,
        signOptions: { expiresIn: '2hr' },
      })
    }
    ),
    CasbinModule.forRootAsync({
      useFactory: async () => {
        const enforcer = await newEnforcer('casbin.conf', 'casbin.csv');
        
        return { enforcer };
      },
    }),
    TypeOrmModule.forFeature([User])
  ],
  controllers: [AuthController],
  providers: [AuthService, JwtStrategy],
})
export class AuthModule {}
