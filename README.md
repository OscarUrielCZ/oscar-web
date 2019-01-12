# Oscar Web

Éste es mi blog, es una aplicación web creada con el stack MEAN que guarda información sobre tus proyectos, se pueden hacer las operaciones básicas (CRUD) para administrar lo mejor posible tus proyectos.

## Requerimientos

Para poder probar exitosamente ésta aplicación, debes tener instalado los siguientes programas:

* npm
* nodejs
* angular cli
* mongodb

## Instalación

Dentro de la raíz del proyecto, ejecutar los siguientes comnados:
```
cd frontend/
npm install
cd ../server/
npm install
```

## Correr aplicación

Ahora dentro del directorio server/ ejecutar los comandos
```
sudo service mongod start # solo distribuciones Linux y MacOS, investigar el equivalente en Windows
npm start
cd ../frontend/
ng serve --open
```
Y automáticamente se abrira tu navegador en la página indicada


