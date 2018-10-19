import { CanActivate, Router, ActivatedRouteSnapshot, RouterStateSnapshot } from '@angular/router';
import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { AuthenticationService } from 'src/app/security/authentication.service';
import { store } from 'src/app/security/current-user';
import { Observable } from 'rxjs';
import { User } from 'src/app/domain/manage_film_example_db/user';

/**
 * This class intercept route change and check for security
 */
@Injectable()
export class AuthGuard implements CanActivate {
    constructor(
        private router: Router,
        private http: HttpClient,
        private authenticationService: AuthenticationService
    ) { }

    /**
     * Check routes permission
     */
    canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): Observable<boolean> | boolean {

        // Get authorized roles for route
        const roles = [];
        Object.keys(route.data).forEach(key => roles.push(route.data[key]));

        // Return observable
        return new Observable<boolean>((ob: any) => {
            // Get logged user
            this.authenticationService.getUser().subscribe(user => {
                if (!user) {
                    // Not logged
                    ob.next(false);
                    this.router.navigate(['/login']);
                } else {
                    // Logged user
                    const userObj: User = new User(user._id, user.username, user.token, user.roles);
                    if (roles && roles.length > 0) {
                        // Check roles
                        if (userObj.hasRole(roles)) {
                            ob.next(true);
                        } else {
                            ob.next(false);
                            this.router.navigate(['/login']);
                        }
                    }
                    ob.next(true);
                }
            });
        });
    }

}
