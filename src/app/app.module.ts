import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppComponent } from './app.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { MaterialModule } from './material.module';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { CompactDirective } from './directives/compact.directive';
import { SpacerDirective } from './directives/spacer.directive';
import { ErrorMessagingComponent } from './error-messaging/error-messaging.component';

@NgModule({
  declarations: [
    AppComponent,
    CompactDirective,
    SpacerDirective,
    ErrorMessagingComponent
  ],
  imports: [
    BrowserModule,
    BrowserAnimationsModule,
    FormsModule,
    MaterialModule,
    ReactiveFormsModule,
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
