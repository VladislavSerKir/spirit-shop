import { ArgumentsHost, ExceptionFilter, MethodNotAllowedException } from '@nestjs/common';
export declare class MethodNotAllowedExceptionFilter implements ExceptionFilter {
    catch(exception: MethodNotAllowedException, host: ArgumentsHost): void;
}
