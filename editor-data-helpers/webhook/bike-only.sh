#!/bin/sh

psql -qtAX ${POSTGRES_URL} -c "
  WITH
    accident AS (
      SELECT
        id AS accident_id,
        data->'place' AS place,
        data->'place_near' AS place_near,
        data->'source_file' AS source_file,
        data->'source_row_number' AS source_row_number,
        data->'accident_category' AS accident_category,
        data->'accident_type' AS accident_type,
        data->'cause_1_4' AS cause_1_4,
        data->'cause_2' AS cause_2,
        data->'cause_3' AS cause_3,
        data->'cause_other' AS cause_other,
        data->'cause_02' AS cause_02,
        data->'participants_01' AS participants_01,
        data->'participants_02' AS participants_02,
        data->'deaths' AS deaths,
        data->'seriously_injured' AS seriously_injured,
        data->'slightly_injured' AS slightly_injured,
        data->'pedestrian' AS pedestrian,
        data->'bicycle' AS bicycle,
        data->'small_moped' AS small_moped,
        data->'moped' AS moped,
        data->'motorcycle' AS motorcycle,
        data->'car' AS car,
        data->'lorry' AS lorry,
        data->'omnibus' AS omnibus,
        data->'other_road_user' AS other_road_user,
        data->'date' AS date,
        data->'time_of_day' AS time_of_day
      FROM objects
      WHERE resource_name = 'record'
        AND parent_id = '/buckets/accidents/collections/accidents_raw'
    ),
    inter AS (
      SELECT *
      FROM accident
      WHERE bicycle IS NOT NULL
    )
  SELECT row_to_json(accident) 
  FROM inter

"
