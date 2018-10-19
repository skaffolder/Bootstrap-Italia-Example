import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { ManageUserEditComponent } from './manage-user-edit.component';

const routes: Routes = [
  {
    path: '',
    component: ManageUserEditComponent
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class ManageUserEditRoutingModule { }
