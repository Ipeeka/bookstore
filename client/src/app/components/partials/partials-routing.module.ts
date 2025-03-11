import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { LayoutComponent } from './layout/layout.component';

const routes: Routes = [
  {
    path: "",
    component: LayoutComponent ,
    children: [
      {
        path: "book",
        loadChildren: () => import("../books/books.module").then(m => m.BooksModule),
      },
      // {
      //   path: "search",
      //   loadChildren: () => import("../sea/booking.module").then(m => m.BookingModule),
      // },
      {
        path: 'user',
        loadChildren: () => import("../user/user.module").then(m => m.UserModule),
      },
      {
        path: 'layout',
        loadChildren: () => import("../user/user.module").then(m => m.UserModule),
      },
      {
        path: 'component',  
        loadChildren: () => import('../../components/components.module').then(m => m.ComponentsModule),
      
    },
      
    ]
  }
];


@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class PartialsRoutingModule { }
