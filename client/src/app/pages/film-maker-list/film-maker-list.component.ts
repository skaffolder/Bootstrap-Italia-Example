import { Component } from '@angular/core';
import { OnInit } from '@angular/core';
// Import Services
import { FilmMakerService } from '../../services/film-maker.service';
// Import Models
import { FilmMaker } from '../../domain/manage_film_example_db/film-maker';

// START - USED SERVICES
/**
* FilmMakerService.delete
*	@description CRUD ACTION delete
*
* FilmMakerService.list
*	@description CRUD ACTION list
*
*/
// END - USED SERVICES

/**
 * This component shows a list of FilmMaker
 * @class FilmMakerListComponent
 */
@Component({
    selector: 'app-film-maker-list',
    templateUrl: './film-maker-list.component.html',
    styleUrls: ['./film-maker-list.component.css']
})
export class FilmMakerListComponent implements OnInit {
    list: FilmMaker[];
    search: any = {};
    idSelected: string;
    constructor(
        private filmmakerService: FilmMakerService,
    ) { }

    /**
     * Init
     */
    ngOnInit(): void {
        this.filmmakerService.list().subscribe(list => this.list = list);
    }

    /**
     * Select FilmMaker to remove
     *
     * @param {string} id Id of the FilmMaker to remove
     */
    selectId(id: string) {
        this.idSelected = id;
    }

    /**
     * Remove selected FilmMaker
     */
    deleteItem() {
        this.filmmakerService.remove(this.idSelected).subscribe(data => this.list = this.list.filter(el => el._id !== this.idSelected));
    }

}
