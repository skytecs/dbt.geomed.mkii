import { Injectable } from "@angular/core";
import { HttpClient } from "@angular/common/http";
import { Organization } from "../models/organization";
import { Observable } from "rxjs";
import { from } from 'rxjs';


@Injectable()
export class OrganizationsService {
  private _httpClient: HttpClient;

  public constructor(httpClient: HttpClient) {
    this._httpClient = httpClient;
  }

  public load = (): Observable<Array<Organization>> => {
    const o1: Organization = new Organization(1, "городская больница №1");
    const o2: Organization = new Organization(2, "городская больница №2");
    const o3: Organization = new Organization(3, "городская больница №4");

    const array: Array<Organization> = [o1, o2, o3];

    return from([array]);
  }
}
