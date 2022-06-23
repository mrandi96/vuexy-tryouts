import { Component, OnInit } from '@angular/core';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';

@Component({
  selector: 'app-add-application',
  templateUrl: './add-application.component.html',
  styleUrls: ['./add-application.component.scss']
})
export class AddApplicationComponent implements OnInit {

  public appsList = [{
    name: 'APP1',
  },
  {
    name: 'APP2',
  },
  {
    name: 'APP3',
  },];

  public categories = [
		{ name: 'Customer Facing', value: 'Customer Facing' },
		{ name: 'User Facing', value: 'User Facing' },
		{ name: 'Infra Monitoring', value: 'Infra Monitoring' },
	];

  constructor(
    public activeModal: NgbActiveModal,
  ) { }

  ngOnInit(): void {
  }

}
