import { Component, OnInit } from '@angular/core';
import {Router} from "@angular/router";

@Component({
  selector: 'app-suggestion',
  templateUrl: './suggestion.component.html',
  styleUrls: ['./suggestion.component.css']
})
export class SuggestionComponent implements OnInit {

  private _router: Router;
  constructor(router: Router)
  {
    this._router = router;
  }

  ngOnInit() {
  }
  public forward = (): void => {
    this._router.navigate(["cart"]);
  }
}
