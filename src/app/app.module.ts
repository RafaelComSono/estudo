import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppComponent } from './app.component';
import { FingerSpeedModule } from './finger-speed';

@NgModule({
  declarations: [
    AppComponent
  ],
  imports: [
    BrowserModule,
    FingerSpeedModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
