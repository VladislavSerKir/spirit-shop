"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
var __param = (this && this.__param) || function (paramIndex, decorator) {
    return function (target, key) { decorator(target, key, paramIndex); }
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.ServiceController = void 0;
const common_1 = require("@nestjs/common");
const access_token_guard_1 = require("../../config/access-token.guard");
const swagger_1 = require("@nestjs/swagger");
const service_service_1 = require("./service.service");
const charts_period_dto_1 = require("./dto/charts-period.dto");
let ServiceController = class ServiceController {
    constructor(serviceService) {
        this.serviceService = serviceService;
    }
    getChartsData(request) {
        const accessToken = request.headers.authorization;
        return this.serviceService.getChartsData(accessToken);
    }
    getChartsBetweenPeriodData(getChartsPeriodDto) {
        const { startDate, endDate } = getChartsPeriodDto;
        return this.serviceService.getPeriodData(startDate, endDate);
    }
};
exports.ServiceController = ServiceController;
__decorate([
    (0, common_1.UseGuards)(access_token_guard_1.AccessTokenGuard),
    (0, common_1.Get)('/charts'),
    (0, swagger_1.ApiOperation)({ summary: 'Получение графиков за весь период' }),
    (0, swagger_1.ApiResponse)({
        status: 200,
        description: 'Возврат данных для графиков',
    }),
    (0, swagger_1.ApiForbiddenResponse)(),
    (0, swagger_1.ApiInternalServerErrorResponse)(),
    __param(0, (0, common_1.Request)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object]),
    __metadata("design:returntype", Promise)
], ServiceController.prototype, "getChartsData", null);
__decorate([
    (0, common_1.UseGuards)(access_token_guard_1.AccessTokenGuard),
    (0, common_1.Post)('/charts-period'),
    (0, swagger_1.ApiOperation)({ summary: 'Получение графиков указанный период' }),
    (0, swagger_1.ApiResponse)({
        status: 200,
        description: 'Возврат данных для графиков',
    }),
    (0, swagger_1.ApiForbiddenResponse)(),
    (0, swagger_1.ApiInternalServerErrorResponse)(),
    __param(0, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [charts_period_dto_1.GetChartsPeriodDto]),
    __metadata("design:returntype", Object)
], ServiceController.prototype, "getChartsBetweenPeriodData", null);
exports.ServiceController = ServiceController = __decorate([
    (0, swagger_1.ApiTags)('service'),
    (0, common_1.Controller)('service'),
    __metadata("design:paramtypes", [service_service_1.ServiceService])
], ServiceController);
//# sourceMappingURL=service.controller.js.map