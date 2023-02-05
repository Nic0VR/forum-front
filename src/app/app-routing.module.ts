import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { BoardDetailsComponent } from './page/board-details/board-details.component';
import { BoardListComponent } from './page/board-list/board-list.component';
import { HomeComponent } from './page/home/home.component';
import { LayoutComponent } from './page/layout/layout.component';
import { LoginComponent } from './page/login/login.component';
import { ThreadDetailsComponent } from './page/thread-details/thread-details.component';

const routes: Routes = [
  {path:'login',component:LoginComponent},
  {path:'',component:LayoutComponent,children:[
    {path:'',component:HomeComponent},
    {path:'home',component:HomeComponent},
    {path:'boards',component:BoardListComponent},
    {path:'board/:id',component:BoardDetailsComponent},
    {path:'thread/:id',component:ThreadDetailsComponent}
  ]},
  
  
];

@NgModule({
  imports: [RouterModule.forRoot(routes,{anchorScrolling:'enabled'})],
  exports: [RouterModule]
})
export class AppRoutingModule { }
