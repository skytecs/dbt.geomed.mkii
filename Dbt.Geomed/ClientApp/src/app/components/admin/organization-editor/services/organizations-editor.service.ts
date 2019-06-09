import { Injectable } from "@angular/core";
import { HttpClient } from "@angular/common/http";
import { Observable, from } from "rxjs";
import { Organization } from "../models/organization";
import { ApiOrganizationsService } from "../../../../api/services/api-organizations.service";
import { map } from "rxjs/operators";
import { reserveSlots } from "@angular/core/src/render3/instructions";

@Injectable()
export class OrganizationsEditorService {
  public constructor(private api: ApiOrganizationsService) {  }

  public load = (id: number): Observable<Organization> => {

    let organization = this.api.GetOrganization(id).pipe(map(item => {
      var result = new Organization(item.id);
      result.address = item.address;
      result.email = item.email;
      result.lat = item.lat;
      result.lgt = item.lng;
      result.name = item.name;


    }));

    return organization;
  };

  public update = (model: Organization): Observable<Organization> => {
    this.api.UpdateOrganization({
      Address: model.address,
      Email: model.email,
      Id: model.id,
      Lat: model.lat,
      Lng: model.lgt,
      Name: model.name
    });
    return from([model]);
  };

  public create = (model: Organization): Observable<Organization> => {

    this.api.CreateOrganization({
      Address: model.address,
      Email: model.email,
      Id: model.id,
      Lat: model.lat,
      Lng: model.lgt,
      Name: model.name
    });
    return from([model]);
  };

}


