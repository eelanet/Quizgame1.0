import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { QuizService } from '../quiz.service';


@Component({
  selector: 'app-quiz',
  templateUrl: './quiz.component.html',
  styleUrls: ['./quiz.component.css']
})
export class QuizComponent implements OnInit {


  constructor(private router: Router, public quizService: QuizService) { }

  ngOnInit() {
    this.ifRefresh();
    this.quizService.seconds = 0;
    this.quizService.qstnProgress = 0;

    this.quizService.getQuestions().subscribe(
      (data: any) => {
        this.quizService.questions = data;
        this.startTimer();
      }
    );
  }

  // Jos sivu päivitetään, vie käyttäjä aulaan
  ifRefresh() {
    const questions = this.quizService.isQuestionsEmpty();
    if (questions) {
      this.router.navigate(['/lobby']);
    }
  }

  // Aloittaa ajastimen
  startTimer() {
    this.quizService.timer = setInterval(() => {
    this.quizService.seconds++;
    }, 1000);
  }

  // Tallennetaan jokainen vastaus
  Answer(choice) {
    this.quizService.questions[this.quizService.qstnProgress].answer = choice;
    this.quizService.qstnProgress++;
    const qnAmount = this.quizService.questionsAmount();

    // Peli loppuu kun kysymykset loppuu
    if (this.quizService.qstnProgress == qnAmount) {
      clearInterval(this.quizService.timer);
      this.router.navigate(['/result']);
    }
  }

}
