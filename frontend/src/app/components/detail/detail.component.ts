import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';

import { ProjectService } from '../../services/project.service';
import { Global } from '../../services/global';
import { Project } from '../../models/project';

@Component({
  selector: 'app-detail',
  templateUrl: './detail.component.html',
  styleUrls: ['./detail.component.css'],
  providers: [ProjectService]
})
export class DetailComponent implements OnInit {
  private project: Project;
  private url: string;

  constructor(
    private _projectService: ProjectService,
    private _route: ActivatedRoute,
    private _router: Router
  ) {
    this.url = Global.url;
  }

  ngOnInit() {
    this._route.params.subscribe(params => {
      this.getProject(params.id);
    });
  }

  getProject(id) {
    this._projectService.getProject(id).subscribe(
      response => {
        this.project = response.project;
      },
      err => {
        console.error(err);
      }
    );
  }

  deleteProject(id) {
    if(confirm('¿Seguro que quieres eliminar el proyecto?')) {
      this._projectService.deleteProject(id).subscribe(
        response => {
            this._router.navigate(['/proyectos']);
        },
        err => {
          console.error(err);
        }
      );
    }
  }
}
