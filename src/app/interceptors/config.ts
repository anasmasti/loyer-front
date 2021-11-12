import { HeaderInterceptor } from './header/header.interceptor';
import { HTTP_INTERCEPTORS } from '@angular/common/http';

export const InterceptorConfig = {
    provide: HTTP_INTERCEPTORS,
    useClass: HeaderInterceptor,
    multi: true
};