import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { NotificationComponent } from './common/notification/notification.component';
import { ReportComponent } from './common/report/report.component';
import { CartComponent } from './common/cart/cart.component';
import { ChatBotComponent } from './common/chat-bot/chat-bot.component';

const routes: Routes = [
  {
    path: 'notifications',
    component: NotificationComponent,
  },
  {
    path: 'report',
    component: ReportComponent,
  },
  {
    path: 'cart',
    component: CartComponent,
  },
  {
    path: 'chat-bot',
    component: ChatBotComponent,
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class ComponentsRoutingModule {}
