// Import Libraries
import { Component, OnInit } from '@angular/core';
import { Location } from '@angular/common';
import { ActivatedRoute } from '@angular/router';
// Import Services
import { FilmMakerService } from '../../services/film-maker.service';
import { FilmService } from '../../services/film.service';
// Import Models
import { FilmMaker } from '../../domain/manage_film_example_db/film-maker';
import { Film } from '../../domain/manage_film_example_db/film';

// START - USED SERVICES
/**
* FilmMakerService.create
*	@description CRUD ACTION create
*
* FilmService.findByfilmMaker
*	@description CRUD ACTION findByfilmMaker
*
* FilmMakerService.get
*	@description CRUD ACTION get
*
* FilmMakerService.update
*	@description CRUD ACTION update
*
*/
// END - USED SERVICES

/**
 * This component allows to edit a FilmMaker
 */
@Component({
    selector: 'app-film-maker-edit',
    templateUrl: 'film-maker-edit.component.html',
    styleUrls: ['film-maker-edit.component.css']
})
export class FilmMakerEditComponent implements OnInit {
    item: FilmMaker;
    listFilmMaker: FilmMaker[];
    externalFilm: Film[];
    model: FilmMaker;
    formValid: Boolean;

    constructor(
    private filmmakerService: FilmMakerService,
    private filmService: FilmService,
    private route: ActivatedRoute,
    private location: Location) {
        // Init item
        this.item = new FilmMaker();
        this.externalFilm = [];
    }

    /**
     * Init
     */
    ngOnInit() {
        this.route.params.subscribe(param => {
            const id: string = param['id'];
            if (id !== 'new') {
                this.filmmakerService.get(id).subscribe(item => this.item = item);
                this.filmService.findByFilmMaker(id).subscribe(list => this.externalFilm = list);
            }
            // Get relations
        });
    }


    /**
     * Save FilmMaker
     *
     * @param {boolean} formValid Form validity check
     * @param FilmMaker item FilmMaker to save
     */
    save(formValid: boolean, item: FilmMaker): void {
        this.formValid = formValid;
        if (formValid) {
            if (item._id) {
                this.filmmakerService.update(item).subscribe(data => this.goBack());
            } else {
                this.filmmakerService.create(item).subscribe(data => this.goBack());
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



