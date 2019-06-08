import { Injectable } from "@angular/core";
import { HttpClient } from "@angular/common/http";
import { Observable, from } from "rxjs";
import { Organization } from "../models/organization";

@Injectable()
export class OrganizationsEditorService {
  private _httpClient: HttpClient;

  public constructor(httpClient: HttpClient) {
    this._httpClient = httpClient;
  }

  public load = (id: number): Observable<Organization> => {

    let organization = new Organization(id);
    organization.name = "Больница №1";
    organization.lat = 25.5000;
    organization.lgt = 88.45;

    return from([organization]);
  }

  public update = (model: Organization): Observable<Organization> => {

    return from([model]);
  }

  public create = (model: Organization): Observable<Organization> => {
    return from([model]);
  }
}
