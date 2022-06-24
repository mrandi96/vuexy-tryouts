import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, RouterStateSnapshot } from '@angular/router';
import { BehaviorSubject, Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ApplicationsService {
	rows: any;
	onDataTablesChanged: BehaviorSubject<any>;

  constructor(private _http: HttpClient) { 
		this.onDataTablesChanged = new BehaviorSubject({});
	}

  resolve(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): Observable<any> | Promise<any> | any {
    return new Promise<void>((resolve, reject) => {
      Promise.all([this.getAppsList()]).then(() => {
        resolve();
      }, reject);
    });
  }

  createApp(body: any) {
		return this._http.post('/api/apps/AddApps', body, {
			observe: 'body',
		});
	}

	getAppsList(): Promise<any[]> {
		return new Promise((resolve, reject) => {
			this._http.get('/api/apps/lists').subscribe((response: any) => {
				this.rows = response;
				this.onDataTablesChanged.next(this.rows);
				resolve(this.rows);
			}, reject);
		});
	}

	getCustomerFacingAppsList() {
		return this._http.get('/api/apps/listsCustfacing');
	}

	getUserFacingAppsList() {
		return this._http.get('/api/apps/listsUserFacing');
	}

	getInfraMonitoringList() {
		return this._http.get('/api/apps/listsInfraMon');
	}
	
	getAppsNameList() {
		return this._http.get('/api/apps/getListAppsName');
	}

	getAppsIncidentList() {
		return this._http.get('/api/apps/getListAppsIncident');
	}

	deleteApp(id: number) {
		return this._http.delete('/api/apps/' + id);
	}

	editApp(id: number, newData: any) {
    const { app_category, isActive } = newData;
		return this._http.put('/api/apps/update/' + id, {
			app_category,
			isActive,
		});
	}

	// incidentScheduler() {
	// 	return this._http.get('/api/incident/status');
	// }
}
