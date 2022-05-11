import { NgModule } from '@angular/core';
import { PreloadAllModules, RouterModule, Routes } from '@angular/router';
import { LoginComponent } from './pages/offline/components/login/login.component';
import { DashboardComponent } from './pages/online/components/dashboard/dashboard.component';
import { CreateAgentComponent } from './pages/online/components/manage-agents/create-agent/create-agent.component';
import { CreateAdminComponent } from './pages/online/components/manage-admins/create-admin/create-admin.component';
import { LoggedOutGuard } from './guards/logged-out/logged-out.guard';
import { AuthenticatedGuard } from './guards/authenticated/authenticated.guard';
import { DriversListComponent } from './pages/online/components/manage-drivers/drivers-list/drivers-list.component';
import { AdminsListComponent } from './pages/online/components/manage-admins/admins-list/admins-list.component';
import { AgentsListComponent } from './pages/online/components/manage-agents/agents-list/agents-list.component';
import { AccountSettingsComponent } from './pages/online/components/account-settings/account-settings.component';
import { CarsListComponent } from './pages/online/components/manage-drivers/cars-list/cars-list.component';
import { PaymentsComponent } from './pages/online/components/manage-drivers/payments/payments.component';
import { ViolationsListComponent } from './pages/online/components/manage-drivers/violations-list/violations-list.component';
import { ParkingLotsListComponent } from './pages/online/components/manage-parking-lots/parking-lots-list/parking-lots-list.component';
import { MunicipalZonesListComponent } from './pages/online/components/manage-municipal-car-zones/municipal-zones-list/municipal-zones-list.component';
import { CreateMunicipalZoneComponent } from './pages/online/components/manage-municipal-car-zones/create-municipal-zone/create-municipal-zone.component';
import { CreateParkingLotComponent } from './pages/online/components/manage-parking-lots/create-parking-lot/create-parking-lot.component';

const routes: Routes = [
  {path: "", canActivate: [LoggedOutGuard], children: [
    {path: "", component: LoginComponent}

  ]},

  {path: "dashboard", component: DashboardComponent, canActivate: [AuthenticatedGuard], children: [
    {path: "manage_drivers", children: [
      {path: "", component: DriversListComponent},
      {path: "cars/:username", component: CarsListComponent},
      {path: "payments/:username", component: PaymentsComponent},
      {path: "cars/violations/:username/:carSerialNumber", component: ViolationsListComponent}
    ]},
    {path: "", redirectTo: "manage_drivers", pathMatch: "full"},
    {path: "account_settings", component: AccountSettingsComponent},


    {path: "manage_admins", children: [
      {path: "", component: AdminsListComponent},
      {path: "create_admin", component: CreateAdminComponent},
    ]},

    {path: "manage_agents", children: [
      {path: "", component: AgentsListComponent},
      {path: "create_agent", component: CreateAgentComponent},
    ]},

    {path: "manage_parking_lots", children: [
      {path: "", component: ParkingLotsListComponent},
      {path: "create_parking_lot", component: CreateParkingLotComponent},
    ]},

    {path: "manage_municipal_car_zones", children: [
      {path: "", component: MunicipalZonesListComponent},
      {path: "create_municipal_zone", component: CreateMunicipalZoneComponent},
    ]}



  ]}
];
@NgModule({
  imports: [
    RouterModule.forRoot(routes, { preloadingStrategy: PreloadAllModules })
  ],
  exports: [RouterModule]
})
export class AppRoutingModule {}
