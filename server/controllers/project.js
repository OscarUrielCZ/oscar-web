'use strict'

const Project = require('../models/project');
const fs = require('fs');
const path = require('path');

const controller = {
  saveProject: (req, res) => {
    var project = new Project();

    project.name = req.body.name;
    project.description = req.body.description;
    project.year = req.body.year;
    project.technologies = req.body.technologies;
    project.image = req.body.image;

    project.save((err, projectStored) => {
      if(err)
        return res.status(500).send({ message: 'Ha ocurrido un error ' + err });
      if(!projectStored)
        return res.status(404).send({ message: 'No se ha podido guardar el proyecto' });
      return res.status(200).send({ project: projectStored });
    });
  },
  getProject: (req, res) => {
    var projectID = req.params.id;

    if(projectID == null)
      return res.status(500).send({ message: 'Ha ocurrido un error.' });

    Project.findById(projectID, (err, project) => {
      if(err)
        return res.status(500).send({ message: 'Ha ocurrido un error ' + err });
      if(!project)
        return res.status(404).send({ message: 'El proyecto no existe' });
      return res.status(200).send({
        project
      });
    });
  },
  getAllProjects: (req, res) => {
    Project.find({}).exec((err, allProjects) => {
      if(err)
        return res.status(500).send({ message: 'Error al obtener los proyectos' });
      if(!allProjects)
        return res.status(404).send({ message: 'No hay proyectos registrados' });
      return res.status(200).send({
        projects: allProjects
      });
    });
  },
  updateProject: (req, res) => {
    var projectID = req.params.id;
    var prUpdated = req.body;

    Project.findByIdAndUpdate(projectID, prUpdated, { new: true }, (err, newProject) => {
      if(err)
        return res.status(500).send({ message: 'Ocurrió un error al actualizar el proyecto'});
      if(!newProject)
        return res.status(404).send({ message: 'No existe el proyecto'});
      return res.status(200).send({
        project: newProject
      });
    });
  },
  deleteProject: (req, res) => {
    var projectID = req.params.id;

    Project.findByIdAndRemove(projectID, (err, deletedProject) => {
      if(err)
        return res.status(500).send({ message: 'Ocurrió un error al eliminar el projecto' });
      return res.status(200).send({
        project: deletedProject
      });
    });
  },
  uploadImage: (req, res) => {
    var projectID = req.params.id;
    var filename = "Sin imagen";
    var extension = "";

    if(req.files) {
      filename = req.files.image.path.split('/')[1];
      extension = filename.split('.')[1];

      if(extension == 'png' || extension == 'jpeg' || extension == 'jpg' || extension == 'gif') {
        Project.findByIdAndUpdate(projectID, { image: filename }, (err, newProject) => {
          if(err)
            return res.status(500).send({ message: 'Ocurrió un error al agregar imagen: ' + err });
          return res.status(200).send({ message: filename });
        });
      } else {
        fs.unlink(req.files.image.path, (err) => {
          return res.status(200).send({ message: 'No instertaste una imagen' });
        });
      }
    } else {
        return res.status(200).send({ message: filename });
    }
  },
  getImageFile: (req, res) => {
    var file = req.params.image;
    var path_file = './uploads/' + file;

    fs.exists(path_file, exists => {
      if(exists)
        res.sendFile(path.resolve(path_file));
      else
        res.status(200).send({ message: 'La imagen no existe' });
    });
  }
};

module.exports = controller;
