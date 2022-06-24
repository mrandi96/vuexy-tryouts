import { Component, OnInit, ViewChild, ViewEncapsulation } from '@angular/core';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';

import { Subject } from 'rxjs';
import { takeUntil } from 'rxjs/operators';
import { ColumnMode, DatatableComponent } from '@swimlane/ngx-datatable';

import { ApplicationsService } from 'app/services/applications.service';
import { AddApplicationComponent } from 'app/main/management/applications/add-application/add-application.component';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-applications',
  templateUrl: './applications.component.html',
  styleUrls: ['./applications.component.scss'],
  encapsulation: ViewEncapsulation.None
})
export class ApplicationsComponent implements OnInit {
  // Private
  private _unsubscribeAll: Subject<any>;
  private tempData = [];

  // public
  public contentHeader: object;
  public rows: any;
  public selected = [];
  public kitchenSinkRows: any;
  public basicSelectedOption: number = 10;
  public ColumnMode = ColumnMode;
  public expanded = {};
  public enableEdit = {};
  public categories = [
		{ name: '', value: '' },
		{ name: 'Customer Facing', value: 'Customer Facing' },
		{ name: 'User Facing', value: 'User Facing' },
		{ name: 'Infra Monitoring', value: 'Infra Monitoring' },
	];

  @ViewChild(DatatableComponent) table: DatatableComponent;
  @ViewChild('tableRowDetails') tableRowDetails: any;


  enableEditMethod(i) {
    this.enableEdit[i] = true;
    this.kitchenSinkRows = [...this.kitchenSinkRows];
  }

  // modal Open Form
  addApplication() {
    this.modalService.open(AddApplicationComponent, {
      centered: true,
      // beforeDismiss: () => this.fetchDataTables()
    });
  }

  filterUpdate(event) {
    const val = event.target.value.toLowerCase();

    // filter our data
    const temp = this.tempData.filter(function (d) {
      return (
        d.app_name.toLowerCase().indexOf(val) !== -1
        || d.app_category.toLowerCase().indexOf(val) !== -1
        || !val
      )
    });

    // update the rows
    this.kitchenSinkRows = temp;
    // Whenever the filter changes, always go back to the first page
    this.table.offset = 0;
  }

  /**
   * Row Details Toggle
   *
   * @param row
   */
  rowDetailsToggleExpand(row) {
    this.tableRowDetails.rowDetail.toggleExpandRow(row);
  }

  fetchDataTables() {
    this._datatablesService.onDataTablesChanged.pipe(takeUntil(this._unsubscribeAll)).subscribe(response => {
      this.rows = response;
      this.tempData = this.rows;
      this.kitchenSinkRows = this.rows;
      this.kitchenSinkRows = [...this.kitchenSinkRows]
    });

    return true;
  }

  constructor(
    private _datatablesService: ApplicationsService,
    private modalService: NgbModal,
    private toastr: ToastrService
  ) {
    this._unsubscribeAll = new Subject();
  }

  // Lifecycle Hooks
  // -----------------------------------------------------------------------------------------------------

  /**
   * On init
   */
  ngOnInit() {
    this.fetchDataTables()  
    // content header
    this.contentHeader = {
      headerTitle: 'Applications',
      actionButton: true,
      breadcrumb: {
        type: '',
        links: [
          {
            name: 'Home',
            isLink: true,
            link: '/'
          },
          {
            name: 'Management',
            isLink: true,
            link: '/'
          },
          {
            name: 'Applications',
            isLink: false
          }
        ]
      }
    };
  }

  updateRow(index: any) {
    const { _id: id, app_category, isActive } = this.kitchenSinkRows[index];
    const newData = {
      app_category,
      isActive
    }
    this._datatablesService.editApp(id, newData).subscribe((res: any) => {
      let toastType = 'error';
      if (res.status === 200) {
        this.enableEdit[index] = false;
        toastType = 'success';
      }
      this.toastr[toastType](
        res.msg,
        toastType.toUpperCase(),
        { toastClass: 'toast ngx-toastr', closeButton: true }
      );
    })
  }

  deleteRow(index: number) {
    const id = this.kitchenSinkRows[index]._id;
    this._datatablesService.deleteApp(id).subscribe((res: any) => {
      if (res.status === 200) {
        this.kitchenSinkRows = this.kitchenSinkRows.filter((item: any) => item._id !== id);
        this.toastr.success(
          res.msg,
          'SUCCESS',
          { toastClass: 'toast ngx-toastr', closeButton: true }
        );
      } else {
        this.toastr.error(
          res.msg,
          'ERROR',
          { toastClass: 'toast ngx-toastr', closeButton: true }
        );
      }
    })
  }


  toggleTableRows() {
		this.kitchenSinkRows.forEach((row: any) => {
      this.rowDetailsToggleExpand(row)
		});
	}

}
