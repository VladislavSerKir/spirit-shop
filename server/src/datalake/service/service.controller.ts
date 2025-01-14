import { Controller, Get, UseGuards, Request } from '@nestjs/common';
import { AccessTokenGuard } from 'src/config/access-token.guard';
import {
  ApiForbiddenResponse,
  ApiNotFoundResponse,
  ApiOperation,
  ApiResponse,
  ApiTags,
} from '@nestjs/swagger';
import { User } from '../user/entities/user.entity';
import { ServiceService } from './service.service';
import { IHeadersAuthorizationRequest } from 'src/common/types/interfaces';

@ApiTags('service')
@Controller('service')
export class ServiceController {
  constructor(private readonly serviceService: ServiceService) {}

  @UseGuards(AccessTokenGuard)
  @Get('/charts')
  @ApiOperation({ summary: 'Получение графиков за весь период' })
  @ApiResponse({
    status: 200,
    description: 'Возврат данных для графиков',
    type: User,
  })
  @ApiNotFoundResponse()
  @ApiForbiddenResponse()
  getChartsData(@Request() request: IHeadersAuthorizationRequest): any {
    const accessToken = request.headers.authorization;
    return this.serviceService.getChartsData(accessToken);
  }
}
