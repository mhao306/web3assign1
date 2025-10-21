# COMP 4513 Assignment 1
## Overview
This repository contains a Node API for querying a Formula 1 car racing database. This includes tables for circuits, constructors, drivers, races, and results. The data is return in JSON format.

## Example API Requests for Testing

http://localhost:8080/api/circuits
http://localhost:8080/api/circuits/monza
<!-- do error handling -->
http://localhost:8080/api/circuits/calgary 
http://localhost:8080/api/circuits/season/2010
http://localhost:8080/api/constructors
http://localhost:8080/api/constructors/williams
http://localhost:8080/api/drivers
http://localhost:8080/api/drivers/hamilton
http://localhost:8080/api/drivers/search/sch
http://localhost:8080/api/drivers/race/11
http://localhost:8080/api/races/18
http://localhost:8080/api/races/season/2010
http://localhost:8080/api/races/season/2020/12
http://localhost:8080/api/races/circuits/spa
http://localhost:8080/api/races/circuits/monza/season/2018/2020
http://localhost:8080/api/results/11
http://localhost:8080/api/results/driver/sato
http://localhost:8080/api/results/drivers/speed/seasons/2007/2008
http://localhost:8080/api/qualifying/15
http://localhost:8080/api/standings/drivers/15
http://localhost:8080/api/standings/constructors/15