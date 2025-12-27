import { applyDecorators, UseGuards } from '@nestjs/common';
import { DynamicAuthGuard } from '../guards/dynamic-auth.guard';

export function Auth() {
  return applyDecorators(UseGuards(DynamicAuthGuard));
}
