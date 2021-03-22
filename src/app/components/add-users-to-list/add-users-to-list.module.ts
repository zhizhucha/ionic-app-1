import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { IonicModule } from '@ionic/angular';

import { AddUsersToListComponent } from './add-users-to-list.component';
import { AddUsersToListRoutingModule } from './add-users-to-list-routing.module';

@NgModule({
  imports: [CommonModule, FormsModule, ReactiveFormsModule, IonicModule, AddUsersToListRoutingModule],
  declarations: [AddUsersToListComponent]
})
export class AddUsersToListModule {}
