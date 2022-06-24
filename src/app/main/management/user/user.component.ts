import { Component, OnInit, ViewChild, ViewEncapsulation } from "@angular/core";
import { NgbModal } from "@ng-bootstrap/ng-bootstrap";
import { AddUserComponent } from "./add-user/add-user.component";
import { ColumnMode, DatatableComponent } from '@swimlane/ngx-datatable';
import { ApplicationsService } from "app/services/applications.service";
import { takeUntil } from 'rxjs/operators';
import { Subject } from "rxjs";
import { ToastrService } from 'ngx-toastr';

@Component({
    selector: 'app-user',
    templateUrl: './user.component.html',
    styleUrls: ['./user.component.scss'],
    encapsulation: ViewEncapsulation.None
})

export class UserComponent implements OnInit{
    private _unsubscribeAll: Subject<any>;
    private tempData = [];


    public basicSelectedOption: number = 10;
    public ColumnMode = ColumnMode;
    public kitchenSinkRows: any;
    public rows: any;

    @ViewChild(DatatableComponent) table: DatatableComponent;
    @ViewChild('tableRowDetails') tableRowDetails: any;
  
    addUser() {
        this.modalService.open(AddUserComponent, {
          centered: true
        });
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
    constructor (
        private _datatablesService: ApplicationsService, 
        private modalService: NgbModal, 
        private toastr: ToastrService
        ) 
        
        {this._unsubscribeAll = new Subject();}
    
    ngOnInit(): void {
        this.fetchDataTables()
        this._datatablesService.onDataTablesChanged.pipe(takeUntil(this._unsubscribeAll)).subscribe(response => {
            this.rows = response;
            this.tempData = this.rows;
            this.kitchenSinkRows = this.rows;
          });

    }

    
}