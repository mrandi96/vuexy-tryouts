import { Component, OnInit } from '@angular/core';
import { NgModel } from '@angular/forms';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { ApplicationsService } from 'app/services/applications.service';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-add-application',
  templateUrl: './add-application.component.html',
  styleUrls: ['./add-application.component.scss']
})
export class AddApplicationComponent implements OnInit {
  appsList: string[];
  selectedAppName: NgModel;
  selectedAppCategory: NgModel;


  public categories = [
		{ name: 'Customer Facing', value: 'Customer Facing' },
		{ name: 'User Facing', value: 'User Facing' },
		{ name: 'Infra Monitoring', value: 'Infra Monitoring' },
	];

  constructor(
    private _applicationsService: ApplicationsService,
    public activeModal: NgbActiveModal,
    private toastr: ToastrService
  ) {
    this.fetchAppList()
  }

  ngOnInit(): void {}

  fetchAppList() {
    this._applicationsService.getAppsIncidentList().subscribe((res: any) => {
      this.appsList = res.map(({ app_name }) => app_name);
    })
  }

  onSave() {
    this._applicationsService.createApp({
      app_name: this.selectedAppName,
      app_category: this.selectedAppCategory
    }).subscribe((res: any) => {
      let toastType = 'error';
      if (res.status === 200) {
        toastType = 'success';
        this.activeModal.dismiss()
        setTimeout(() => {
          location.reload()
        }, 1000)
      }
      this.toastr[toastType](
        res.msg,
        toastType.toUpperCase(),
        { toastClass: 'toast ngx-toastr', closeButton: true }
      );
    })
  }

}
