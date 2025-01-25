"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const core_1 = require("@nestjs/core");
const common_1 = require("@nestjs/common");
const app_module_1 = require("./app.module");
const methodNotAllowedFilter_1 = require("./common/filters/methodNotAllowedFilter");
const configuration_1 = require("./config/configuration");
const nestjs_pino_1 = require("nestjs-pino");
const swagger_1 = require("@nestjs/swagger");
const cors = require('cors');
async function bootstrap() {
    const app = await core_1.NestFactory.create(app_module_1.AppModule, {
        bufferLogs: true,
        logger: ['error', 'warn'],
    });
    const config = new swagger_1.DocumentBuilder()
        .setTitle('API документация')
        .setDescription('Описание API')
        .setVersion('1.0')
        .addTag('auth')
        .build();
    const documentFactory = () => swagger_1.SwaggerModule.createDocument(app, config);
    swagger_1.SwaggerModule.setup('api', app, documentFactory);
    app.useLogger(app.get(nestjs_pino_1.Logger));
    app.useGlobalPipes(new common_1.ValidationPipe({
        transform: true,
        whitelist: true,
        forbidNonWhitelisted: true,
    }));
    app.useGlobalFilters(new methodNotAllowedFilter_1.MethodNotAllowedExceptionFilter());
    app.enableCors({ origin: '*' });
    await app.listen((0, configuration_1.default)().server.port);
    console.info(`running on: ${await app.getUrl()}`);
}
bootstrap();
//# sourceMappingURL=main.js.map