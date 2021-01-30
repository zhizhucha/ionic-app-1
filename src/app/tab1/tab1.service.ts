import { Injectable } from '@angular/core';
import {List} from '../../models/list';

@Injectable({
  providedIn: 'root'
})
export class Tab1Service {
  private lists: List[];

  constructor() {
    this.lists = [];
  }

  public getAll(): List[] { return this.lists; }

  public getMockList(): List[] {
    this.lists.push(new List('Eat kit-kat'));
    this.lists.push(new List('Lick lollipop'));
    this.lists.push(new List('Whip cream'));
    this.lists.push(new List('Bake cake'));
    this.lists.push(new List('Make omelette'));
    return this.lists;
  }

  public getOne(id: string): List {
    return this.lists.find(l => l?.id === id);
  }

  public saveList(name: string): void {
    this.lists.push(new List(name));
  }

  public deleteList(id: string): void {
    this.lists = this.lists.filter(l => l?.id !== id);
  }
}
