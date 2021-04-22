# HENNGECHALLENGE

## [Live Demo](https://henngechallenge.web.app/)

------------------------

## Security Incidents emails list

-------------------

### Technologies which i used:

| Name                                                                                       | Version  |
|--------------------------------------------------------------------------------------------|----------|
|[Angular CLI](https://github.com/angular/angular-cli)                                       |  11.2.8  |
|[Typescript](https://www.typescriptlang.org/docs/handbook/release-notes/typescript-4-1.html)|  4.1.5   |
-------------------

The project was generated with  version 11.2.8.

## My process:
1. create project based on Angular
2. design the architecture of project(like modules & services & components)
3. create one assets folder for common Json & image files.
   
    3-1. moke-data >> contains fake json file for fetching data and show in grid.
   
    3-2. svg-icons >> contains any images in any format.
   
4. created "tools" modules as a shared modules contains common features.
   
    4-1. components >> contains calendar & search box components which accepts some inputs and returns back outputs
   
    4-2. pipe >> contains a pipe for converting full date & time to required format + one pipe for highlight the text which user is looking for

    4-3. services >>
   
        4-3-1. common: include common functionalities & variables
        4-3-2. api: API service for fetching data from mock-data directory or even rest APIs
   
    4.4. styles >> for putting common styles like mixin & functions & common classes to use overall of project

5. Using router functionality to route form main app component to related module for showing the list of emails
6. Using SCSS for doing styles
7. Using ng-template for making code more readable and reuse code for similar cases(which i could split it to some smalls components as well)




