import { Module } from '@nestjs/common';
import { AdminService } from './admin.service';
import { AdminController } from './admin.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Quote } from '@common/entities';

@Module({
  imports: [TypeOrmModule.forFeature([Quote])],
  controllers: [AdminController],
  providers: [AdminService],
})
export class AdminModule {}
