import { ServiceService } from './service.service';
import { IChartDataPeriodResponse, IHeadersAuthorizationRequest } from 'src/common/types/interfaces';
import { GetChartsPeriodDto } from './dto/charts-period.dto';
export declare class ServiceController {
    private readonly serviceService;
    constructor(serviceService: ServiceService);
    getChartsData(request: IHeadersAuthorizationRequest): Promise<IChartDataPeriodResponse[]>;
    getChartsBetweenPeriodData(getChartsPeriodDto: GetChartsPeriodDto): any;
}
