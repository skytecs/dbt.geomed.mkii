import { Injectable } from "@angular/core";
import { HttpClient } from "@angular/common/http";
import { Organization } from "../models/organization";
import { Observable } from "rxjs";
import { from } from 'rxjs';
import { map } from "rxjs/operators";


@Injectable()
export class OrganizationsService {
  private _httpClient: HttpClient;

  public constructor(httpClient: HttpClient) {
    this._httpClient = httpClient;
  }

  public load = (): Observable<Array<Organization>> => {

    const url = "api/organizations";
    return this._httpClient.get<Array<OrganizationContract>>(url)
      .pipe(
        map((value: Array<OrganizationContract>): Array<Organization> => {
          return value.map((x: OrganizationContract): Organization => this.createOrganization(x));
        })
      );
  };

  private createOrganization = (contract: OrganizationContract): Organization => {
    const organization: Organization = new Organization(contract.id, contract.name, contract.address);

    return organization;
  };
}



class OrganizationContract {
  public id: number;
  public name: string;
  public address: string;
  public lat: number;
  public lng: number;
}
