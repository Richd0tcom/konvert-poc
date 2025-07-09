import { Controller, Get, Res, StreamableFile, UseFilters, UseGuards } from '@nestjs/common';
import { AdminService } from './admin.service';
import { Response } from 'express';
import { Readable } from 'stream';
import { ApiBearerAuth, ApiOkResponse, ApiProduces } from '@nestjs/swagger';
import { JwtAuthGuard } from 'src/auth/guards/jwt.guard';
import { HttpExceptionFilter } from '@common/filters/exception.filter';
import { CasbinGuard } from 'src/auth/guards/casbin.guard';
import { RequirePermission } from '@common/decorators/casbin.decorator';
import { ExcludeResponseInterceptor } from '@common/decorators/exclude-response.decorator';

@ApiBearerAuth()
@UseFilters(HttpExceptionFilter)
@UseGuards(CasbinGuard)
@UseGuards(JwtAuthGuard)
@Controller('admin')
export class AdminController {
  constructor(private readonly adminService: AdminService) { }


  @RequirePermission('quotes', 'read')
  @Get()
  findAll() {
    return this.adminService.findAll();
  }

  @ApiOkResponse({
    schema: {
      type: 'string',
      format: 'binary',
    },
  })
  @ApiProduces('text/csv')
  @ExcludeResponseInterceptor()
  @RequirePermission('files', 'create')
  @Get('export')
  async exportToCSV(@Res({ passthrough: true }) res: Response) {
    const csvString = await this.adminService.exportToCSV();
    const stream = Readable.from([csvString]);

    res.set({
      'Content-Type': 'text/csv',
      'Content-Disposition': 'attachment; filename="data.csv"',
    });

    return new StreamableFile(stream);
  }
}
