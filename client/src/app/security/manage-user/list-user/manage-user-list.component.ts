// COMPONENT
import { Component, OnInit } from '@angular/core';

// SERVICES
import { UserService } from 'src/app/services/user.service';

// MODEL
import { User } from 'src/app/domain/manage_film_example_db/user';


/**
 * List of all users
 */
@Component({
    selector: 'app-manage-user-list',
    templateUrl: './manage-user-list.component.html'
})
export class ManageUserListComponent implements OnInit {
    users: User[];
    search: any = {};

    constructor(private userService: UserService) {}

    ngOnInit(): void {
        // Get list users
        this.userService.list().subscribe(list => this.users = list);
    }

}
