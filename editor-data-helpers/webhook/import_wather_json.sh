#!/bin/bash


psql -qtAX ${POSTGRES_URL} -c "
create table pl_temp(values text);
\copy pl_temp from '/var/lib/postgresql/data/wdata.json' csv quote e'\x01' delimiter e'\x02';

select 
  value 
from 
  pl_temp, json_array_elements(pl_temp.values::json) 
as 
  elem;

create table players(values jsonb);

insert into players 
select 
  values 
from
  (
      select json_array_elements(pl_temp.values::json) as values
      from pl_temp
  ) tmp;

CREATE TABLE bikeAccWeather
AS 
WITH
    weather AS (
      SELECT
        values->>'accident_id' AS accident_id,
        values->'weather' AS weather
      FROM players
    ),
    bikeAcc AS 
    (
      SELECT 
        geometry_id,
        accident_id,
        lat,
        lon,
        place,
        place_near,
        source_file,
        source_row_number,
        accident_category,
        accident_type,
        cause_1_4,
        cause_2,
        cause_3,
        cause_other,
        cause_02,
        participants_01,
        participants_02,
        deaths,
        seriously_injured,
        participants,
        date,
        time_of_day
      FROM bikeaccidents
    ),
    result AS (
      SELECT *
      FROM bikeAcc LEFT JOIN weather USING (accident_id)
    )
  SELECT * FROM result;

DROP TABLE pl_temp;
DROP TABLE players;
DROP TABLE bikeaccidents;

CREATE TABLE bikeaccidents AS 
TABLE bikeaccweather;
"