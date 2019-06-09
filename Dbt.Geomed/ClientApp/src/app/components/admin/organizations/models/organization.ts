export class Organization {
  private _id: number;
  private _name: string;
  private _address: string;

  private _email: string;


  private _lat: number;
  private _lon: number;

  public constructor(id: number) {
    this._id = id;
  }

  public get id(): number { return this._id; }

  public get name(): string { return this._name; }
  public set name(value: string) { this._name = value; }

  public get address(): string { return this._address; }
  public set address(value: string) { this._address = value; }

  public get email(): string { return this._email; }
  public set email(value: string) { this._email = value; }

  public get lat(): number { return this._lat; }
  public set lat(value: number) { this._lat = value; }

  public get lgt(): number { return this._lon; }
  public set lgt(value: number) { this._lon = value; }
}
