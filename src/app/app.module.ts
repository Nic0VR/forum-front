import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { HttpClientModule, HTTP_INTERCEPTORS } from "@angular/common/http";

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { HomeComponent } from './page/home/home.component';
import { TopBarComponent } from './components/top-bar/top-bar.component';
import { BoardListComponent } from './page/board-list/board-list.component';
import { LoginComponent } from './page/login/login.component';
import { LayoutComponent } from './page/layout/layout.component';
import { JwtInterceptor } from './utils/jwt.interceptor';
import { BoardDetailsComponent } from './page/board-details/board-details.component';
import { ThreadComponent } from './components/thread/thread.component';
import { PostFormComponent } from './components/post-form/post-form.component';
import { PostComponent } from './components/post/post.component';
import { ThreadFormComponent } from './components/thread-form/thread-form.component';
import { ThreadDetailsComponent } from './page/thread-details/thread-details.component';
import { PopoverModule } from './popover/popover.module';


@NgModule({
  declarations: [
    AppComponent,
    HomeComponent,
    TopBarComponent,
    BoardListComponent,
    LoginComponent,
    LayoutComponent,
    BoardDetailsComponent,
    ThreadComponent,
    PostFormComponent,
    PostComponent,
    ThreadFormComponent,
    ThreadDetailsComponent,


  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    FormsModule,
    ReactiveFormsModule,
    HttpClientModule,
    PopoverModule
  ],
  providers: [
    { provide: HTTP_INTERCEPTORS, useClass: JwtInterceptor, multi: true },
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
