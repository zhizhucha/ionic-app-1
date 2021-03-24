import { ToastController } from '@ionic/angular';
import { FirestoreService } from './../../services/data/firestore.service';
import { AuthService } from './../../services/user/auth.service';
import { Component, Input, OnInit } from '@angular/core';

@Component({
  selector: 'app-todo-card',
  templateUrl: './todo-card.component.html',
  styleUrls: ['./todo-card.component.scss'],
})
export class TodoCardComponent implements OnInit {

  @Input() title : string;
  @Input() description : string;
  @Input() isDone : boolean;
  @Input() dueDate : Date;
  @Input() canWrite : boolean;
  @Input() listId : string;
  @Input() todoId : string;

  public isDue : boolean;
  public isDueToday : boolean;

  isDone2 : boolean;
  constructor(public fsService : FirestoreService, public toastControl : ToastController) { 
    
  }

  
  ngOnInit() {

    this.isDone2 = this.isDone;

    let fixedDueDate = new Date((new Date(this.dueDate).toDateString()));
    
    const fixedCurDate = new Date(new Date().toDateString());
    this.isDueToday = fixedCurDate.getTime() == fixedDueDate.getTime();
    this.isDue = fixedCurDate.getTime() > fixedDueDate.getTime();
    

  }

  async onUpdateCardStatus( ){
    console.log("Checked : " +this.isDone);
    await this.fsService.updateTodoStatus(this.listId, this.todoId, this.isDone).then(
      () => {
        if(!this.isDone){
          this.openToast("Task is not done yet", false);
        }else{
          this.openToast("The todo is done", true);
        }
      }
    ).catch( (err) => {
      this.openToast(`Error updating todo status: ${err}`, false);
    })
  }

  async openToast(msg : string, state : boolean) {
    const toast = await this.toastControl.create({
      message: msg,
      animated: true,
      duration: 2000,
      position: 'bottom',
      translucent: true,
      color: state?"success":"warning"
    });
    await toast.present();
    toast.onDidDismiss().then((val) => {
    });
  }

}
