#!/bin/bash

psql -qtAX ${POSTGRES_URL} -c "
select array_to_json(array_agg(row_to_json(t)))
    from (
      SELECT * FROM bikeAccidents
    ) t;
"
