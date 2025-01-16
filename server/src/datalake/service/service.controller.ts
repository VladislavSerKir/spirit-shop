import {
  Controller,
  Get,
  UseGuards,
  Request,
  Post,
  Body,
} from '@nestjs/common';
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
import { GetStatisticsPeriodDto } from '../user/dto/period-statistics.dto';
import { GetChartsPeriodDto } from './dto/charts-period.dto';

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

  @UseGuards(AccessTokenGuard)
  @Post('/charts-period')
  @ApiOperation({ summary: 'Получение графиков указанный период' })
  @ApiResponse({
    status: 200,
    description: 'Возврат данных для графиков',
  })
  @ApiForbiddenResponse()
  @ApiInternalServerErrorResponse()
  getChartsBetweenPeriodData(
    @Body() getChartsPeriodDto: GetChartsPeriodDto,
  ): any {
    const { startDate, endDate } = getChartsPeriodDto;
    return this.serviceService.getPeriodData(startDate, endDate);
  }
}
