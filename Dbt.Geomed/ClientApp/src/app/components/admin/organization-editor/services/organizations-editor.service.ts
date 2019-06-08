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
  };

  public update = (model: Organization): Observable<Organization> => {
    const contract: OrganizationContract = this.CreateOrganizationContract(model);

    this._httpClient.put<Organization>("api/organizations", contract);
    return from([model]);
  };

  public create = (model: Organization): Observable<Organization> => {
    const contract: OrganizationContract = this.CreateOrganizationContract(model);

    this._httpClient.post<OrganizationContract>("api/organizations", contract);
    return from([model]);
  };

  private CreateOrganizationContract = (organization: Organization): OrganizationContract => {
    const contract: OrganizationContract = new OrganizationContract();

    contract.id = organization.id;
    contract.name = organization.name;
    contract.email = organization.email;
    contract.address = organization.address;
    return contract;
  }
}

class OrganizationContract {
  public id: number;
  public name: string;
  public address: string;
  public email: string;
  public lat: number;
  public lng: number;
}

