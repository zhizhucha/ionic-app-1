import { CreateTodoComponent } from './../../components/create-todo/create-todo.component';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { TodosPageRoutingModule } from './todos-routing.module';

import { TodosPage } from './todos.page';
import { TodoCardComponent } from 'src/app/components/todo-card/todo-card.component';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    TodosPageRoutingModule,
    ReactiveFormsModule
  ],
  declarations: [TodosPage, TodoCardComponent, CreateTodoComponent]
})
export class TodosPageModule {}
