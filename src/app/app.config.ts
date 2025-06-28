import { ApplicationConfig, provideBrowserGlobalErrorListeners, provideZoneChangeDetection } from '@angular/core';
import { provideRouter } from '@angular/router';

import { routes } from './app.routes';
import { providePrimeNG } from 'primeng/config';
import { provideState, provideStore } from '@ngrx/store';
import { provideEffects } from '@ngrx/effects';
import { jobApplicationReducer } from './features/job-applications/state/job-application-reducer';
import { JobApplicationEffects } from './features/job-applications/state/job-application-effects';
import { provideHttpClient } from '@angular/common/http';
import Aura from '@primeng/themes/aura';
import { provideStoreDevtools } from '@ngrx/store-devtools';

export const appConfig: ApplicationConfig = {
  providers: [
    provideBrowserGlobalErrorListeners(),
    provideZoneChangeDetection({ eventCoalescing: true }),
    provideRouter(routes),
    provideHttpClient(),
    providePrimeNG({
      theme: {
        preset: Aura
      }
    }),
    provideStore(),
    provideState({ name: 'jobApplication', reducer: jobApplicationReducer }),
    provideEffects(JobApplicationEffects),
    provideStoreDevtools()
  ]
};
