<p align="center">
  <a href="http://nestjs.com/" target="blank"><img src="https://nestjs.com/img/logo_text.svg" width="320" alt="Nest Logo" /></a>
</p>

# **MSUsers**

## **Descripción**
Microservicio en NestJs y base de datos MongoDB, con el fin implementar un microservicio de usuarios para la implementación de microservicios Ecommerce V9 con lineamientos clean architecture.

## **Pre-requisitos**
Para clonar y ejecutar esta aplicación, necesitará [Git](https://git-scm.com), [Node.js](https://nodejs.org/en/download/) (que viene con npm) y [MongoDB](https://www.mongodb.com/try/download/community) instalados en su computadora. 


Desde su línea de comando:

```bash
# Clonar repositorio
$ git clone https://alminspiraclaro.visualstudio.com/Proyecto_EcommerceV9/_git/MSUsers

# Entrar al repositorio local
$ cd MSUsers

# Instalar dependencias. En caso de general error usar el comando "npm i --force" o "npm i --legacy-peer-deps"
$ npm i
```

**NOTA: Antes de correr el proyecto se debe tener en cuenta crear las colecciones de los mensajes y parámetros generales en la BD local con los datos correspondientes que se van usar en el proyecto.**

Para la colección **coll_message** cargar los documentos del siguiente [Enlace](https://claromovilco.sharepoint.com/:u:/s/ImplementacinV9/EYdmgl3Dc39GvrCf4Bt9IkABFFe4VNdId8x9mXHlo1gMsA?e=sorjaB)

Para la colección **coll_params** cargar los documentos del siguiente [Enlace](https://claromovilco.sharepoint.com/:u:/s/ImplementacinV9/EcZX7xhGVklKggdiz_AH5kEBDDCF27KDhTS5Prp5it_G4g?e=senEr2)

```bash
# Correr aplicación en modo desarrollo
$ npm run start:dev
```

Luego podrá acceder desde el [navegador](http://localhost:8080) para validar que se visualice correctamente el swagger del proyecto.

## **Ejecutar pruebas unitarias y sonarQube**

Desde su línea de comando:

```bash
# Entrar al repositorio local
$ cd MSUsers

# Comando generación pruebas unitarias
$ npm run test:cov 

# Comando generación pruebas unitarias archivo especifico
$ npm test controller/user.controller.spec.ts

# Generación informe herramienta sonarQube
$ npm run sonar-scanner
$ sonar-scanner.bat -D"sonar.projectKey=MsUsers" -D"sonar.sources=." -D"sonar.host.url=http://localhost:9000" -D"sonar.token=sqp_531ce1a043c378f6a08ba48da6ae668792b46476"




```

![Coverage](SonnarCoverage.jpg)
Una vez finalizado el proceso y si no genero ningún error Luego podrá acceder desde el [navegador](http://sonarqube-pruebad.apps.claro.co/projects?sort=name) para validar que se visualice correctamente el informe de sonarQube.

## **Módulos del proyecto**

- Common:
  Módulo transversal en el cual se define la configuración, librerías, enumeradores, utilidades.

- Controller:
  Modulo en el cual se definen los paths o funcionalidades que expone el servicio

- Core:
  Módulo en el cual se implementa la lógica de negocio (use cases)

- Data Provider:
  Módulo que controla la conexión a legados, base de datos y servicios con los cuales se tiene comunicación

## **Autores**
Los diferentes autores y encargados de cada operación de la aplicación para inquietudes son:


| Operación             | Autor              | Correo                         |
| --------------------- | ------------------ | ------------------------------ |
| General               | Betzy Montañez     | montanezba@globalhitss.com     |
| General               | William Corredor   | corredorw@globalhitss.com      |
| General               | Santiago Martinez  | martinezfs@globalhitss.com     |
| General               | Uriel Esguerra     | esguerrau@globalhitss.com      |
| General               | Edwin Avila        | avilaef@globalhitss.com        |
| General               | Edgar Quintero     | quinteroe@globalhitss.com      |
