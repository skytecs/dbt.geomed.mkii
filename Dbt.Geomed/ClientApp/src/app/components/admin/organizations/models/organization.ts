export class Organization {
  private _id: number;
  private _name: string;
  private _address: string;

  public constructor(id: number, name: string, address: string) {
    this._id = id;
    this._name = name;
    this._address = address;
  }

  public get id(): number { return this._id; }
  public get name(): string { return this._name; }
  public get address(): string { return this._address; }

}
