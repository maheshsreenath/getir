import { Component, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http'
import { Observable } from 'rxjs';
interface Item {
  image: string,
  product: string,
  shelf: string,
  appCount: number,
  storeCount: number,
  actionStatus: boolean,
  explanation: string;
}
@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {

  products: Array<Item> = []
  isAdmin = false;
  currentIndex: number = -1;
  type = 'A'
  constructor(private http: HttpClient) { }

  ngOnInit() {
    this.fetchProductData();
  }

  fetchProductData() {
    this.getData().subscribe((data: Array<Item>) => {
      this.products = data;

    })
  }

  getData(): Observable<any> {
    return this.http.get('../assets/data.json');
  }
  saveChanges() {
    this.products[this.currentIndex].actionStatus = true;
    this.products[this.currentIndex].explanation += this.type === 'A' ? '[Approved]' : '[Rejected]';
  }
}
