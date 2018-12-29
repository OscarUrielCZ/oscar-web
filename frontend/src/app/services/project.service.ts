import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs/Observable';

import { Project } from '../models/project';
import { Global } from './global';

@Injectable()
export class ProjectService {
  private url: string;
  private headers: HttpHeaders;

  constructor(
    private _http: HttpClient
  ) {
    this.url = Global.url;
    this.headers = new HttpHeaders().set('Content-Type', 'application/json');
  }

  saveProject(project: Project): Observable<any> {
    let params = JSON.stringify(project);

    return this._http.post(this.url + 'save', params, { headers: this.headers });
  }

  getAllProjects(): Observable<any> {
    return this._http.get(this.url + 'get-all', { headers: this.headers });
  }

  getProject(id): Observable<any> {
    return this._http.get(this.url + 'get/' + id, { headers: this.headers });
  }

  deleteProject(id): Observable<any> {
    return this._http.delete(this.url + 'delete/' + id, { headers: this.headers });
  }

  updateProject(project):Observable<any> {
    let params = JSON.stringify(project);

    return this._http.put(this.url + 'update/' + project._id, params,  { headers: this.headers });
  }
}
