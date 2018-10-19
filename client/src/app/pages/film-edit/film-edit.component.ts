// Import Libraries
import { Component, OnInit } from '@angular/core';
import { Location } from '@angular/common';
import { ActivatedRoute } from '@angular/router';
// Import Services
import { FilmService } from '../../services/film.service';
import { ActorService } from '../../services/actor.service';
import { FilmMakerService } from '../../services/film-maker.service';
// Import Models
import { Film } from '../../domain/manage_film_example_db/film';
import { Actor } from '../../domain/manage_film_example_db/actor';
import { FilmMaker } from '../../domain/manage_film_example_db/film-maker';

// START - USED SERVICES
/**
* FilmService.create
*	@description CRUD ACTION create
*
* FilmService.get
*	@description CRUD ACTION get
*
* ActorService.list
*	@description CRUD ACTION list
*
* FilmMakerService.list
*	@description CRUD ACTION list
*
* FilmService.update
*	@description CRUD ACTION update
*
*/
// END - USED SERVICES

/**
 * This component allows to edit a Film
 */
@Component({
    selector: 'app-film-edit',
    templateUrl: 'film-edit.component.html',
    styleUrls: ['film-edit.component.css']
})
export class FilmEditComponent implements OnInit {
    item: Film;
    listCast: Actor[];
    listFilmMaker: FilmMaker[];
    model: Film;
    formValid: Boolean;

    constructor(
    private filmService: FilmService,
    private actorService: ActorService,
    private filmmakerService: FilmMakerService,
    private route: ActivatedRoute,
    private location: Location) {
        // Init item
        this.item = new Film();
    }

    /**
     * Init
     */
    ngOnInit() {
        this.route.params.subscribe(param => {
            const id: string = param['id'];
            if (id !== 'new') {
                this.filmService.get(id).subscribe(item => this.item = item);
            }
            // Get relations
            this.actorService.list().subscribe(list => this.listCast = list);
            this.filmmakerService.list().subscribe(list => this.listFilmMaker = list);
        });
    }

    /**
     * Check if an Actor is in  cast
     *
     * @param {string} id Id of Actor to search
     * @returns {boolean} True if it is found
     */
    containActor(id: string): boolean {
        if (!this.item.cast) return false;
        return this.item.cast.indexOf(id) !== -1;
    }

    /**
     * Add Actor from Film
     *
     * @param {string} id Id of Actor to add in this.item.cast array
     */
    addActor(id: string) {
        if (!this.item.cast)
            this.item.cast = [];
        this.item.cast.push(id);
    }

    /**
     * Remove an Actor from a Film
     *
     * @param {number} index Index of Actor in this.item.cast array
     */
    removeActor(index: number) {
        this.item.cast.splice(index, 1);
    }

    /**
     * Save Film
     *
     * @param {boolean} formValid Form validity check
     * @param Film item Film to save
     */
    save(formValid: boolean, item: Film): void {
        this.formValid = formValid;
        if (formValid) {
            if (item._id) {
                this.filmService.update(item).subscribe(data => this.goBack());
            } else {
                this.filmService.create(item).subscribe(data => this.goBack());
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



