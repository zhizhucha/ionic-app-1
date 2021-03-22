import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { AddUsersToListComponent } from './add-users-to-list.component';

const routes: Routes = [
  {
    path: ':listId',
    component: AddUsersToListComponent
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})

export class AddUsersToListRoutingModule {}



