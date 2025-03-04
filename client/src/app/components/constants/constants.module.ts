import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { ConstantsRoutingModule } from './constants-routing.module';


@NgModule({
  declarations: [],
  imports: [
    CommonModule,
    ConstantsRoutingModule
  ],
  exports:[Notification]
})
export class ConstantsModule { }
