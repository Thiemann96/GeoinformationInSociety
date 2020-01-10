#!/bin/bash

DATE_TO=${1:-}
echo $DATE_TO
DATE_FROM=${2:-}
echo $DATE_FROM
MIN_LON=${3:-}
echo $MIN_LON
MAX_LON=${4:-}
echo $MAX_LON
MIN_LAT=${5:-}
echo $MIN_LAT
MAX_LAT=${6:-}
echo $MAX_LAT

if [[ -z "$DATE_TO" ]]; then
    echo -n '{ "error": "missing latest-time url parameter", "missingParameter": true }'
    exit 0
fi
if [[ -z "$DATE_FROM" ]]; then
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
  PREPARE accidentsbytime$RND (text, text) AS
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
    SELECT row_to_json(result) FROM result 
    WHERE
         (dateDay::DATE + dateTime::TIME)::TIMESTAMP  < \$1::TIMESTAMP 
        AND (dateDay::DATE + dateTime::TIME)::TIMESTAMP > \$2::TIMESTAMP
        AND (lon::numeric > \$3) AND (lon::numeric < \$4) AND (lat::numeric > \$5) AND (lat::numeric < \$6);
  EXECUTE accidentsbytime$RND('$DATE_TO', '$DATE_FROM', '$MIN_LON','$MAX_LON','$MIN_LAT','$MAX_LAT' );
")



if [[ -z "$RESULT" ]]; then
    echo -n '{ "error": "empty result", "empty": true }'
    exit 0
fi

echo -n "$RESULT"
