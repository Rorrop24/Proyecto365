import { ApplicationConfig, importProvidersFrom } from '@angular/core';
import { provideRouter } from '@angular/router';
import { routes } from './app.routes';
import { HTTP_INTERCEPTORS, provideHttpClient, withInterceptorsFromDi } from '@angular/common/http';
import { MsalModule, MsalInterceptor, MsalGuard, MsalService, MsalGuardConfiguration, MsalInterceptorConfiguration } from '@azure/msal-angular';
import { PublicClientApplication, InteractionType } from '@azure/msal-browser';

export function MSALInstanceFactory(): PublicClientApplication {
  return new PublicClientApplication({
    auth: {
      clientId: '43503a71-e4f5-4f4b-a283-185c42b093f0',
      authority: 'https://login.microsoftonline.com/6fb3d735-1c10-4007-b977-7dbea3388386',
      redirectUri: 'http://localhost:4200'
    }
  });
}

export function MSALInterceptorConfigFactory(): MsalInterceptorConfiguration {
  const protectedResourceMap = new Map<string, Array<string>>();
  protectedResourceMap.set('http://localhost:8080/api/', ['api://43503a71-e4f5-4f4b-a283-185c42b093f0/user_impersonation']);

  return {
    interactionType: InteractionType.Redirect as InteractionType.Redirect, // <-- Aquí está el arreglo clave
    protectedResourceMap
  };
}

export function MSALGuardConfigFactory(): MsalGuardConfiguration {
  return {
    interactionType: InteractionType.Redirect as InteractionType.Redirect, // <-- Y aquí también
    authRequest: {
      scopes: ['user.read']
    }
  };
}

export const appConfig: ApplicationConfig = {
  providers: [
    provideRouter(routes),
    provideHttpClient(withInterceptorsFromDi()),
    importProvidersFrom(
      MsalModule.forRoot(MSALInstanceFactory(), MSALGuardConfigFactory(), MSALInterceptorConfigFactory())
    ),
    {
      provide: HTTP_INTERCEPTORS,
      useClass: MsalInterceptor,
      multi: true
    },
    MsalService,
    MsalGuard
  ]
};