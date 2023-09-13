import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';

import { TemplateModule } from './template/template.module';
import { HomeComponent } from './home/home.component';
import { CandidatesModule } from './candidates/candidates.module';
import { CandidatesService } from './candidates.service';
import { HTTP_INTERCEPTORS, HttpClientModule } from '@angular/common/http';
import { LoginComponent } from './login/login.component';
import { FormsModule } from '@angular/forms';
import { AuthService } from './auth.service';
import { LayoutComponent } from './layout/layout.component';
import { TokenInterceptor } from './token.interceptor';
import { DashboardService } from './dashboard.service';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { ReactiveFormsModule } from '@angular/forms';
import { NgxPaginationModule } from 'ngx-pagination';

@NgModule({
  declarations: [AppComponent, HomeComponent, LoginComponent, LayoutComponent],
  imports: [
    BrowserModule,
    FormsModule,
    AppRoutingModule,
    TemplateModule,
    CandidatesModule,
    HttpClientModule,
    BrowserAnimationsModule,
    NgxPaginationModule,
    ReactiveFormsModule,
    BrowserAnimationsModule,
  ],
  providers: [
    CandidatesService,
    AuthService,
    DashboardService,
    {
      provide: HTTP_INTERCEPTORS,
      useClass: TokenInterceptor,
      multi: true,
    },
  ],
  bootstrap: [AppComponent],
})
export class AppModule {}
