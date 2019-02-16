import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { catchError } from 'rxjs/operators';
import { Observable } from 'rxjs';
import { Category } from "./category";
import { Question } from './question';


@Injectable({
  providedIn: 'root'
})
export class CategoryService {

  private apiUrl = 'categories';
  
  constructor(private http: HttpClient) { }

  // Virheenkäsittelymetodi joka palauttaa observablen
  private handleError(error: any): Observable<any> {
    console.error('An error occurred', error);
    return (error.message || error);
  }

  // Kategorian Metodit
  
  getCategories(): Observable<Category[]> {
    return this.http.get<Category[]>(this.apiUrl + '/allcategories').pipe(
        catchError(this.handleError)
      );
  }

  getCategory(catId) {
    return this.http.get(this.apiUrl + '/category/' + catId);
  }

  addCategory(category: any): Observable<Category> {
    const mytoken = JSON.parse(sessionStorage['accesstoken']);
    const tokenheaders = { headers: new HttpHeaders({ 'Content-Type': 'application/json', 'x-access-token': mytoken.token }) };
    return this.http.post<Category>(this.apiUrl + '/create', category, tokenheaders).pipe(
      catchError(this.handleError)
    );

  }

  updateCategory(catId, name: any): Observable<Category> {
    const mytoken = JSON.parse(sessionStorage['accesstoken']);
    const tokenheaders = { headers: new HttpHeaders({ 'Content-Type': 'application/json', 'x-access-token': mytoken.token }) };
    return this.http.post<Category>(this.apiUrl + '/update/' + catId, name, tokenheaders).pipe(
      catchError(this.handleError)
    );
  }

  deleteCategory(catId: string): Observable<Category> {
    const mytoken = JSON.parse(sessionStorage['accesstoken']);
    const tokenheaders = { headers: new HttpHeaders({ 'x-access-token': mytoken.token }) };
    return this.http.delete<Category>(this.apiUrl + '/delete/' + catId, tokenheaders).pipe(
      catchError(this.handleError)
    );
  }


  // Kysymysten metodit

  getQuestions(catId) {
    return this.http.get('questions/allquestions/' + catId);
  }

  addQuestion(catId, question: any): Observable<Question> {
    const mytoken = JSON.parse(sessionStorage['accesstoken']);
    const tokenheaders = { headers: new HttpHeaders({ 'Content-Type': 'application/json', 'x-access-token': mytoken.token }) };
    return this.http.post<Question>('questions/addquestion/' + catId, question, tokenheaders).pipe(
      catchError(this.handleError)
    );
  }

  deleteQuestion(categoryId, questionId) {
    const mytoken = JSON.parse(sessionStorage['accesstoken']);
    const tokenheaders = { headers: new HttpHeaders({ 'x-access-token': mytoken.token }) };
    return this.http.delete('questions/deletequestion/' + categoryId + '/' + questionId, tokenheaders).pipe(
      catchError(this.handleError)
    );
  }

}
