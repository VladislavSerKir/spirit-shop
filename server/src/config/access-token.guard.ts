import {
  CanActivate,
  ExecutionContext,
  Injectable,
  UnauthorizedException,
} from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';

@Injectable()
export class AccessTokenGuard implements CanActivate {
  constructor(private readonly jwtService: JwtService) {}
  async canActivate(context: ExecutionContext): Promise<boolean> {
    const request = context.switchToHttp().getRequest();
    const token = request.headers.authorization?.split(' ')[1];
    if (!token) {
      throw new UnauthorizedException('Token not provided');
    }
    try {
      const payload = await this.jwtService.verifyAsync(token);
      request.username = payload;

      return true;
    } catch (error) {
      if (error.name === 'TokenExpiredError') {
        throw new UnauthorizedException('Access token has expired');
      }
      throw new UnauthorizedException('Invalid token');
    }
  }
}
