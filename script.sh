#!/bin/bash

mvn -f Backend/demo spring-boot:run &
npm install --prefix FrontEnd/notes-app &
npm start --prefix FrontEnd/notes-app &
