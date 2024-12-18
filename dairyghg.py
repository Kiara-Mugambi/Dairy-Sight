import matplotlib.pyplot as plt
import numpy as np
import pandas as pd
from datetime import datetime, timedelta

# Constants
CH4_EMISSION_FACTOR = 0.25  # kg CO2eq per liter of milk

# Function: GHG Emission Calculator with Predictive Analysis
def calculate_and_predict_emissions(milk_data):
    print("\n--- GHG Emissions Analysis ---")

    # Parse input data (assume milk_data is a list of daily milk amounts)
    days = len(milk_data)
    daily_emissions = [milk * CH4_EMISSION_FACTOR for milk in milk_data]
    total_emissions = sum(daily_emissions)

    # Display daily emissions
    for i, emissions in enumerate(daily_emissions, 1):
        print(f"Day {i}: {emissions:.2f} kg CO2eq")
    print(f"\nTotal GHG Emissions over {days} days: {total_emissions:.2f} kg CO2eq")

    # Visualization - Historical Data
    plt.figure(figsize=(10, 6))
    plt.plot(range(1, days + 1), daily_emissions, marker='o', linestyle='-', color='green', label='Daily Emissions')
    plt.title('Daily GHG Emissions from Milk Production')
    plt.xlabel('Day')
    plt.ylabel('GHG Emissions (kg CO2eq)')
    plt.grid(True)
    plt.legend()
    plt.tight_layout()
    plt.show()

    # Predictive Analysis - Linear Trend
    predict_days = 7  # Forecast for next 7 days
    trend = np.polyfit(range(1, days + 1), milk_data, 1)  # Linear trend
    forecast = [trend[0] * (day + 1) + trend[1] for day in range(days, days + predict_days)]
    forecast_emissions = [milk * CH4_EMISSION_FACTOR for milk in forecast]

    # Display Prediction
    print("\n--- Predicted Emissions for Next 7 Days ---")
    for i, emissions in enumerate(forecast_emissions, 1):
        print(f"Day {days + i}: {emissions:.2f} kg CO2eq")

    # Visualization - Combined Historical + Predicted
    plt.figure(figsize=(10, 6))
    plt.plot(range(1, days + 1), daily_emissions, marker='o', linestyle='-', color='green', label='Historical Emissions')
    plt.plot(range(days + 1, days + predict_days + 1), forecast_emissions, marker='x', linestyle='--', color='blue', label='Predicted Emissions')
    plt.title('Historical and Predicted GHG Emissions')
    plt.xlabel('Day')
    plt.ylabel('GHG Emissions (kg CO2eq)')
    plt.grid(True)
    plt.legend()
    plt.tight_layout()
    plt.show()

# Example Integration - Replace this with data fetched from your dashboard
# Example historical milk production in liters for 7 days
milk_production_data = [100, 120, 130, 110, 115, 125, 140]  # Replace with your app input

# Run the emission calculator and predictor
calculate_and_predict_emissions(milk_production_data)
