import { NgModule, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { RouteReuseStrategy } from '@angular/router';
import { ReactiveFormsModule } from '@angular/forms';
import { HttpClientModule } from "@angular/common/http";
import { NgxDatatableModule } from '@swimlane/ngx-datatable';



import { IonicModule, IonicRouteStrategy } from '@ionic/angular';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';

import { LoginComponent } from './pages/offline/components/login/login.component';
import { CreateAgentComponent } from './pages/online/components/manage-agents/create-agent/create-agent.component';
import { CreateAdminComponent } from './pages/online/components/manage-admins/create-admin/create-admin.component';
import { LoadingComponent } from './common-components/loading/loading.component';
import { DashboardComponent } from './pages/online/components/dashboard/dashboard.component';
import { DriversListComponent } from './pages/online/components/manage-drivers/drivers-list/drivers-list.component';
import { AccountSettingsComponent } from './pages/online/components/account-settings/account-settings.component';
import { AgentsListComponent } from './pages/online/components/manage-agents/agents-list/agents-list.component';
import { AdminsListComponent } from './pages/online/components/manage-admins/admins-list/admins-list.component';
import { SmallLoadingComponent } from './common-components/small-loading/small-loading.component';
import { CarsListComponent } from './pages/online/components/manage-drivers/cars-list/cars-list.component';
import { PaymentsComponent } from './pages/online/components/manage-drivers/payments/payments.component';
import { ViolationsListComponent } from './pages/online/components/manage-drivers/violations-list/violations-list.component';

@NgModule({
  declarations: [
    AppComponent,
    LoginComponent,
    CreateAgentComponent,
    CreateAdminComponent,
    LoadingComponent,
    DashboardComponent,
    DriversListComponent,
    AgentsListComponent,
    AdminsListComponent,
    CreateAgentComponent,
    AccountSettingsComponent,
    SmallLoadingComponent,
    CarsListComponent,
    PaymentsComponent,
    ViolationsListComponent
  ],
  entryComponents: [],
  imports: [
    BrowserModule, 
    IonicModule.forRoot(), 
    AppRoutingModule,
    ReactiveFormsModule,
    HttpClientModule,
    NgxDatatableModule,
  ],
  providers: [{ provide: RouteReuseStrategy, useClass: IonicRouteStrategy }],
  bootstrap: [AppComponent],
  schemas : [CUSTOM_ELEMENTS_SCHEMA]
})
export class AppModule {}
