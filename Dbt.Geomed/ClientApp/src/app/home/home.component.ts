import { Component } from '@angular/core';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ["./home.component.scss"]
})
export class HomeComponent {
  private _step: number;

  public constructor() {
    this._step = 0;
  }

  public get step(): number { return this._step; }

  public next = (): void => {
    this._step++;
  }

}
