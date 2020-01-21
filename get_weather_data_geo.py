import requests
import json
import traceback
from datetime import datetime
from tqdm import tqdm

response = None
# Connect to database
try:
    url = 'http://0.0.0.0:9000/hooks/weather-testing'
    response = requests.get(url)
except Exception:
    traceback.print_exc()

min_date = datetime(2013, 10, 27, 11, 20)

# Response not empty
if response != None:
    data = json.loads(response.text)
    # Create new JSON and fill it
    weather_data_json = open("weather_data_geo.json","w+")
    weather_data_json.write("[")
    comma = False
    input_f = open("weather.csv")
    input_f = input_f.readlines()
    with_date = 0
    without_date = 0
    for accident in tqdm(data):
        # Position of accident must be available
        if accident['time_of_day'] != None and accident['date'] != None:
            # Get the accident time and round it to 10 minutes
            accident_time = datetime.strptime(accident['time_of_day'], '%H:%M:%S')
            accident_date = datetime.strptime(accident['date'], '%Y-%m-%d')
            minute = accident_time.minute
            minute = int(round(minute, -1))
            if minute > 59:
                minute = 50
            query_date = datetime(accident_date.year, accident_date.month, accident_date.day, accident_time.hour, minute)
            minute = str(minute)
            if minute == '0':
                minute = '00'
            query_date_str = str(accident_date.month) + '/' + str(accident_date.day) + '/' + str(accident_date.year) + ' ' + str(accident_time.hour) + ':' + str(minute)
            if query_date >= min_date:
                for line in input_f:
                    if line.startswith(query_date_str):
                        with_date += 1
                        if comma:
                            weather_data_json.write(",")
                        else:
                            comma = True
                        attr = line.split(',')
                        json_weather_object = {
                            "temperature_c": attr[1],
                            "humidity_%": attr[4],
                            "wind_speed_m/s-1": attr[7],
                            "wind_direction_deg": attr[8],
                            "pressure_hPa": attr[12],
                            "visibility_km": attr[18],
                            "precipitation_mm": attr[20]
                        }

                        accident['weather'] = json_weather_object
                        weather_data_json.write(json.dumps(accident))
            else:
                if comma:
                    weather_data_json.write(",")
                else:
                    comma = True
                without_date += 1
                accident['weather'] = None
                weather_data_json.write(json.dumps(accident))
        else:
            if comma:
                weather_data_json.write(",")
            else:
                comma = True
            without_date += 1
            accident['weather'] = None
            weather_data_json.write(json.dumps(accident))
    print(str(with_date) + ' entries processed, ' + str(without_date) + ' entries do not have dates or are too early, so no search for weather conditions was possible.')
    weather_data_json.write("]")
else:
    print("Cannot connect to database or the result is empty")
