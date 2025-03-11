import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { NotificationComponent } from './notification/notification.component';
import { ReportComponent } from './report/report.component';
import { CartComponent } from './cart/cart.component';
import { ChatBotComponent } from './chat-bot/chat-bot.component';

const routes: Routes = [
  {
    path: 'notifications',  
    component: NotificationComponent
  },
  {
    path: 'report',  
    component: ReportComponent
  },
  {
    path: 'cart',  
    component: CartComponent
  },
  {
    path: 'chat-bot',  
    component: ChatBotComponent
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class ComponentsRoutingModule { }
