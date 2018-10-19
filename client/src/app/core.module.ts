import { NgModule } from '@angular/core';
/* START MY SERVICES IMPORTS*/
// Do not edit this comment content, it will be overwritten in next Skaffolder generation
import { ActorService } from './services/actor.service';
import { FilmService } from './services/film.service';
import { FilmMakerService } from './services/film-maker.service';
import { UserService } from './services/user.service';

/* END MY SERVICES IMPORTS*/
import { AuthGuard } from './security/auth.guard';
import { AuthenticationService } from './security/authentication.service';
import { SecurityService } from './security/services/security.service';
import { HTTP_INTERCEPTORS } from '../../node_modules/@angular/common/http';
import { AuthInterceptor } from './security/auth.interceptor';

@NgModule({
  imports: [],
  providers: [
    /* START PROVIDERS */
// Do not edit this comment content, it will be overwritten in next Skaffolder generation
    ActorService,
    FilmService,
    FilmMakerService,
    UserService,
 /* END PROVIDERS */

    // SECURITY
    AuthGuard,
    AuthenticationService,
    SecurityService,
    { provide: HTTP_INTERCEPTORS, useClass: AuthInterceptor, multi: true }
  ],
  exports: []
})
export class CoreModule {
}
