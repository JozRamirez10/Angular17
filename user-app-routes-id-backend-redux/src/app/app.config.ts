import { ApplicationConfig } from '@angular/core';
import { provideRouter } from '@angular/router';

import { routes } from './app.routes';
import { provideHttpClient, withInterceptors } from '@angular/common/http';
import { tokenInterceptor } from './interceptors/token.interceptor';
import { provideStore } from '@ngrx/store';
import { usersReducer } from '../store/users/users.reducer';
import { provideEffects } from '@ngrx/effects';
import { UsersEffects } from '../store/users/users.effects';
import { authReducer } from '../store/auth/auth.reducer';
import { AuthEffects } from '../store/auth/auth.effects';

export const appConfig: ApplicationConfig = {
  providers: [
    provideRouter(routes),
    provideHttpClient(withInterceptors([tokenInterceptor])), // Necesario para las conexiones con el backend
    provideStore({
        users: usersReducer,
        auth: authReducer
    }),
    provideEffects(UsersEffects, AuthEffects)
] 
};
