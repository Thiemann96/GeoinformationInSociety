#!/bin/bash

psql -qtAX ${POSTGRES_URL} -c "
  SELECT row_to_json(bikeAccidents) 
  FROM bikeAccidents
"
