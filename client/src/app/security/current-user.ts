import { BehaviorSubject, Observable } from 'rxjs';
import { User } from 'src/app/domain/manage_film_example_db/user';
import * as _ from 'lodash';

/**
 * Store the current user
 */
class CurrentUser {
    private currentUserSubject = new BehaviorSubject(null);
    public currentUser$: Observable<User> = this.currentUserSubject.asObservable();

    setUser(user: User) {
        this.currentUserSubject.next(_.cloneDeep(user));
    }
}

export const store = new CurrentUser();
