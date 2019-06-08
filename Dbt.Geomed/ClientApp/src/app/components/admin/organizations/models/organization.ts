export class Organization {
  private _id: number;
  private _name: string;

  private _lat: number;
  private _lon: number;

  public constructor(id: number) {
    this._id = id;
  }

  public get id(): number { return this._id; }

  public get name(): string { return this._name; }
  public set name(value: string) { this._name = value; }

  public get lat(): number { return this._lat; }
  public set lat(value: number) { this._lat = value; }

  public get lon(): number { return this._lon; }
  public set lon(value: number) { this._lon = value; }
}
