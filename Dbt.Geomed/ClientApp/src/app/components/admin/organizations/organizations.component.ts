import { Component, OnInit } from '@angular/core';
import { OrganizationsService } from './services/organizations.service';
import { Organization } from './models/organization';

@Component({
  selector: 'app-organizations',
  templateUrl: './organizations.component.html',
  styleUrls: ['./organizations.component.scss'],
  providers: [OrganizationsService]
})
export class OrganizationsComponent implements OnInit {
  private _organizationsService: OrganizationsService;

  private _collection: Array<Organization>;

  constructor(organizationsService: OrganizationsService) {
    this._organizationsService = organizationsService;
  }

  ngOnInit() {
    this._organizationsService.load().subscribe((result: Array<Organization>): void => {
      this._collection = result;
    });
  }

  public get collection(): Array<Organization> { return this._collection; }
}
