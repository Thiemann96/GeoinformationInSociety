#!/bin/bash

YEARS=${1:-}
MONTHS=${2:-}
WEEKDAYS=${3:-}
HOURS_START=${4:-}
HOURS_END=${5:-}
POLYGON=${6:-}


if [[ -z "$YEARS" ]]; then
    echo -n '{ "error": "missing latest-time url parameter", "missingParameter": true }'
    exit 0
fi
if [[ -z "$MONTHS" ]]; then
    echo -n '{ "error": "missing most-recent-time url parameter", "missingParameter": true }'
    exit 0
fi
if [[ -z "$WEEKDAYS" ]]; then
    echo -n '{ "error": "missing MIN_LON url parameter", "missingParameter": true }'
    exit 0
fi
if [[ -z "$POLYGON" ]]; then
    echo -n '{ "error": "missing MAX_LON url parameter", "missingParameter": true }'
    exit 0
fi
shift

RND=$(date +%s%N)

RESULT=$(psql -qtAX ${POSTGRES_URL} -c "
  PREPARE accidentsbytime$RND (int[], int[], int[], polygon) AS
WITH
    result AS (
      SELECT 
      geometry_id,
      accident_id,
      lat #>> '{}' AS lat,
      lon #>> '{}' AS lon,
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
      date #>> '{}' AS date,
      time_of_day #>> '{}' AS time_of_day
      FROM bikeAccidents
  ),
  hours AS (
      SELECT *
      FROM unnest(\$5 :: TIME [], \$6 :: TIME []) AS u(a,b)
  )
  select array_to_json(array_agg(row_to_json(t)))
    from (
        SELECT 
            geometry_id,
            accident_id,
            CAST(lat AS numeric) AS lat, 
            CAST(lon AS numeric) AS lon, 
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
        FROM result, hours
        WHERE
            (EXTRACT (YEAR FROM date::DATE))::int = ANY(\$1)
            AND (EXTRACT(MONTH FROM date::DATE))::int = ANY(\$2)
            AND (EXTRACT(ISODOW FROM date::DATE))::int = ANY(\$3)
            AND time_of_day::TIME between a and b
             AND (\$4)::polygon @> POINT(cast (lon as double precision),cast (lat as double precision))
        ORDER BY (EXTRACT (DAY FROM date::DATE)), time_of_day ASC)
             t;
  EXECUTE accidentsbytime$RND('$YEARS', '$MONTHS', '$WEEKDAYS', '$POLYGON', '$HOURS_START','$HOURS_END' );
")


if [[ -z "$RESULT" ]]; then
    echo -n '{ "error": "empty result", "empty": true }'
    exit 0
fi

echo -n "$RESULT"
