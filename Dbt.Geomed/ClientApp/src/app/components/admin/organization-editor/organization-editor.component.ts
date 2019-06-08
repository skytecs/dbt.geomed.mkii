import { Component, OnInit, ViewChild } from '@angular/core';
import { Organization } from './models/organization';
import { OrganizationsEditorService } from './services/organizations-editor.service';
import { ActivatedRoute, Router } from '@angular/router';
import { NgForm } from '@angular/forms';

@Component({
  selector: 'app-organization-editor',
  templateUrl: './organization-editor.component.html',
  styleUrls: ['./organization-editor.component.css'],
  providers: [OrganizationsEditorService]
})
export class OrganizationEditorComponent implements OnInit {
  private _model: Organization

  private _service: OrganizationsEditorService;
  private _route: ActivatedRoute;
  private _router: Router;

  private _submitted: boolean;

  @ViewChild("form") form: NgForm;

  constructor(
    organizationsEditorService: OrganizationsEditorService,
    activatedRoute: ActivatedRoute,
    router: Router

  ) {
    this._service = organizationsEditorService;
    this._route = activatedRoute;
    this._router = router;
  }

  ngOnInit() {

    if (!!this._route.snapshot.paramMap.get("id")) {
      let id: number = parseInt(this._route.snapshot.paramMap.get("id"));

      this._service.load(id)
        .subscribe((result: Organization): void => {
          this._model = result;
        });
    } else {
      this._model = new Organization(undefined);
    }

  }

  public save = (): void => {
    this._submitted = true;

    if (this.form.invalid) {
      return;
    }

    if (!!this._model.id) {
      this._service.update(this._model)
        .subscribe(
          (): void => {
            this._router.navigate(["admin", "organizations"]);
          }
        );
    } else {
      this._service.create(this._model)
        .subscribe(
          (): void => {
            this._router.navigate(["admin", "organizations"]);
          }
        );
    }

  }

  public cancel = (): void => {
    this._router.navigate(["admin", "organizations"]);
  }

  public get model(): Organization { return this._model; }
  public get submitted(): boolean { return this._submitted; }

}
