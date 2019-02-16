import { Component, OnInit, Input } from '@angular/core';
import { CategoryService } from "../category.service";
import { AuthService } from '../auth.service';
import { Question } from "../question";
import { Category } from "../category";
import { Subscription } from 'rxjs';
import { FormControl } from '@angular/forms';
import { debounceTime } from 'rxjs/operators';


@Component({
  selector: 'app-category',
  templateUrl: './category.component.html',
  styleUrls: ['./category.component.css']
})
export class CategoryComponent implements OnInit {
  @Input() category: Category;

  nameFilter: FormControl = new FormControl(); // nameFilter -muuttuja on tyypiltään FormControl -olio ja Observable
  filterCriteria: string; // hakuarvo jonka perusteella listaa filtteröidään
  field: String;

  categories: Array<Category> = [];
  catname = '';
  addCategory = true;
  editCategory = false;
  categoryId: any;

  questions: Array<Question> = [];
  question: string = '';
  option1: string = '';
  option2: string = '';
  option3: string = null;
  option4: string = null;
  answer: number;

  // Admin tilan avaamista varten
  login: boolean;
  subscription: Subscription; // Subscription -tyyppiseen olioon voidaan tallentaa observablen tilaus.

  constructor(private categoryService: CategoryService, private authService: AuthService) {
    this.field = 'catname'; // oletushakukenttä
    this.nameFilter.valueChanges // tämä on observable
      .pipe(debounceTime(100)) // debounceTime on viive merkkien syöttämisen välissä
      .subscribe( // streamin tilaus, subscribella on kaksi anonyymia funktiota parametrina. Eka laukaistaan jos homma onnistuu
        value => this.filterCriteria = value,
        error => console.error(error));
  }

  ngOnInit() {
    this.getCategories();
    this.checkSubscription();
  }

  // Tsekataan onko käyttäjä admin tilassa
  checkSubscription() {
    this.subscription = this.authService.loginTrueCat().subscribe(data => { this.login = data; });
    /* varmistetaan että login -tila säilyy myös kun sivu reffataan
       varmistus tehdään katsomalla onko token sessionstoragessa.
       Yllä oleva observablen tilaus silti tarvitaan, sillä sessionstoragen
       tarkistus vaatii aina reffauksen koska sitä ei voi kutsua asynkronisesti. */
    const atoken = sessionStorage.getItem('accesstoken');
    if (atoken) {
      this.login = true;
    } else {
      this.login = false;
    }
    console.log('login: ' + this.login)
  }

  // Kategorian nimen muokkaus
  onEditName(category) {
    this.addCategory = false;
    this.editCategory = true;
    this.categoryId = category._id;
    window.scrollTo(0, 0);
  }

  // Uuden kategorian tekeminen / vanhan muokkaaminen
  onSubmitCategory(formData) {
    console.log(formData);

    if (this.addCategory === true) {
      this.categoryService.addCategory({
        'catname': formData.catname
      }).subscribe(data => {
        this.categories.push(data)
        this.getCategories();
      });
    }

    if (this.editCategory === true) {
      this.categoryService.updateCategory(this.categoryId, {
        'catname': formData.catname
      }).subscribe(() => {
        this.getCategories();
      });
    }

    // Nollataan kategorianimen lomake
    this.catname = '';
    this.addCategory = true;
    this.editCategory = false;
  }

  // Uuden kysymyksen tekeminen
  onSubmitQuestion(cat, formData) {
    if (formData.answer > 0 && formData.answer <= 4) {
      const question = formData.question
      const options = [];
      let answer = formData.answer

      // Työnnetään kaikki vastausvaihtoehdot taulukkoon, 
      // jotta mongon question-scheman vaatimukset ovat oikein
      options.push(formData.option1);
      options.push(formData.option2);
      options.push(formData.option3);
      options.push(formData.option4);

      // Miinustetaan vastauksesta yksi, 
      // koska vaihtoehtojen numerot ovat yhden suuremmat kuin taulukossa
      answer--;

      console.log(formData);
      this.categoryService.addQuestion(cat._id, {
        'question': question,
        'options': options,
        'answer': answer
      }).subscribe(data => {
        this.questions.push(data)
        this.getCategories();
      });

      // Nollataan kysymyslomake
      this.question = '';
      this.option1 = '';
      this.option2 = '';
      this.option3 = '';
      this.option4 = '';
      this.answer = null;
    }
  }

  // Hakee kategoriat
  getCategories() {
    this.categoryService.getCategories().subscribe(
      (data: any) => {
        this.categories = data;
      });
  }

  // Poistaa kysymyksen
  onDeleteQuestion(cat, qn) {
    console.log('Deleting question ' + qn.question)
    this.categoryService.deleteQuestion(cat._id, qn._id)
      .subscribe(() => this.getCategories());
  }

  // Poistaa kategorian
  onDeleteCategory(c: Category) {
    console.log('Deleting category ' + c.catname);
    this.categoryService.deleteCategory(c._id)
      .subscribe(() => this.getCategories());
  }

}

