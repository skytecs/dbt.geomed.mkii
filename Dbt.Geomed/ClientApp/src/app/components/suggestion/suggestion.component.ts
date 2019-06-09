import { Component, OnInit } from '@angular/core';
import { SuggestedOrganization } from './models/suggested-organization';
import { SuggestedService } from './models/suggested-service';
import { Service } from 'src/app/home/models/service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-suggestion',
  templateUrl: './suggestion.component.html',
  styleUrls: ['./suggestion.component.css']
})
export class SuggestionComponent implements OnInit {
  private _services: Array<Service>;
  private _selectedServices: Array<number>;
  private _organizations: Array<SuggestedOrganization>;
  private _selectedSort: SortOrder;

  private _router: Router;

  constructor(router: Router) {
    this._router = router;

    let org1 = new SuggestedOrganization(1, "Городская больница №1", "ул. Ленина, 28", 6000);
    org1.services = [
      new SuggestedService(1, "УЗИ почек", 1500, false, org1.id),
      new SuggestedService(2, "Первичная консультация кардиолога", undefined, true, org1.id),
    ];

    let org2 = new SuggestedOrganization(1, "Психоневрологический диспансер", "ул. Зоологическая, 19", 3200);
    org2.services = [
      new SuggestedService(3, "УЗИ почек", 1200, false, org2.id),
    ];

    this._organizations = [org1, org2];

    this._services = [
      new Service(1, "УЗИ почек", 1),
      new Service(2, "Первичная консультация кардиолога", 1)
    ];

    this._selectedSort = SortOrder.Catch;
    this._selectedServices = [];
  }

  ngOnInit() {
  }

  public get organizations(): Array<SuggestedOrganization> { return this._organizations; }
  public get services(): Array<Service> { return this._services; }

  public get sortOrder(): SortOrder { return this._selectedSort; }

  public sortBy = (order: SortOrder): void => {
    switch (order) {
      case SortOrder.Catch:
        this._selectedSort = SortOrder.Catch;
        this._organizations = this._organizations
          .sort((a: SuggestedOrganization, b: SuggestedOrganization): number => {
            return b.services.length - a.services.length;
          });
        break;
      case SortOrder.Price:
        this._selectedSort = SortOrder.Price;
        this._organizations = this._organizations
          .sort((a: SuggestedOrganization, b: SuggestedOrganization): number => {
            return (b.services.length - a.services.length) * 100000 + a.total - b.total;
          });
        break;
      case SortOrder.Distance:
        this._selectedSort = SortOrder.Distance;
        this._organizations = this._organizations
          .sort((a: SuggestedOrganization, b: SuggestedOrganization): number => {
            return a.distance - b.distance;
          });
        break;
    }

  }

  public checked = (item: SuggestedService): boolean => {
    return this._selectedServices.some((x: number): boolean => x === item.id);
  }

  public check = (item: SuggestedService): void => {
    let index: number = this._selectedServices.findIndex((x: number): boolean => x === item.id);

    if (index === -1) {
      this._selectedServices.push(item.id);
    } else {
      this._selectedServices.splice(index, 1);
    }

  }

  public clear = (): void => {
    this._selectedServices = [];
  }

  public get disabled(): boolean { return this._selectedServices.length === 0; }

  public next = (): void => {
    if (this._selectedServices.length === 0) {
      return;
    }
    this._router.navigate(["cart"], { queryParams: { service: this._selectedServices } });
  }
}

enum SortOrder {
  Catch = 1,
  Price = 2,
  Distance = 3
}
