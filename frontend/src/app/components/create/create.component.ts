import { Component, OnInit } from '@angular/core';

import { Project } from '../../models/project';
import { Global } from '../../services/global';
import { ProjectService } from '../../services/project.service';
import { UploadService } from '../../services/upload.service';

@Component({
  selector: 'app-create',
  templateUrl: './create.component.html',
  styleUrls: ['./create.component.css'],
  providers: [ProjectService, UploadService]
})
export class CreateComponent implements OnInit {
  private title: string;
  private status: number;
  private project: Project;
  private filesToUpload: Array<File>;

  constructor(
    private _projectService: ProjectService,
    private _uploadService: UploadService
  ) {
    this.title = 'Crea un nuevo projecto';
    this.status = null;
    this.project = new Project('', '', new Date().getFullYear(), '', 'project-defaulf-image.jpg');
  }

  ngOnInit() {
  }

  onSubmit(form) {
    this._projectService.saveProject(this.project).subscribe(
      response => {
        if(response) {
          if(this.filesToUpload) {
            // subir imagen
            this._uploadService.makeFileRequest(Global.url + 'upload-image/' + response.project._id, [], this.filesToUpload, 'image')
              .then((result: any) => { });
          }
          this.status = 1;
          form.reset();
        } else {
          this.status = 0;
        }
      },
      err => {
        console.error(err);
      }
    );
  }

  fileChangeEvent(fileInput: any) {
    this.filesToUpload = <Array<File>>fileInput.target.files;
  }
}
