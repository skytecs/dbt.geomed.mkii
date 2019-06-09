import { SuggestedService } from "./suggested-service";

/** Организация, предоставляющая указанные услуги */
export class SuggestedOrganization {
  private _id: number;
  private _name: string;
  private _address: string;
  private _distance: number;

  private _services: Array<SuggestedService>;

  private _total: number;
  private _oms: boolean;

  public constructor(id: number, name: string, address: string, distance: number) {
    this._id = id;
    this._name = name;
    this._address = address;
    this._distance = distance;
  }

  public get id(): number { return this._id; }
  public get name(): string { return this._name; }
  public get address(): string { return this._address; }
  public get distance(): number { return this._distance; }

  public get services(): Array<SuggestedService> { return this._services; }
  public set services(value: Array<SuggestedService>) {
    this._services = value;

    this._total = value
      .filter((x: SuggestedService): boolean => !x.oms)
      .map((x: SuggestedService): number => x.price || 0)
      .reduce((x: number, y: number): number => x + y, 0);

    this._oms = value.every((x: SuggestedService): boolean => x.oms);
  }

  public get displayedDistance(): string {
    if (!this._distance) {
      return "N/A";
    }

    if (this._distance < 1000) {
      return ">1км";
    }

    let rounded: number = Math.round(this._distance / 1000);

    return `${rounded}км`;
  }

  public get displayedPrice(): string {
    if (this._oms) {
      return "по ОМС";
    }

    if (this._total === 0) {
      return "бесплатно";
    }

    return `${this._total}₽`;
  }

  public get close(): boolean { return this._distance < 5000; }
  public get total(): number { return this._total; }
  public get length(): number { return this._services.length; }

  public get totalFor(): string {
    let p: number = this._services.length % 10;

    switch (p) {
      case 1:
        return `за ${this.length} услугу`;
      case 2:
      case 3:
      case 4:
        return `за ${this.length} услуги`;
      default:
        return `за ${this.length} услуг`;
    }

  }
}

