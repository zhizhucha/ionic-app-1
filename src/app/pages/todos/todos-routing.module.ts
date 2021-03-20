import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { TodosPage } from './todos.page';

const routes: Routes = [
  {
    path: ':listId',
    component: TodosPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class TodosPageRoutingModule {}
