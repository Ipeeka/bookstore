import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { ConstantsRoutingModule } from './constants-routing.module';
import { ReportComponent } from './report/report.component';
import { ChatBotComponent } from './chat-bot/chat-bot.component';


@NgModule({
  declarations: [],
  imports: [
    CommonModule,
    ConstantsRoutingModule,
    ChatBotComponent,
  ],
  exports:[Notification,]
})
export class ConstantsModule { }
