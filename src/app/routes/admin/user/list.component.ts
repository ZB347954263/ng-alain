import { Component, OnInit,OnDestroy, ViewChild, TemplateRef, ChangeDetectionStrategy, ChangeDetectorRef } from '@angular/core';
import { NzMessageService, NzModalService } from 'ng-zorro-antd';
import { _HttpClient } from '@delon/theme';
import { tap, map } from 'rxjs/operators';
import { STComponent, STColumn, STData, STChange } from '@delon/abc';
import { SysUserService } from './sysUser.service';

@Component({
  selector: 'app-user-list',
  templateUrl: './list.component.html',
})
export class AdminListComponent implements OnInit, OnDestroy {
  query: any = {
    pi: 0,
    ps: 10,
    sorter: '',
    status: null,
    statusList: [],
  };
  data: any[] = [];
  loading = false;
  status = [
    { index: 0, text: '关闭', value: false, type: 'default', checked: false },
    {
      index: 1,
      text: '运行中',
      value: false,
      type: 'processing',
      checked: false,
    },
    { index: 2, text: '已上线', value: false, type: 'success', checked: false },
    { index: 3, text: '异常', value: false, type: 'error', checked: false },
  ];
  @ViewChild('st')
  st: STComponent;
  columns: STColumn[] = [
    { title: '', index: 'userid', type: 'checkbox' },
    { title: '用户名', index: 'username' },
    { title: '姓名', index: 'empNm',
      sorter: (a: any, b: any) =>  true
    },
    { title: '角色', index: 'roleName' },
    {
      title: '操作',
      buttons: [
        {
          text: '修改',
          click: (item: any) => this.msg.success(`修改${item.userid}`),
        },
        {
          text: '删除',
          click: (item: any) => this.msg.success(`删除${item.userid}`),
        },
        {
          text: '角色配置',
          click: (item: any) => this.msg.success(`角色配置${item.userid}`),
        }
      ],
    },
  ];
  selectedRows: STData[] = [];
  description = '';
  totalCallNo = 0;
  expandForm = false;

  constructor(
    private http: _HttpClient,
    public msg: NzMessageService,
    private modalSrv: NzModalService,
    private sysUserService: SysUserService,
    private cdr: ChangeDetectorRef
  ) { }

  ngOnInit() {
    // this.getData();
    this.load();
  }
  ngOnDestroy(){

  }

  sortChange(e){
    console.log('e');
    console.log(e);
  }

  getData() {
    // this.loading = true;
    // this.q.statusList = this.status.filter(w => w.checked).map(item => item.index);
    // if (this.q.status !== null && this.q.status > -1)
    //   this.q.statusList.push(this.q.status);
    // this.http
    //   .get('/rule', this.q)
    //   .pipe(
    //     map((list: any[]) =>
    //       list.map(i => {
    //         const statusItem = this.status[i.status];
    //         i.statusText = statusItem.text;
    //         i.statusType = statusItem.type;
    //         return i;
    //       }),
    //     ),
    //     tap(() => (this.loading = false)),
    //   )
    //   .subscribe(res => {
    //     this.data = res;
    //     this.cdr.detectChanges();
    //   });
  }

  load(){
    this.loading = true;
    this.query.statusList = this.status.filter(w => w.checked).map(item => item.index);
    if (this.query.status !== null && this.query.status > -1) {
      this.query.statusList.push(this.query.status);
    }
    this.sysUserService.query(
      {
        page: this.query.pi,
        size: this.query.ps,
        sortBy: this.query.sorter,
        query: this.query
      }
    ).pipe(
      map((res: any) =>{
          return res.data;
        }
      ),
      tap(() => (this.loading = false)),
    )
    .subscribe(res => {
      this.data = res;
      this.cdr.detectChanges();
    });
  }

  stChange(e: STChange) {
    switch (e.type) {
      case 'checkbox':
        this.selectedRows = e.checkbox;
        this.totalCallNo = this.selectedRows.reduce((total, cv) => total + cv.callNo, 0);
        this.cdr.detectChanges();
        break;
      case 'filter':
        this.load();
        break;
    }
  }

  remove() {
    this.http
      .delete('/rule', { nos: this.selectedRows.map(i => i.no).join(',') })
      .subscribe(() => {
        this.load();
        this.st.clearCheck();
      });
  }

  approval() {
    this.msg.success(`审批了 ${this.selectedRows.length} 笔`);
  }

  add(tpl: TemplateRef<{}>) {
    this.modalSrv.create({
      nzTitle: '新建用户',
      nzContent: tpl,
      nzOnOk: () => {
        this.loading = true;
        this.http
          .post('/rule', { description: this.description })
          .subscribe(() => this.load());
      },
    });
  }

  reset() {
    // wait form reset updated finished
    setTimeout(() => this.getData());
  }
}

