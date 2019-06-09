import { Component, OnInit } from '@angular/core';
import {Router} from "@angular/router";

@Component({
  selector: 'app-cart',
  templateUrl: './cart.component.html',
  styleUrls: ['./cart.component.css']
})
export class CartComponent implements OnInit {
  private _router: Router;
  constructor(router: Router)
  {
    this._router = router;
  }

  ngOnInit() {
  }

}
