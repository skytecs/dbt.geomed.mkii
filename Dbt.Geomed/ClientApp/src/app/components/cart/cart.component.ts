import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from "@angular/router";
import { Location } from '@angular/common';

@Component({
  selector: 'app-cart',
  templateUrl: './cart.component.html',
  styleUrls: ['./cart.component.css']
})
export class CartComponent implements OnInit {
  private _location: Location;

  constructor(private router: Router, private activatedRoute: ActivatedRoute, location: Location) {
    this._location = location;
  }

  private _priceIds: Array<number> = [];

  ngOnInit() {
    this._priceIds = this.activatedRoute.snapshot.queryParamMap.getAll("service").map(value => parseInt(value));
  }

  public goBack = (): void => {
    this._location.back();
  }

}
