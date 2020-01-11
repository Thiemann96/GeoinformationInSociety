import requests
import json
import traceback
from dwdweather import DwdWeather
from datetime import datetime
from tqdm import tqdm

# ID from the station at Muenster/Osnabrueck airport
dw = DwdWeather()
station_id = 1766

response = None
# Connect to database
try:
    url = 'http://0.0.0.0:9000/hooks/weather-testing'
    response = requests.get(url)
except Exception:
    traceback.print_exc()

# Response not empty
if response != None:
    data = json.loads(response.text)
    # Create new JSON and fill it
    weather_data_json = open("weather_data.json","w+")
    weather_data_json.write("[")
    comma = False
    i = 1
    for accident in tqdm(data):
        # Position of accident must be available
        if accident['lon'] != None and accident['lat'] != None and accident['time_of_day'] != None and accident['date'] != None:
            if comma:
                weather_data_json.write(",")
            else:
                comma = True
            # Get the accident time and round it to 10 minutes
            accident_time = datetime.strptime(accident['time_of_day'], '%H:%M:%S')
            accident_date = datetime.strptime(accident['date'], '%Y-%m-%d')
            minute = accident_time.minute
            minute = int(round(minute))
            if minute > 59:
                minute = 50
            query_hour = datetime(accident_date.year, accident_date.month, accident_date.day, accident_time.hour, minute)
            # Query the weather data
            result = dw.query(station_id=station_id, timestamp=query_hour)
            # Add weather data to the accident JSON entry
            accident['weather'] = result
            # Write the data to file
            weather_data_json.write(json.dumps(accident))

    weather_data_json.write("]")
else:
    print("Cannot connect to database or the result is empty")
