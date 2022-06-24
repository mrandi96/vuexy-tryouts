import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { NgSelectModule } from '@ng-select/ng-select';
import { NgxDatatableModule } from '@swimlane/ngx-datatable';
import { NgApexchartsModule } from 'ng-apexcharts';
import { PerfectScrollbarModule } from 'ngx-perfect-scrollbar';

import { AuthGuard } from 'app/auth/helpers';
import { Role } from 'app/auth/models';

import { CoreCommonModule } from '@core/common.module';
import { ContentHeaderModule } from 'app/layout/components/content-header/content-header.module';

import { ApplicationsService } from 'app/services/applications.service';

import { ApplicationsComponent } from 'app/main/management/applications/applications.component';
import { AddApplicationComponent } from './applications/add-application/add-application.component';
import { AddUserComponent } from './user/add-user/add-user.component';
import { UserComponent } from './user/user.component';

const routes: Routes = [
  {
    path: 'applications',
    component: ApplicationsComponent,
    canActivate: [AuthGuard],
    data: { roles: [Role.Admin], animation: 'dapplications' },
    resolve: {
      css: ApplicationsService
    }
  },

  {
    path: 'user',
    component: UserComponent,
    canActivate: [AuthGuard],
    data: { roles: [Role.Admin], animation: 'duser' },
    resolve: {
      css: ApplicationsService
    }
  }
];

@NgModule({
  declarations: [ApplicationsComponent, AddApplicationComponent, UserComponent, AddUserComponent],
  imports: [
    CommonModule,
    RouterModule.forChild(routes),
    NgbModule,
    PerfectScrollbarModule,
    CoreCommonModule,
    NgApexchartsModule,
    NgxDatatableModule,
    ContentHeaderModule,
    NgSelectModule
  ],
  providers: [ApplicationsService],
  exports: []
})
export class ManagementModule { }
