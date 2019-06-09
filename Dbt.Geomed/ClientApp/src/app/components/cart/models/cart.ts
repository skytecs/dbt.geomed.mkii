import { Service } from "../../../home/models/service";


export class Cart {

  private _services: Array<Service>;

  private _firstName: string;
  private _lastName: string;
  private _email: string;
  private _phone: string;

  public constructor(firstName: string, lastName: string, email: string, phone: string) {
    this._services = [];
  }


  public get services(): Array<Service> { return this._services; }
  public set services(value: Array<Service>) { this._services = value; }

}
