export class SuggestedService {
  private _id: number;
  private _name: string;
  private _price: number;
  private _oms: boolean;
  private _organizationId: number;

  public constructor(id: number, name: string, price: number, oms: boolean, organizationId: number) {
    this._id = id;
    this._name = name;
    this._price = price;
    this._oms = oms;
    this._organizationId = organizationId;
  }

  public get id(): number { return this._id; }
  public get name(): string { return this._name; }
  public get price(): number { return this._price; }
  public get oms(): boolean { return this._oms; }
  public get organizationId(): number { return this._organizationId; }

  public get displayedPrice(): string {
    if (this._oms) {
      return "по ОМС";
    }

    if (!this._price) {
      return "бесплатно";
    }

    return `${this._price}₽`;
  }
}
