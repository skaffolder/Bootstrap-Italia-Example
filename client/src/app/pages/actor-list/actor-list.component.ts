import { Component } from '@angular/core';
import { OnInit } from '@angular/core';
// Import Services
import { ActorService } from '../../services/actor.service';
// Import Models
import { Actor } from '../../domain/manage_film_example_db/actor';

// START - USED SERVICES
/**
* ActorService.delete
*	@description CRUD ACTION delete
*	@param ObjectId id Id
*
* ActorService.list
*	@description CRUD ACTION list
*
*/
// END - USED SERVICES

/**
 * This component shows a list of Actor
 * @class ActorListComponent
 */
@Component({
    selector: 'app-actor-list',
    templateUrl: './actor-list.component.html',
    styleUrls: ['./actor-list.component.css']
})
export class ActorListComponent implements OnInit {
    list: Actor[];
    search: any = {};
    idSelected: string;
    constructor(
        private actorService: ActorService,
    ) { }

    /**
     * Init
     */
    ngOnInit(): void {
        this.actorService.list().subscribe(list => this.list = list);
    }

    /**
     * Select Actor to remove
     *
     * @param {string} id Id of the Actor to remove
     */
    selectId(id: string) {
        this.idSelected = id;
    }

    /**
     * Remove selected Actor
     */
    deleteItem() {
        this.actorService.remove(this.idSelected).subscribe(data => this.list = this.list.filter(el => el._id !== this.idSelected));
    }

}
