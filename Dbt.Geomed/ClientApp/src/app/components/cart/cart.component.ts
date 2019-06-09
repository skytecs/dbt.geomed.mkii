import { Component, OnInit } from '@angular/core';
import {Router, ActivatedRoute} from "@angular/router";

@Component({
  selector: 'app-cart',
  templateUrl: './cart.component.html',
  styleUrls: ['./cart.component.css']
})
export class CartComponent implements OnInit {
  constructor(private router: Router, private activatedRoute: ActivatedRoute)  {  }

  private _priceIds: Array<number> = [];

  ngOnInit() {
    this._priceIds = this.activatedRoute.snapshot.queryParamMap.getAll("service").map(value => parseInt(value));
  }

}
