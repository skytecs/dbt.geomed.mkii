import { Component, OnInit } from '@angular/core';
import { Router } from "@angular/router";
import { Location } from '@angular/common';

@Component({
  selector: 'app-cart',
  templateUrl: './cart.component.html',
  styleUrls: ['./cart.component.css']
})
export class CartComponent implements OnInit {
  private _router: Router;
  private _location: Location;

  constructor(router: Router, location: Location) {
    this._router = router;
    this._location = location;
  }

  ngOnInit() {
  }

  public goBack = (): void => {
    this._location.back();
  }

}
