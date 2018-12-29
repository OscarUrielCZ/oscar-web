import { Component, OnInit } from '@angular/core';

import { Project } from '../../models/project';
import { Global } from '../../services/global';
import { ProjectService } from '../../services/project.service';

@Component({
  selector: 'app-projects',
  templateUrl: './projects.component.html',
  styleUrls: ['./projects.component.css'],
  providers: [ProjectService]
})
export class ProjectsComponent implements OnInit {
  private title: string;
  private url: string;
  private projects: Array<Project>;

  constructor(
    private _projectService: ProjectService
  ) {
    this.title = 'Todos los projectos';
    this.url = Global.url;
  }

  ngOnInit() {
    this._projectService.getAllProjects().subscribe(
      response => {
        if(response.projects)
          this.projects = response.projects;
      },
      err => {
        console.error(err);
      }
    );
  }

  resume(description: string) {
    if(description.length > 122)
      return description.substring(0, 115) + '...';

    for(let i=description.length; i<122; i++)
      description += ' ';

    return description;
  }
}
