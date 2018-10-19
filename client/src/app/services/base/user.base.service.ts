/**
 *
 *
  _____                      _              _ _ _     _   _     _        __ _ _
 |  __ \                    | |            | (_) |   | | | |   (_)      / _(_) |
 | |  | | ___    _ __   ___ | |_    ___  __| |_| |_  | |_| |__  _ ___  | |_ _| | ___
 | |  | |/ _ \  | '_ \ / _ \| __|  / _ \/ _` | | __| | __| '_ \| / __| |  _| | |/ _ \
 | |__| | (_) | | | | | (_) | |_  |  __/ (_| | | |_  | |_| | | | \__ \ | | | | |  __/
 |_____/ \___/  |_| |_|\___/ \__|  \___|\__,_|_|\__|  \__|_| |_|_|___/ |_| |_|_|\___|

 * DO NOT EDIT THIS FILE!!
 *
 *  FOR CUSTOMIZE userBaseService PLEASE EDIT ../user.service.ts
 *
 *  -- THIS FILE WILL BE OVERWRITTEN ON THE NEXT SKAFFOLDER'S CODE GENERATION --
 *
 */
 // DEPENDENCIES
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { HttpClient } from '@angular/common/http';

// CONFIG
import { environment } from '../../../environments/environment';

// MODEL
import { User } from '../../domain/manage_film_example_db/user';

/**
 * THIS SERVICE MAKE HTTP REQUEST TO SERVER, FOR CUSTOMIZE IT EDIT ../User.service.ts
 */

/*
 * SCHEMA DB User
 *
	{
		mail: {
			type: 'String'
		},
		name: {
			type: 'String'
		},
		password: {
			type: 'String',
			required : true
		},
		roles: {
			type: 'String'
		},
		surname: {
			type: 'String'
		},
		username: {
			type: 'String',
			required : true
		},
		//RELATIONS
		//EXTERNAL RELATIONS
	}
 *
 */
@Injectable()
export class UserBaseService {

    contextUrl: string = environment.endpoint + '/Users';
    constructor(
        protected http: HttpClient
        ) { }

    // CRUD METHODS

    /**
    * UserService.create
    *   @description CRUD ACTION create
    *
    */
    create(item: User): Observable<User> {
        return this.http
            .post<User>(this.contextUrl, item)
            .pipe(map(data => data));
    }

    /**
    * UserService.delete
    *   @description CRUD ACTION delete
    *   @param ObjectId id Id
    *
    */
    remove(id: string): Observable<void> {
        return this.http
            .delete<void>(this.contextUrl + '/' + id)
            .pipe(map(data => data));
    }

    /**
    * UserService.get
    *   @description CRUD ACTION get
    *   @param ObjectId id Id 
    *
    */
    get(id: string): Observable<User> {
        return this.http
            .get<User>(this.contextUrl + '/' + id)
            .pipe(map(data => data));
    }

    /**
    * UserService.list
    *   @description CRUD ACTION list
    *
    */
    list(): Observable<User[]> {
        return this.http
            .get<User[]>(this.contextUrl)
            .pipe(map(data => data));
    }

    /**
    * UserService.update
    *   @description CRUD ACTION update
    *   @param ObjectId id Id
    *
    */
    update(item: User): Observable<User> {
        return this.http
            .post<User>(this.contextUrl + '/' + item._id, item)
            .pipe(map(data => data));
    }


    // Custom APIs


    /**
    * UserService.changePassword
    *   @description Change password of user from admin
    *   @returns object
    *
    */
    changePassword(...params: any[]): Observable<any> {
        return this.http
            .post<any>(this.contextUrl + '/{id}/changePassword', {})
            .pipe(
                map(response => response)
            );
    }

}
