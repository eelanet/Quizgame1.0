import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { RegisterComponent } from './register/register.component';
import { QuizComponent } from './quiz/quiz.component';
import { ResultComponent } from './result/result.component';
import { LoginComponent } from "./login/login.component";
import { CategoryComponent } from './category/category.component';
import { LobbyComponent } from './lobby/lobby.component';

const routes: Routes = [
    { path: 'register', component: RegisterComponent },
    { path: 'quiz', component: QuizComponent },
    { path: 'result', component: ResultComponent },
    { path: 'login', component: LoginComponent },
    { path: 'category', component: CategoryComponent },
    { path: 'lobby', component: LobbyComponent },
    { path: '', redirectTo: '/register', pathMatch: 'full' }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
