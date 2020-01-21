#!/bin/bash

psql -qtAX ${POSTGRES_URL} -c "
select array_to_json(array_agg(row_to_json(t)))
    from (
      SELECT accident_id, lat, lon, date, time_of_day FROM bikeAccidents
    ) t;
"
