#!/bin/bash

YEARS=${1:-}
MONTHS=${2:-}
MIN_LON=${3:-}
MAX_LON=${4:-}
MIN_LAT=${5:-}
MAX_LAT=${6:-}
WEEKDAYS=${7:-}
TIME=${8:-}


if [[ -z "$YEARS" ]]; then
    echo -n '{ "error": "missing latest-time url parameter", "missingParameter": true }'
    exit 0
fi
if [[ -z "$MONTHS" ]]; then
    echo -n '{ "error": "missing most-recent-time url parameter", "missingParameter": true }'
    exit 0
fi
if [[ -z "$MIN_LON" ]]; then
    echo -n '{ "error": "missing MIN_LON url parameter", "missingParameter": true }'
    exit 0
fi
if [[ -z "$MAX_LON" ]]; then
    echo -n '{ "error": "missing MAX_LON url parameter", "missingParameter": true }'
    exit 0
fi
if [[ -z "$MIN_LAT" ]]; then
    echo -n '{ "error": "missing MIN_LAT url parameter", "missingParameter": true }'
    exit 0
fi
if [[ -z "$MAX_LAT" ]]; then
    echo -n '{ "error": "missing MAX_LAT url parameter", "missingParameter": true }'
    exit 0
fi
shift

RND=$(date +%s%N)

RESULT=$(psql -qtAX ${POSTGRES_URL} -c "
  PREPARE accidentsbytime$RND (int[], int[], int[], numeric, numeric, numeric, numeric) AS
WITH
    result AS (
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
      date #>> '{}' AS dateDay,
      time_of_day #>> '{}' AS dateTime
      FROM bikeAccidents
  )
  select array_to_json(array_agg(row_to_json(t)))
    from (
        SELECT * FROM result
        WHERE
            (EXTRACT (YEAR FROM dateDay::DATE))::int = ANY(\$1)
            AND (EXTRACT(MONTH FROM dateDay::DATE))::int = ANY(\$2)
            AND (EXTRACT(ISODOW FROM dateDay::DATE))::int = ANY(\$3)
            AND (lon::numeric > \$4) AND (lon::numeric < \$5) AND (lat::numeric > \$6) AND (lat::numeric < \$7))
             t;
  EXECUTE accidentsbytime$RND('$YEARS', '$MONTHS', '$WEEKDAYS', $MIN_LON,$MAX_LON,$MIN_LAT,$MAX_LAT);
")



if [[ -z "$RESULT" ]]; then
    echo -n '{ "error": "empty result", "empty": true }'
    exit 0
fi

echo -n "$RESULT"
