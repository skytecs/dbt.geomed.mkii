import { Component, OnDestroy, OnInit, Renderer2 } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { NgForm, NgModel, AbstractControl } from '@angular/forms';
import { AuthenticationService } from 'src/app/services/authentication.service';
import { first } from 'rxjs/operators';

@Component({
  selector: 'register',
  templateUrl: './register.component.html'
})

export class RegisterComponent implements OnInit, OnDestroy {
  returnUrl: string;
  loading: boolean;

  private _submitted: boolean;

  public firstname: string;
  public lastname: string;
  public email: string;
  public repeatEmail: string;
  public password: string;
  public agreementCheckbox: boolean;

  public emailInput: NgModel;

  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private renderer: Renderer2,
    private authenticationService: AuthenticationService) {
    this.renderer.addClass(document.body, 'bg-white');
  }

  ngOnDestroy() {
    this.renderer.removeClass(document.body, 'bg-white');
  }

  ngOnInit() {
    // reset login status
    this.authenticationService.logout();

    // get return url from route parameters or default to '/'
    this.returnUrl = this.route.snapshot.queryParams['returnUrl'] || '/';
  }

  public get submitted(): boolean { return this._submitted; }

  public resetValidity = (f: NgForm): void => {
    this.resetControlValidity(f.controls["email"], "invalid");
    this.resetControlValidity(f.controls["password"], "invalid");
  }

  private resetControlValidity = (control: AbstractControl, error: string): void => {
    const err = control.errors; // get control errors
    if (err) {
      delete err[error]; // delete your own error
      if (!Object.keys(err).length) { // if no errors left
        control.setErrors(null); // set control errors to null making it VALID
      } else {
        control.setErrors(err); // controls got other errors so set them back
      }

    }
  }

  formSubmit(f: NgForm) {

    this.loading = true;
    this._submitted = true;

    if (f.valid) {
      this.authenticationService.register(f.value["firstname"], f.value["lastname"], f.value["email"], f.value["password"]).pipe(
        first())
        .subscribe(
          data => {
            this.router.navigate([this.returnUrl]);
          },
          error => {
            console.info(error);

            if (error.status === 400) {
              if (error.error !== undefined) {
                if (error.error.status === 80) {
                  f.controls["email"].setErrors({ inUse: true });
                }
              }
            }

            this.loading = false;
          });
    }
  }
}
