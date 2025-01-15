import { Controller, Get, UseGuards, Request } from '@nestjs/common';
import { AccessTokenGuard } from 'src/config/access-token.guard';
import {
  ApiForbiddenResponse,
  ApiInternalServerErrorResponse,
  ApiNotFoundResponse,
  ApiOperation,
  ApiResponse,
  ApiTags,
} from '@nestjs/swagger';
import { ServiceService } from './service.service';
import {
  IChartDataPeriodResponse,
  IHeadersAuthorizationRequest,
} from 'src/common/types/interfaces';

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
  })
  @ApiForbiddenResponse()
  @ApiInternalServerErrorResponse()
  getChartsData(
    @Request() request: IHeadersAuthorizationRequest,
  ): Promise<IChartDataPeriodResponse[]> {
    const accessToken = request.headers.authorization;
    return this.serviceService.getChartsData(accessToken);
  }
}
