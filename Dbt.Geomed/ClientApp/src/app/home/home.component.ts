import { Component } from '@angular/core';
import { Category } from './models/category';
import { Service } from './models/service';
import { Router } from '@angular/router';
import { ApiServicesService } from '../api/services/api-services.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ["./home.component.scss"]
})
export class HomeComponent {
  private _categories: Array<Category>;
  private _categoriesCache: Array<Category>;

  private _selectedServices: Array<number>;

  public constructor(private router: Router, private servicesApi: ApiServicesService) {
    this._selectedServices = [];

    servicesApi.GetCategoriesList().subscribe(result => {

      this._categoriesCache = [];

      result.categories.forEach(value => {

        var category = new Category(value.id, value.name);

        for (var service of value.services) {
          category.services.push(new Service(service.id, service.name, category.id));
        }

        this._categoriesCache.push(category);
      })

      this._categories = this._categoriesCache.slice(0);
    });
  }

  public filterString: string;
  public onFilterChange(event) {
    console.info(this.filterString);

    if (!this.filterString) {

      this._categories = this._categoriesCache.slice(0);

      return;
    }

    this._categories = [];
    var tempCategories = [];

    for (var category of this._categoriesCache) {

      var skip = true;

      var newCategory = new Category(category.id, category.name);

      for (var service of category.services) {

        if (service.name.startsWith(this.filterString)) {
          newCategory.services.push(new Service(service.id, service.name, category.id));
          skip = false;
        }

      }

      if (!skip) {
        tempCategories.push(newCategory);
      }
    }

    this._categories = tempCategories.slice(0);

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

    this.router.navigate(["suggestions"], { queryParams: { service: this._selectedServices } });


  }

  public clear = (): void => {
    this._selectedServices = [];
  }

}
