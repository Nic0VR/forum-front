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
import { BottomBarPageComponent } from './components/bottom-bar-page/bottom-bar-page.component';
import { RangePipe } from './pipes/range.pipe';
import { OptionDisplayModule } from './optionsDisplay/option-display.module';
import { NumberValidatorDirective } from './directives/number-validator.directive';

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
    BottomBarPageComponent,
    RangePipe,
    NumberValidatorDirective,



  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    FormsModule,
    ReactiveFormsModule,
    HttpClientModule,
    PopoverModule,
    OptionDisplayModule
  ],
  providers: [
    { provide: HTTP_INTERCEPTORS, useClass: JwtInterceptor, multi: true },
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
