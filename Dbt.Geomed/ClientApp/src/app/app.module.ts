import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { RouterModule } from '@angular/router';
import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';

import { AppComponent } from './app.component';
import { NavMenuComponent } from './nav-menu/nav-menu.component';
import { HomeComponent } from './home/home.component';
import { DashboardComponent } from './components/admin/dashboard/dashboard.component';
import { AdminComponent } from './components/admin/admin.component';
import { ServicesComponent } from './components/admin/services/services.component';
import { ServiceEditorComponent } from './components/admin/service-editor/service-editor.component';
import { OrganizationsComponent } from './components/admin/organizations/organizations.component';
import { OrganizationEditorComponent } from './components/admin/organization-editor/organization-editor.component';
import { HeaderComponent } from './components/header/header.component';

import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { SuggestionComponent } from './components/suggestion/suggestion.component';
import { AnonymousComponent } from './components/anonymous/anonymous.component';
import { LoginComponent } from './components/anonymous/login/login.component';
import { RegisterComponent } from './components/anonymous/register/register.component';
import { makeAnimationEvent } from '@angular/animations/browser/src/render/shared';
import { MainComponent } from './components/main/main.component';
import { AuthGuard } from './utility/auth.guard';
import { ApiModule } from './api/api.module';
import { JwtInterceptor } from './utility/jwt.interceptor';
import { AuthenticationService } from './services/authentication.service';
import { CartComponent } from './components/cart/cart.component';

@NgModule({
  declarations: [
    AppComponent,
    NavMenuComponent,
    HomeComponent,
    DashboardComponent,
    AdminComponent,
    ServicesComponent,
    ServiceEditorComponent,
    OrganizationsComponent,
    OrganizationEditorComponent,
    HeaderComponent,
    SuggestionComponent,
    AnonymousComponent,
    LoginComponent,
    RegisterComponent,
    MainComponent,
    CartComponent
  ],
  imports: [
    BrowserModule.withServerTransition({ appId: 'ng-cli-universal' }),
    HttpClientModule,
    FormsModule,
    ApiModule,
    NgbModule.forRoot(),
    RouterModule.forRoot([
      { path: "", redirectTo: "/home", pathMatch: "full" },
      {
        path: "admin",
        component: AdminComponent,
        canActivateChild: [AuthGuard],
        children: [
          {
            path: "",
            data: { title: "Админиcтрирование" },
            component: DashboardComponent,
          },
          {
            path: "organizations",
            children: [
              {
                path: "add",
                component: OrganizationEditorComponent
              },
              {
                path: ":id",
                component: OrganizationEditorComponent
              },
              {
                path: "",
                component: OrganizationsComponent
              }
            ]
          },
          {
            path: "services",
            children: [
              {
                path: "{id}",
                component: ServiceEditorComponent
              },
              {
                path: "",
                component: ServicesComponent
              }
            ]
          }
        ]
      },
      {
        path: "",
        component: AnonymousComponent,
        children: [
          {
            path: "login",
            component: LoginComponent
          },
          {
            path: "register",
            component: RegisterComponent
          }
        ]
      },
      {
        path: "",
        component: MainComponent,
        children: [
          { path: 'home', component: HomeComponent },
          { path: "suggestions", component: SuggestionComponent },
          { path: "cart", component: CartComponent }
        ]
      }

    ])
  ],
  providers: [
    AuthenticationService,
    AuthGuard,
    {
      provide: HTTP_INTERCEPTORS,
      useClass: JwtInterceptor,
      multi: true
    }],
  bootstrap: [AppComponent]
})
export class AppModule { }
