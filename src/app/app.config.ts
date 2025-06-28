import { ApplicationConfig, importProvidersFrom, provideBrowserGlobalErrorListeners, provideZoneChangeDetection } from '@angular/core';
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
import { provideAnimations } from '@angular/platform-browser/animations';
import { ReactiveFormsModule } from '@angular/forms';
import { CheckboxModule } from 'primeng/checkbox';
import { DropdownModule } from 'primeng/dropdown';
import { FloatLabelModule } from 'primeng/floatlabel';
import { InputTextModule } from 'primeng/inputtext';
import { TextareaModule } from 'primeng/textarea';

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
    provideStoreDevtools(),
    provideAnimations(),
    importProvidersFrom(
      FloatLabelModule,
      ReactiveFormsModule,
      DropdownModule,
      CheckboxModule,
      TextareaModule,
      InputTextModule
    )
  ]
};
