import { Component, OnInit } from '@angular/core';
import { SuggestedOrganization } from './models/suggested-organization';
import { SuggestedService } from './models/suggested-service';
import { Service } from 'src/app/home/models/service';
import { Router, ActivatedRoute } from '@angular/router';
import { ApiServicesService } from 'src/app/api/services';
import { Locator } from "src/app/services/locator";
import { PricesViewModel, CompanyItem, ServiceItem, CategoryServiceItem } from 'src/app/api/models';
import { Organization } from '../admin/organizations/models/organization';
import { subscribeOn } from 'rxjs/operators';
@Component({
  selector: 'app-suggestion',
  templateUrl: './suggestion.component.html',
  styleUrls: ['./suggestion.component.css'],
  providers: [Locator, ApiServicesService]
})
export class SuggestionComponent implements OnInit {
  private _services: Array<Service>;
  private _selectedServices: Array<number>;
  private _organizations: Array<SuggestedOrganization>;
  private _selectedSort: SortOrder;

  private _router: Router;
  private _service: ApiServicesService;
  private _locatior: Locator;
  private _activatedRoute: ActivatedRoute;

  constructor(router: Router, servicesApi: ApiServicesService, locator: Locator, activatedRoute: ActivatedRoute) {
    this._router = router;
    this._locatior = locator;
    this._service = servicesApi;
    this._activatedRoute = activatedRoute;

    this._organizations = [];

    this._services = [
      new Service(1, "УЗИ почек", 1),
      new Service(2, "Первичная консультация кардиолога", 1)
    ];

    this._selectedSort = SortOrder.Catch;
    this._selectedServices = [];
  }

  ngOnInit() {
    let serviceIds: Array<number> = this._activatedRoute.snapshot
      .queryParamMap.getAll("service").map(value => parseInt(value));

    this._service.GetServicesForSuggestions(serviceIds)
      .subscribe((result: Array<CategoryServiceItem>): void => {
        this._services = result.map((x: CategoryServiceItem): Service => new Service(x.id, x.name, 0));
      });

    this._locatior.getPosition().then((value: any): void => {
      this._service.GetServicesList({ ServiceIds: serviceIds, Lng: value.longitude, Lat: value.latitude })
        .subscribe((result: PricesViewModel): void => {
          this._organizations = result.companies.map((o: CompanyItem): SuggestedOrganization => {
            const organization: SuggestedOrganization = new SuggestedOrganization(o.id, o.name, "", o.distance);

            organization.services = o.services.map((s: ServiceItem): SuggestedService => {
              const service: SuggestedService = new SuggestedService(s.id, s.name, s.amount, s.isNhi, o.id);

              return service;

            });

            return organization;
          });
        })

      console.info(value);
    });

  }

  public get filters(): string {
    return this._services.map((x: Service): string => x.name).join(", ");
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
