import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from "@angular/forms";
import { HttpClientModule } from "@angular/common/http";

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { RegisterComponent } from './register/register.component';
import { NavbarComponent } from './navbar/navbar.component';
import { QuizComponent } from './quiz/quiz.component';
import { ResultComponent } from './result/result.component';
import { QuizService } from './quiz.service';
import { LoginComponent } from './login/login.component';
import { AuthGuard } from "./auth.guard";
import { CategoryComponent } from './category/category.component';
import { AuthService } from './auth.service';
import { CategoryService } from './category.service';
import { LobbyComponent } from './lobby/lobby.component';
import { SearchCategoryComponent } from './search-category/search-category.component';
import { SearchFilterPipe } from './searchfilter.pipe';


@NgModule({
  declarations: [
    AppComponent,
    RegisterComponent,
    NavbarComponent,
    QuizComponent,
    ResultComponent,
    LoginComponent,
    CategoryComponent,
    LobbyComponent,
    SearchCategoryComponent,
    SearchFilterPipe
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    FormsModule,
    HttpClientModule,
    ReactiveFormsModule
  ],
  providers: [
    AuthGuard,
    AuthService,
    QuizService,
    CategoryService
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
