import { Injectable } from '@angular/core';
import { Http, Headers } from '@angular/http';
import 'rxjs/add/operator/map';

@Injectable()
export class ProductService {
  product: Object;
  categories: String[];

  constructor() { }

  getCategories(){
    this.categories = ["Bread", "Chocolates", "Milk"];
    return this.categories;
  }

}
