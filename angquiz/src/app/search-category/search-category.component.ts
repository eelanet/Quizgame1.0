import { Component, OnInit, Input } from '@angular/core';
import { Category } from "../category";

@Component({
  selector: 'app-search-category',
  templateUrl: './search-category.component.html',
  styleUrls: ['./search-category.component.css']
})
export class SearchCategoryComponent implements OnInit {
  @Input() c: Category;


  constructor() { }

  ngOnInit() {
  }

}
