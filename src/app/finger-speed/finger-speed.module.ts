import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FingerSpeedComponent } from './component';
import { FingerSpeedService } from './service';
import { FormsModule } from '@angular/forms';



@NgModule({
  declarations: [
    FingerSpeedComponent
  ],
  imports: [
    CommonModule,
    FormsModule
  ],
  exports: [
    FingerSpeedComponent
  ],
  providers: [
    FingerSpeedService
  ]
})
export class FingerSpeedModule { }
