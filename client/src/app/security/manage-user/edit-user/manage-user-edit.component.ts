import { Component } from '@angular/core';
import { OnInit } from '@angular/core';
import { User } from 'src/app/domain/manage_film_example_db/user';
import { UserService } from 'src/app/services/user.service';
import { AuthenticationService } from 'src/app/security/authentication.service';
import { Router, ActivatedRoute } from '@angular/router';
import { Md5 } from 'ts-md5/dist/md5';
import { ViewChild, ElementRef } from '@angular/core';

declare var jQuery: any;
/**
 * Edit user by Admin
 */
@Component({
    selector: 'app-manage-user-edit',
    templateUrl: './manage-user-edit.component.html',
})
export class ManageUserEditComponent implements OnInit {

    user: User;
    passwordNew: string;
    passwordNewConfirm: string;
    passwordAdmin: string;
    showError: boolean;
    @ViewChild('closeModal') closeModal: ElementRef;

    constructor(
        private userService: UserService,
        private authenticationService: AuthenticationService,
        private router: Router,
        private route: ActivatedRoute
    ) { }

    ngOnInit(): void {

        this.route.params.subscribe(params => {

            if (params.id === 'new') {
                // New User
                this.user = new User(null, null, null, []);
            } else {
                // Get User
                this.userService.get(params.id).subscribe(user => this.user = user);
            }
        });
    }

    /**
     * Save or create User
     */
    save(): void {
        if (this.user._id) {
            // Save
            this.userService.update(this.user).subscribe(data => this.router.navigateByUrl('/manage-users'));
        } else {
            // Create
            this.user.password = Md5.hashStr(this.user.password).toString();
            this.userService.create(this.user).subscribe(data => this.router.navigateByUrl('/manage-users'));
        }
    }

    /**
     * Delete user
     */
    deleteUser(): void {
        this.userService.remove(this.user._id).subscribe(data => this.router.navigateByUrl('/manage-users'));
    }

    /**
     * Add roles to user
     *
     * @param {*} role Role to add
     */
    addRole(role: any): void {
        if (role.value) {
            this.user.roles.push(role.value);
            role.value = '';
        }
    }

    /**
     * Remove role from user
     *
     * @param {number} index Index of the role in the array
     */
    removeRole(index: number) {
        this.user.roles.splice(index, 1);
    }

    /**
     * Change user password
     */
    changePassword() {
        const passwordNew = Md5.hashStr(this.passwordNew).toString();
        const passwordAdmin = Md5.hashStr(this.passwordAdmin).toString();

        this.userService.changePassword(this.user._id, passwordNew, passwordAdmin).subscribe(data => {
            this.passwordAdmin = null;
            this.passwordNew = null;
            this.passwordNewConfirm = null;
            this.showError = false;
            this.closeModal.nativeElement.click();
        }, err => {
            this.showError = true;
        });
    }

    trackByFn(index: number, item: any) {
        return index;
    }
}
