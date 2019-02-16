import { Component, OnInit } from '@angular/core';
import { CategoryService } from '../category.service';
import { QuizService } from '../quiz.service';
import { Router } from "@angular/router";
import { Category } from '../category';

@Component({
  selector: 'app-lobby',
  templateUrl: './lobby.component.html',
  styleUrls: ['./lobby.component.css']
})
export class LobbyComponent implements OnInit {

  categories: Array<Category> = [];

  constructor(private router: Router, private categoryService: CategoryService, private quizService: QuizService) { }

  ngOnInit() {
    this.getCategories();
    clearInterval(this.quizService.timer);
  }

  // Hateaan kategoriat
  getCategories() {
    this.categoryService.getCategories().subscribe(
      (data: any) => {
        this.categories = data;
      });
  }

  // Ottaa vastaan valitun kategorian
  onCatChoice(cat) {
    this.quizService.recieveQuestions(cat);
    this.router.navigate(['/quiz']);
  }

}
