import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';


@Injectable({
  providedIn: 'root'
})
export class QuizService {

  readonly rootUrl = '';
  
  selectedCategory;
  
  questions: any[];
  timer;
  seconds: number;
  qstnProgress: number;
  correctAnswerCount: number = 0;


  constructor(private http: HttpClient) { }

  // Tarkistetaan onko käyttäjä tullut aulan kautta eli onko valittu kategoria
  isQuestionsEmpty() {
    if (this.selectedCategory == null) {
      return true;
    }
  }

  // Näyttää kulutetun peliajan
  displayTimeElapsed() {
    return Math.floor(this.seconds / 3600) + ':' + Math.floor(this.seconds / 60) + ':' + Math.floor(this.seconds % 60);
  }

  // Palauttaa valitun kategorian kysymykset
  getQuestions() {
    return this.http.get('questions/allquestions/' + this.selectedCategory._id);
  }
  recieveQuestions(category) {
    this.selectedCategory = category;
  }

  // Plauttaa quiz komponentille tiedon valitun kategorian kysymysten määrästä
  questionsAmount() {
    return this.selectedCategory.catquestions.length;
  }

  getAnswers() {
    return this.http.get('questions/allanswers/' + this.selectedCategory._id);
  }

}