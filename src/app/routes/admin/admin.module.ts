import { NgModule } from '@angular/core';

import { SharedModule } from '@shared';
import { AdminRoutingModule } from './admin-routing.module';
import { SysUserListComponent } from './user/list.component';
import { SysUserService } from './user/sysUser.service';
import { SellerListComponent } from './seller/list.component';
import { SellerService } from './seller/seller.service';

/**
 * 组件页面
 */
const COMPONENTS = [
  SysUserListComponent,
  SellerListComponent
];
/**
 * service
 */
const SSERVICES = [
  SysUserService,
  SellerService
];

@NgModule({
  imports: [SharedModule, AdminRoutingModule],
  declarations: [ ...COMPONENTS ],
  entryComponents: [],
  providers:[ ...SSERVICES]
})
export class AdminModule {}
