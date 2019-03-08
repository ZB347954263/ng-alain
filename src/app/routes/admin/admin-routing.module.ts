import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { AdminListComponent } from './user/list.component';

const routes: Routes = [
  {
    path: 'sysUser',
    children: [
      {
        path: '',
        component: AdminListComponent
      },
    ],
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class AdminRoutingModule {}
