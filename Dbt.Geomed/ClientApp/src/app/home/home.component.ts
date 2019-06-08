import { Component } from '@angular/core';
import { Category } from './models/category';
import { Service } from './models/service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ["./home.component.scss"]
})
export class HomeComponent {
  private _categories: Array<Category>;

  private _selectedServices: Array<number>;

  private _router: Router;

  public constructor(router: Router) {
    this._selectedServices = [];

    const category1 = new Category(1, "Узи");
    const category2 = new Category(2, "Кардиологогия");

    category1.services = [
      new Service(1, "Узи почек", 1),
      new Service(2, "Узи почек", 1),
      new Service(3, "Узи почек", 1)
    ];

    category2.services = [
      new Service(4, "Первичная консультация кардиолога", 2),
      new Service(5, "Повторная консультация кардиолога", 2),
    ];

    this._categories = [
      category1,
      category2
    ];

    this._router = router;
  }

  public get categories(): Array<Category> { return this._categories; }

  public checked = (item: Service): boolean => {
    return this._selectedServices.some((x: number): boolean => x === item.id);
  }

  public check = (item: Service): void => {
    let index: number = this._selectedServices.findIndex((x: number) => x === item.id);

    if (index === -1) {
      this._selectedServices.push(item.id);
    } else {
      this._selectedServices.splice(index, 1);
    }
  }

  public get disabled(): boolean { return this._selectedServices.length === 0; }

  public search = (): void => {
    if (this._selectedServices.length === 0) {
      return;
    }

    this._router.navigate(["suggestions"], { queryParams: { service: this._selectedServices } });


  }

  public clear = (): void => {
    this._selectedServices = [];
  }

}
