import requests
import json
import traceback
from dwdweather import DwdWeather
from datetime import datetime

dw = DwdWeather()

response = None
# Connect to database
try:
    url = 'http://0.0.0.0:9000/hooks/weather-testing'
    response = requests.get(url)
except Exception:
    traceback.print_exc()

if response != None:
    data = json.loads(response.text)
    weather_data_json = open("weather_data.json","w+")
    weather_data_json.write("[")
    for accident in data:
        if accident['lon'] != None and accident['lat'] != None:
            weather_station = dw.nearest_station(lon = accident['lon'], lat = accident['lat'])
            accident_time = datetime.strptime(accident['time_of_day'], '%H:%M:%S')
            accident_date = datetime.strptime(accident['date'], '%Y-%m-%d')
            minute = accident_time.minute
            minute = int(round(minute))
            if minute > 59:
                minute = 50
            query_hour = datetime(accident_date.year, accident_date.month, accident_date.day, accident_time.hour, minute)
            result = dw.query(station_id=weather_station["station_id"], timestamp=query_hour)
            accident['weather'] = result
            weather_data_json.write(json.dumps(accident))
            weather_data_json.write(',')
            
    weather_data_json.write("];")
