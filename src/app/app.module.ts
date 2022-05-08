import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { RouteReuseStrategy } from '@angular/router';
import { ReactiveFormsModule } from '@angular/forms';
import { HttpClientModule } from "@angular/common/http";

import { IonicModule, IonicRouteStrategy } from '@ionic/angular';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { LoginComponent } from './pages/offline/components/login/login.component';
import { CreateAgentComponent } from './pages/online/components/manage-agents/create-agent/create-agent.component';
import { CreateAdminComponent } from './pages/online/components/manage-admins/create-admin/create-admin.component';
import { LoadingComponent } from './common-components/loading/loading.component';
import { DashboardComponent } from './pages/online/components/dashboard/dashboard.component';

@NgModule({
  declarations: [
    AppComponent,
    LoginComponent,
    CreateAgentComponent,
    CreateAdminComponent,
    LoadingComponent,
    DashboardComponent
  ],
  entryComponents: [],
  imports: [
    BrowserModule, 
    IonicModule.forRoot(), 
    AppRoutingModule,
    ReactiveFormsModule,
    HttpClientModule
  ],
  providers: [{ provide: RouteReuseStrategy, useClass: IonicRouteStrategy }],
  bootstrap: [AppComponent],
})
export class AppModule {}
