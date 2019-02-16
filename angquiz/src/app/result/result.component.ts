import { Component, OnInit } from '@angular/core';
import { QuizService } from '../quiz.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-result',
  templateUrl: './result.component.html',
  styleUrls: ['./result.component.css']
})
export class ResultComponent implements OnInit {

  playerName = null;
  percentage;
  result: string;

  constructor(public quizService: QuizService, private router: Router) { }

  ngOnInit() {
    this.ifRefresh();
    this.quizService.getAnswers().subscribe(
      (data: any) => {
        this.quizService.correctAnswerCount = 0;
        this.quizService.questions.forEach((e, i) => {
          if (e.answer == data[i]) {
            this.quizService.correctAnswerCount++;
            e.correct = data[i];
          }
        });
        this.countPercentage();
        this.resultMessage();
      }
    );
    this.getLocalStorage();
  }

  // Jos sivu päivitetään, viedään käyttäjä aulaan
  ifRefresh() {
    const questions = this.quizService.isQuestionsEmpty();
    if (questions) {
      this.router.navigate(['/lobby']);
    }
  }

  // Kertoo pelaajalle miten quiz meni
  resultMessage() {
    const answers = this.quizService.correctAnswerCount;
    const questions = this.quizService.selectedCategory.catquestions.length;
    const percentage = answers / questions;

    if (percentage === 1) {
      this.result = 'Kaikki oikein!';
    } else if (percentage >= 0.6 && percentage < 1) {
      this.result = 'Hienoa, lähes kaikki oikein!';
    } else if(percentage > 0.2 && percentage < 0.6) {
      this.result = 'Parempi tuuri seuraavalla kerralla!';
    } else {
      this.result = 'Nyt vähän tsemppiä...';
    }
  }

// Laskee resultMessagea varten kuinka suuri % vastauksista meni oikein
countPercentage() {
  this.percentage = this.quizService.correctAnswerCount / this.quizService.selectedCategory.catquestions.length;
  console.log(this.percentage);
}

// Hakee pelaajan nimen local storagesta
getLocalStorage() {
  if (JSON.parse(localStorage.getItem('player')) != null) {
    const item = JSON.parse(localStorage.getItem('player'));
    this.playerName = item.name;
  }
}

// Pelaa uudestaan samat kysymykset
restart() {
  this.router.navigate(['/quiz']);
}

// Vie aulaan
onLobby() {
  this.router.navigate(['/lobby']);
}

  

}
