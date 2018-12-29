import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';

import { Project } from '../../models/project';
import { Global } from '../../services/global';
import { ProjectService } from '../../services/project.service';
import { UploadService } from '../../services/upload.service';

@Component({
  selector: 'app-edit',
  templateUrl: './edit.component.html',
  styleUrls: ['./edit.component.css'],
  providers: [ProjectService, UploadService]
})
export class EditComponent implements OnInit {
  private title: string;
  private project: Project;
  private project_id: string;
  private status: number;
  private filesToUpload: Array<File>;
  private url: string;

  constructor(
    private _route: ActivatedRoute,
    private _router: Router,
    private _projectService: ProjectService,
    private _uploadService: UploadService
  ) {
    this.url = Global.url;
    this.title = 'Editar proyecto';
    this.status = null;
  }

  ngOnInit() {
    this._route.params.subscribe(params => {
      this.project_id = params.id;
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

  onSubmit(form) {
    this._projectService.updateProject(this.project).subscribe(
      response => {
        if(response) {
          if(this.filesToUpload) {
            // subir imagen
            this._uploadService.makeFileRequest(this.url + 'upload-image/' + response.project._id, [], this.filesToUpload, 'image')
              .then((result: any) => { });
          }
          form.reset();
          this._router.navigate(['/proyecto', this.project_id]);
        } else {
          this.status = 0;
        }
      },
      err => {
        console.error(err);
      }
    );
  }

  cancel() {
    this._router.navigate(['/proyecto', this.project_id]);
  }

  fileChangeEvent(fileInput: any) {
    this.filesToUpload = <Array<File>>fileInput.target.files;
  }
}
