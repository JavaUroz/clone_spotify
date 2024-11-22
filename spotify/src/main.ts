import { enableProdMode, importProvidersFrom } from '@angular/core';
import { environment } from './environments/environment';
import { CookieService } from 'ngx-cookie-service';
import { HTTP_INTERCEPTORS, withInterceptorsFromDi, provideHttpClient } from '@angular/common/http';
import { InjectSessionInterceptor } from '@core/interceptors/inject-session.interceptor';
import { BrowserModule, bootstrapApplication } from '@angular/platform-browser';
import { AppComponent } from './app/app.component';
import { provideRouter } from '@angular/router';
import { appRoutes } from './app/app.routes';

if (environment.production) {
  enableProdMode();
}

bootstrapApplication(AppComponent, {
    providers: [
      provideRouter(appRoutes),
        importProvidersFrom(BrowserModule),
        CookieService,
        {
            provide: HTTP_INTERCEPTORS,
            useClass: InjectSessionInterceptor, // usar la clase
            multi: true // por si necesitamos usar varios interceptores
        },
        provideHttpClient(withInterceptorsFromDi())
    ]
})
  .catch(err => console.error(err));