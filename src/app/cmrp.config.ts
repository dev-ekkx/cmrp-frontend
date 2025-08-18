import {ApplicationConfig, provideBrowserGlobalErrorListeners, provideZonelessChangeDetection} from '@angular/core';
import {provideRouter} from '@angular/router';
import {provideAnimationsAsync} from '@angular/platform-browser/animations/async';
import {providePrimeNG} from 'primeng/config';
import {routes} from './cmrp.routes';
import {Noir} from './prime-ng.config';
import {MessageService} from 'primeng/api';
import {provideHttpClient} from '@angular/common/http';

export const cmrpConfig: ApplicationConfig = {
  providers: [
    provideBrowserGlobalErrorListeners(),
    provideZonelessChangeDetection(),
    provideRouter(routes),
    provideAnimationsAsync(),
    provideHttpClient(),
    MessageService,
    providePrimeNG({
      ripple: true,
      theme: {
        preset: Noir,
        options: {
          darkModeSelector: false,
          cssLayer: {
            name: "primeng",
            order: "theme, base, primeng"
          }
        }
      }
    }),

  ]
};
