import { SetMetadata } from '@nestjs/common';

export const EXCLUDE_RESPONSE_INTERCEPTOR = 'excludeResponseInterceptor';
export const ExcludeResponseInterceptor = () => SetMetadata(EXCLUDE_RESPONSE_INTERCEPTOR, true);