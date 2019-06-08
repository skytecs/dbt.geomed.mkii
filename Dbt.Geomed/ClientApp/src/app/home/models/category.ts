import { Service } from "./service";

export class Category {
  private _id: number;
  private _name: string;

  private _services: Array<Service>;

  public constructor(id: number, name: string) {
    this._id = id;
    this._name = name;

    this._services = [];
  }

  public get id(): number { return this._id; }
  public get name(): string { return this._name; }

  public get services(): Array<Service> { return this._services; }
  public set services(value: Array<Service>) { this._services = value; }

}
