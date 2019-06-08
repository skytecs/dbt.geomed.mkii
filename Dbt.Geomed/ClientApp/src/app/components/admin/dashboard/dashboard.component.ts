import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.scss']
})
export class DashboardComponent implements OnInit {
  private _router: Router;
  constructor(router: Router) {
    this._router = router;
  }

  ngOnInit() {
  }
  public create = (): void => {
    this._router.navigate(["admin", "organizations", "add"]);
  }
}
