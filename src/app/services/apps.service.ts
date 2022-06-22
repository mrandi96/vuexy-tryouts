import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class AppsService {

  constructor(private _http: HttpClient) { }

  createApp(body: any) {
		return this._http.post('/api/apps/AddApps', body, {
			observe: 'body',
		});
	}

	getAppsList() {
		return this._http.get('/api/apps/lists');
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
