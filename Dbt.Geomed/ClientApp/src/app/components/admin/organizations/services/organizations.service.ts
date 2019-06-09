import { Injectable } from "@angular/core";
import { HttpClient } from "@angular/common/http";
import { Organization } from "../models/organization";
import { Observable } from "rxjs";
import { from } from 'rxjs';
import { map } from "rxjs/operators";
import {ApiOrganizationsService} from "../../../../api/services/api-organizations.service";


@Injectable()
export class OrganizationsService {
  public constructor(private api: ApiOrganizationsService) {
  }

  public load = (): Observable<Array<Organization>> => {

    return this.api.GetOrganizations().pipe(map(list => list.map(item => {
      var result = new Organization(item.id);
      result.address = item.address;
      result.email = item.email;
      result.lat = item.lat;
      result.lgt = item.lng;
      result.name = item.name;
      return result;
    })));
  };
}


