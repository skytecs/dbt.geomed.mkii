import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from "@angular/router";
import { Location } from '@angular/common';
import { ApiServicesService, EmailNotificationsService } from 'src/app/api/services';

@Component({
  selector: 'app-cart',
  templateUrl: './cart.component.html',
  styleUrls: ['./cart.component.css']
})
export class CartComponent implements OnInit {
  private _location: Location;

  constructor(private router: Router,
    private activatedRoute: ActivatedRoute,
    private api: ApiServicesService,
    private sender: EmailNotificationsService,
      location: Location) {
    this._location = location;
  }

  private _priceIds: Array<number> = [];
  public cartItems: Array<CartItem> = [];

  public lastname: string;
  public firstname: string;
  public phone: string;

  ngOnInit() {
    this._priceIds = this.activatedRoute.snapshot.queryParamMap.getAll("service").map(value => parseInt(value));

    this.api.GetCartPrices(this._priceIds).subscribe(result => {

      result.prices.forEach(value => {
        this.cartItems.push({ name: value.name, company: value.company, price: value.amount, address: value.address });
      });

    });
  }

  public goBack = (): void => {
    this._location.back();
  }

  public submit() {
    this.sender.NotifyCompanies({ Firstname: this.firstname, Lastname: this.lastname, Phone: this.phone, PriceIds: this._priceIds }).subscribe();
  }

}

export class CartItem {
  public name: string;
  public price: number;
  public company: string;
  public address: string;
}
