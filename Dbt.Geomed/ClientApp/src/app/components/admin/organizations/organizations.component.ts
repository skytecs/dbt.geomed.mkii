import { Component, OnInit } from '@angular/core';
import { OrganizationsService } from './services/organizations.service';
import { Organization } from './models/organization';
import { Router } from '@angular/router';

@Component({
  selector: 'app-organizations',
  templateUrl: './organizations.component.html',
  styleUrls: ['./organizations.component.scss'],
  providers: [OrganizationsService]
})
export class OrganizationsComponent implements OnInit {
  private _organizationsService: OrganizationsService;

  private _collection: Array<Organization>;
  private _router: Router;

  constructor(organizationsService: OrganizationsService, router: Router) {
    this._organizationsService = organizationsService;
    this._router = router;
  }

  ngOnInit() {
    this._organizationsService.load().subscribe((result: Array<Organization>): void => {
      this._collection = result;
    });
  }

  public get collection(): Array<Organization> { return this._collection; }

  public create = (): void => {
    this._router.navigate(["admin", "organizations", "add"]);
  }

  public edit = (organization: Organization): void => {
    this._router.navigate(["admin", "organizations", organization.id]);
  }

  public remove = (organization: Organization): void => {

  }
}
