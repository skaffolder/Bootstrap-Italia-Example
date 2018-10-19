// Import Libraries
import { Component, OnInit } from '@angular/core';
import { Location } from '@angular/common';
import { ActivatedRoute } from '@angular/router';
// Import Services
import { ActorService } from '../../services/actor.service';
import { FilmService } from '../../services/film.service';
// Import Models
import { Actor } from '../../domain/manage_film_example_db/actor';
import { Film } from '../../domain/manage_film_example_db/film';

// START - USED SERVICES
/**
* ActorService.create
*	@description CRUD ACTION create
*
* FilmService.findBycast
*	@description CRUD ACTION findBycast
*
* ActorService.get
*	@description CRUD ACTION get
*	@param ObjectId id Id 
*
* ActorService.update
*	@description CRUD ACTION update
*	@param ObjectId id Id
*
*/
// END - USED SERVICES

/**
 * This component allows to edit a Actor
 */
@Component({
    selector: 'app-actor-edit',
    templateUrl: 'actor-edit.component.html',
    styleUrls: ['actor-edit.component.css']
})
export class ActorEditComponent implements OnInit {
    item: Actor;
    listCast: Actor[];
    externalFilm: Film[];
    model: Actor;
    formValid: Boolean;

    constructor(
    private actorService: ActorService,
    private filmService: FilmService,
    private route: ActivatedRoute,
    private location: Location) {
        // Init item
        this.item = new Actor();
        this.externalFilm = [];
    }

    /**
     * Init
     */
    ngOnInit() {
        this.route.params.subscribe(param => {
            const id: string = param['id'];
            if (id !== 'new') {
                this.actorService.get(id).subscribe(item => this.item = item);
                this.filmService.findByCast(id).subscribe(list => this.externalFilm = list);
            }
            // Get relations
        });
    }


    /**
     * Save Actor
     *
     * @param {boolean} formValid Form validity check
     * @param Actor item Actor to save
     */
    save(formValid: boolean, item: Actor): void {
        this.formValid = formValid;
        if (formValid) {
            if (item._id) {
                this.actorService.update(item).subscribe(data => this.goBack());
            } else {
                this.actorService.create(item).subscribe(data => this.goBack());
            } 
        }
    }

    /**
     * Go Back
     */
    goBack(): void {
        this.location.back();
    }


}



