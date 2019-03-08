import { NgModule } from '@angular/core';

import { SharedModule } from '@shared';
import { AdminRoutingModule } from './admin-routing.module';
import { AdminListComponent } from './user/list.component';
import { SysUserService } from './user/sysUser.service';

/**
 * 组件页面
 */
const COMPONENTS = [
  AdminListComponent
];
/**
 * service
 */
const SSERVICES = [
  SysUserService
];

@NgModule({
  imports: [SharedModule, AdminRoutingModule],
  declarations: [ ...COMPONENTS ],
  entryComponents: [],
  providers:[ ...SSERVICES]
})
export class AdminModule {}
