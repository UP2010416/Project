import pandas as pd
import numpy as np
import json
import sys
import matplotlib.pyplot as plt
from prophet import Prophet

# Read data from stdin
data_json = json.load(sys.stdin)

# Convert data to pandas DataFrame
data = pd.DataFrame(data_json)
data['date'] = pd.to_datetime(data['date'])

# Prepare data
# Rename columns to 'ds' and 'y' as required by Prophet
data = data.rename(columns={'date':'ds', 'sales':'y'})

# Creating and training model
model = Prophet()
model.fit(data)

# Generate future dates for the next 21 days (3 weeks)
future_dates = model.make_future_dataframe(periods=21, freq='D')

# predictions
forecast = model.predict(future_dates)

# Save the forecasted data
# forecast[['ds', 'yhat', 'yhat_lower', 'yhat_upper']].to_csv('forecast.csv') -- Uncomment for csv generation

# Send JSON response
response = {}
forecast_df = forecast[['ds', 'yhat', 'yhat_lower', 'yhat_upper']].copy()
forecast_df['ds'] = forecast_df['ds'].dt.strftime('%Y-%m-%d')  # convert timestamp to string
response['forecast'] = forecast_df.to_json(orient='records')  # convert DataFrame to JSON
print(json.dumps(response))

