import { NgModule } from '@angular/core';
import { PreloadAllModules, RouterModule, Routes } from '@angular/router';
import { LoginComponent } from './pages/offline/components/login/login.component';
import { DashboardComponent } from './pages/online/components/dashboard/dashboard.component';
import { CreateAgentComponent } from './pages/online/components/manage-agents/create-agent/create-agent.component';
import { CreateAdminComponent } from './pages/online/components/manage-admins/create-admin/create-admin.component';
import { LoggedOutGuard } from './guards/logged-out/logged-out.guard';
import { AuthenticatedGuard } from './guards/authenticated/authenticated.guard';
import { DriversListComponent } from './pages/online/components/manage-drivers/drivers-list/drivers-list.component';

const routes: Routes = [
  {path: "", canActivate: [LoggedOutGuard], children: [
    {path: "", component: LoginComponent}

  ]},

  {path: "dashboard", canActivate: [AuthenticatedGuard], children: [
    {path: "", component: DashboardComponent},

    {path: "manage_driver", component: DriversListComponent}

  ]}
];
@NgModule({
  imports: [
    RouterModule.forRoot(routes, { preloadingStrategy: PreloadAllModules })
  ],
  exports: [RouterModule]
})
export class AppRoutingModule {}
