import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { BookListComponent } from './book-list/book-list.component';
import { AddBookComponent } from './add-book/add-book.component';
import { BookmarkComponent } from './bookmark/bookmark.component';


const routes: Routes = [
  {
    path: "list",
    component: BookListComponent
  },
  {
    path: "add",
    component: AddBookComponent
  },
  {
    path: "bookmark",
    component: BookmarkComponent
  },
  
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class BooksRoutingModule { }
