import { Injectable, ExecutionContext, CanActivate } from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';

@Injectable()
export class DynamicAuthGuard implements CanActivate {
  canActivate(context: ExecutionContext) {
    const request = context.switchToHttp().getRequest();
    const authType =
      request.headers['x-platform'] === 'mobile' ? 'jwt' : 'cookie';

    const GeneratedGuard = AuthGuard(authType);
    const guard = new GeneratedGuard();

    return guard.canActivate(context);
  }
}
