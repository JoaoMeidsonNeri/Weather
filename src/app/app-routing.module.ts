import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { BookmarksComponent } from './pages/bookmarks/container/bookmarks/bookmarks.component';
import { HomeComponent } from './pages/home/containers/home/home.component';

const routes: Routes = [
  {path: '', component: HomeComponent,
  children: [ ]},
  {path: 'bookmarks', component: BookmarksComponent},
  {path: 'details', loadChildren: () => import('../app/pages/details/details.module').then(m => m.DetailsModule)}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
