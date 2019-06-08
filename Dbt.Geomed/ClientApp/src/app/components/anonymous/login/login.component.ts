import { Component, OnDestroy, Renderer2 } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { NgForm, AbstractControl } from '@angular/forms';
import { AuthenticationService } from 'src/app/services/authentication.service';
import { first } from 'rxjs/operators';

@Component({
  selector: 'login',
  templateUrl: './login.component.html'
})

export class LoginComponent implements OnDestroy {

  returnUrl: string;
  loading: boolean;

  private _submitted: boolean;

  public email: string;
  public password: string;
  public rememberMe: boolean;

  public f: NgForm;

  constructor(private route: ActivatedRoute,
    private router: Router,
    private renderer: Renderer2,
    private authenticationService: AuthenticationService) {
    this.renderer.addClass(document.body, 'bg-white');
  }

  ngOnInit() {
    // reset login status
    this.authenticationService.logout();


    // get return url from route parameters or default to '/'
    this.returnUrl = this.route.snapshot.queryParams['returnUrl'] || '/';

  }

  ngOnDestroy() {
    this.renderer.removeClass(document.body, 'bg-white');
  }

  getReturnUrl() {
    return this.returnUrl;
  }

  public get submitted(): boolean { return this._submitted; }

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


  public resetValidity = (f: NgForm): void => {
    this.resetControlValidity(f.controls["email"], "invalid");
    this.resetControlValidity(f.controls["password"], "invalid");
  }

  formSubmit(f: NgForm) {
    this._submitted = true;

    this.loading = true;

    if (f.valid) {
      this.authenticationService.login(f.value["email"], f.value["password"]).pipe(first())
        .subscribe(
          data => {
            this.router.navigateByUrl(this.router.parseUrl(this.returnUrl));
          },
          error => {
            if (error.status === 403) {
              f.controls["email"].setErrors({ "invalid": true });
              f.controls["password"].setErrors({ "invalid": true });
            }

            this.loading = false;
          });
    }
  }
}
