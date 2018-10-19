// Import Libraries
import { ActivatedRoute, Params, Router } from '@angular/router';
import { Component, OnInit, ViewChild, ElementRef } from '@angular/core';
import { Location } from '@angular/common';
import { Md5 } from 'ts-md5/dist/md5';

// Security
import { SecurityService } from '../services/security.service';
import { AuthenticationService } from '../authentication.service';
import { User } from 'src/app/domain/manage_film_example_db/user';
import { UserService } from 'src/app/services/user.service';
import { store } from 'src/app/security/current-user';

/**
 * Edit my profile
 */
@Component({
    selector: 'app-profile',
    templateUrl: './profile.component.html',
})
export class ProfileComponent implements OnInit {

    user: User;
    passwordOld: string;
    passwordNew: string;
    passwordNewConfirm: string;
    showError: boolean;
    @ViewChild('closeModal') closeModal: ElementRef;

    constructor(
        private userService: UserService,
        private authenticationService: AuthenticationService,
        private securityService: SecurityService,
        private router: Router,
        private route: ActivatedRoute,
    ) { }

    ngOnInit(): void {
        this.route.params.subscribe(params => {
            // Get logged user
            this.authenticationService.getUser().subscribe(user => this.user = user);
        });
    }

    /**
     * Save User
     *
     * @param {boolean} valid Form validity
     */
    save(valid: boolean) {
        if (valid)
            this.userService.update(this.user).subscribe(data => {
                this.userService.get(this.user._id).subscribe(user => {
                    store.setUser(user);
                    this.router.navigateByUrl('/home');
                });
            });
    }

    /**
     * Change password of user
     */
    changePassword() {
        this.showError = false;

        // Convert passwords in MD5
        const passwordNew = Md5.hashStr(this.passwordNew).toString();
        const passwordOld = Md5.hashStr(this.passwordOld).toString();

        // Change password
        this.securityService.changePassword(passwordNew, passwordOld).subscribe(data => {
            this.passwordOld = null;
            this.passwordNew = '';
            this.passwordNewConfirm = '';
            this.showError = false;
            this.closeModal.nativeElement.click();
        }, err => {
            this.showError = true;
        });
    }
}

