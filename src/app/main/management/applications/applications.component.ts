import { Component, OnInit, ViewChild, ViewEncapsulation } from '@angular/core';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';

import { Subject } from 'rxjs';
import { takeUntil } from 'rxjs/operators';
import { ColumnMode, DatatableComponent } from '@swimlane/ngx-datatable';

import { ApplicationsService } from 'app/services/applications.service';
import { AddApplicationComponent } from 'app/main/management/applications/add-application/add-application.component';

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
        centered: true
      });
    }

  filterUpdate(event) {
    const val = event.target.value.toLowerCase();

    // filter our data
    const temp = this.tempData.filter(function (d) {
      return d.full_name.toLowerCase().indexOf(val) !== -1 || !val;
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

  constructor(private _datatablesService: ApplicationsService, private modalService: NgbModal) {
    this._unsubscribeAll = new Subject();
  }

  // Lifecycle Hooks
  // -----------------------------------------------------------------------------------------------------

  /**
   * On init
   */
  ngOnInit() {
    this._datatablesService.onDatatablessChanged.pipe(takeUntil(this._unsubscribeAll)).subscribe(response => {
      this.rows = response;
      this.tempData = this.rows;
      this.kitchenSinkRows = this.rows;
    });

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

  toggleTableRows() {
		this.kitchenSinkRows.forEach((row: any) => {
      this.rowDetailsToggleExpand(row)
		});
	}

}
