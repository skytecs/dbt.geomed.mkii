export class Service {
  private _id: number;
  private _name: string;
  private _categoryId: number;

  public constructor(id: number, name: string, categoryId: number) {
    this._id = id;
    this._name = name;
    this._categoryId = categoryId;
  }

  public get id(): number { return this._id; }
  public get name(): string { return this._name; }
  public get categoryId(): number { return this._categoryId; }
}
