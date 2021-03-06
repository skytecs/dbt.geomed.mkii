import { Component, OnInit } from '@angular/core';
import { SuggestedOrganization } from './models/suggested-organization';
import { SuggestedService } from './models/suggested-service';
import { Service } from 'src/app/home/models/service';
import { Router, ActivatedRoute } from '@angular/router';
import { ApiServicesService } from 'src/app/api/services';
import { Locator } from "src/app/services/locator";
import { PricesViewModel, CompanyItem, ServiceItem, CategoryServiceItem } from 'src/app/api/models';

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

  private _serviceIds: Array<number>;
  private _lat: number;
  private _lng: number;

  private _router: Router;
  private _service: ApiServicesService;
  private _locatior: Locator;
  private _activatedRoute: ActivatedRoute;

  private _showMap: boolean;
  private _src: string;

  constructor(router: Router, servicesApi: ApiServicesService, locator: Locator, activatedRoute: ActivatedRoute) {
    this._router = router;
    this._locatior = locator;
    this._service = servicesApi;
    this._activatedRoute = activatedRoute;

    this._organizations = [];
    this._serviceIds = [];

    this._services = [];

    this._selectedSort = SortOrder.Catch;
    this._selectedServices = [];
  }

  ngOnInit() {
    this._serviceIds = this._activatedRoute.snapshot
      .queryParamMap.getAll("service").map(value => parseInt(value));

    this._service.GetServicesForSuggestions(this._serviceIds)
      .subscribe((result: Array<CategoryServiceItem>): void => {
        this._services = result.map((x: CategoryServiceItem): Service => new Service(x.id, x.name, 0));
      });

    this._locatior.getPosition().then((value: any): void => {
      this._lat = value.latitude;
      this._lng = value.longitude;

      let parts: Array<string> = this._serviceIds.map((x: number): string => `companies=${x}`);

      this._src = `/Geo/Map?lat=${this._lat}&lng=${this._lng}&${parts.join("&")}`;
      this._showMap = true;

      this.reload();
    });

  }

  public get showMap(): boolean { return this._showMap; }
  public get src(): string { return this._src; }

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

  private _omsOnly: boolean;
  private _commercialOnly: boolean;

  public get omsOnly(): boolean { return this._omsOnly; }
  public get commercialOnly(): boolean { return this._commercialOnly; }

  public toggleOmsOnly = (): void => {
    if (this._omsOnly) {
      this._omsOnly = false;
    } else {
      this._omsOnly = true;
      this._commercialOnly = false;
    }

    this.reload();
  }

  public toggleCommercialOnly = (): void => {
    if (this._commercialOnly) {
      this._commercialOnly = false;
    } else {
      this._commercialOnly = true;
      this._omsOnly = false;
    }

    this.reload();
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

  public reload = (): void => {

    let params: any = {
      ServiceIds: this._serviceIds,
      Lng: this._lng,
      Lat: this._lat,
      RestrictToCommercial: this._commercialOnly,
      RestrictToFree: this._omsOnly
    };

    this._service.GetServicesList(params)
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


  }
}

enum SortOrder {
  Catch = 1,
  Price = 2,
  Distance = 3
}
