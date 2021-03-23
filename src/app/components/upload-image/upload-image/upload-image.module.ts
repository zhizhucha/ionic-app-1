import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { IonicModule } from '@ionic/angular';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { UploadImageComponent } from './upload-image.component';


@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    FormsModule, 
    ReactiveFormsModule
  ],
  declarations: [UploadImageComponent, FormatFileSizePipe]
})
export class UploadImageComponentModule {}
