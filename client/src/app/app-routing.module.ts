// DEPENDENCIES
import { NgModule } from '@angular/core';
import { CanActivate, RouterModule, Routes } from '@angular/router';

/* START MY VIEWS IMPORT */
// Do not edit this comment content, it will be overwritten in next Skaffolder generation
import { HomeComponent} from './pages/home/home.component';
import { ActorEditComponent} from './pages/actor-edit/actor-edit.component';
import { ActorListComponent} from './pages/actor-list/actor-list.component';
import { FilmEditComponent} from './pages/film-edit/film-edit.component';
import { FilmListComponent} from './pages/film-list/film-list.component';
import { FilmMakerEditComponent} from './pages/film-maker-edit/film-maker-edit.component';
import { FilmMakerListComponent} from './pages/film-maker-list/film-maker-list.component';

/* END MY VIEWS IMPORT */

// SECURITY
import { LoginComponent } from './pages/login/login.component';
import { ManageUserEditComponent } from './security/manage-user/edit-user/manage-user-edit.component';
import { ManageUserListComponent } from './security/manage-user/list-user/manage-user-list.component';
import { ProfileComponent } from './security/profile/profile.component';
import { AuthGuard } from './security/auth.guard';

/**
 * WEB APP ROUTES
 */
const routes: Routes = [
    { path: '', redirectTo: '/home', pathMatch: 'full'  },

    /* START MY VIEWS */

    { path: 'actors/:id',  loadChildren: './pages/actor-edit/actor-edit.module#ActorEditModule' , canActivate: [AuthGuard] },
    { path: 'actors',  loadChildren: './pages/actor-list/actor-list.module#ActorListModule' , canActivate: [AuthGuard] },
    { path: 'films/:id',  loadChildren: './pages/film-edit/film-edit.module#FilmEditModule' , canActivate: [AuthGuard] },
    { path: 'films',  loadChildren: './pages/film-list/film-list.module#FilmListModule' , canActivate: [AuthGuard] },
    { path: 'filmmakers/:id',  loadChildren: './pages/film-maker-edit/film-maker-edit.module#FilmMakerEditModule' , canActivate: [AuthGuard] },
    { path: 'filmmakers',  loadChildren: './pages/film-maker-list/film-maker-list.module#FilmMakerListModule' , canActivate: [AuthGuard] },
    { path: 'home',  loadChildren: './pages/home/home.module#HomeModule' , canActivate: [AuthGuard] },

 /* END MY VIEWS */

    // SECURITY
    { path: 'manage-users',  loadChildren: './security/manage-user/list-user/manage-user-list.module#ManageUserListModule', canActivate: [AuthGuard], data: ['ADMIN']},
    { path: 'manage-users/:id',  loadChildren: './security/manage-user/edit-user/manage-user-edit.module#ManageUserEditModule', canActivate: [AuthGuard], data: ['ADMIN']},
    { path: 'profile',  loadChildren: './security/profile/profile.module#ProfileModule', canActivate: [AuthGuard] },
    { path: 'login', loadChildren: './pages/login/login.module#LoginModule'}
];

/**
 * ROUTING MODULE
 */
@NgModule({
    imports: [ RouterModule.forRoot(routes) ],
    exports: [ RouterModule ]
})

export class AppRoutingModule {}
