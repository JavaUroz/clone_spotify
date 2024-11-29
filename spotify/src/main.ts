import { enableProdMode, importProvidersFrom } from '@angular/core';
import { environment } from './environments/environment';
import { CookieService } from 'ngx-cookie-service';
import { provideHttpClient, withInterceptors } from '@angular/common/http';
import { BrowserModule, bootstrapApplication } from '@angular/platform-browser';
import { AppComponent } from './app/app.component';
import { provideRouter, withComponentInputBinding } from '@angular/router';
import { appRoutes } from './app/app.routes';
import { authorizationInterceptor } from '@core/interceptors/session.interceptor';

if (environment.production) {
  enableProdMode();
}

bootstrapApplication(AppComponent, {
    providers: [
      provideRouter(appRoutes, withComponentInputBinding()),
        importProvidersFrom(BrowserModule),
        CookieService,
        provideHttpClient(withInterceptors([authorizationInterceptor]))
    ]
}).catch(err => console.error(err));