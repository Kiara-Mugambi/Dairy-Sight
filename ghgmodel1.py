import matplotlib.pyplot as plt
import numpy as np
import pandas as pd
from datetime import datetime, timedelta

# Constants
CH4_EMISSION_FACTOR = 0.25  # kg CO2eq per liter of milk
EMISSION_THRESHOLD = 35     # Threshold emissions for guidance (example value)

# Function: Fetch Milk Data (Replace with actual app/database integration)
def fetch_milk_data():
    print("Fetching milk production data from the app/dashboard...")
    # Simulate fetched data; replace this with database or app integration
    fetched_data = [100, 120, 130, 110, 115, 125, 140]  # Mocked data for 7 days
    print(f"Fetched data: {fetched_data}")
    return fetched_data

# Function: Allow Manual Data Entry
def manual_data_entry(days):
    print(f"Please enter milk production data for {days} days.")
    milk_data = []
    for day in range(1, days + 1):
        while True:
            try:
                milk = float(input(f"Enter liters of milk for Day {day}: "))
                if milk < 0:
                    print("Milk production cannot be negative. Please enter again.")
                else:
                    milk_data.append(milk)
                    break
            except ValueError:
                print("Invalid input. Please enter a numeric value.")
    return milk_data

# Function: AI-Like Guidance Based on Emissions
def provide_emission_guidance(milk_data):
    print("\n--- Emission Reduction Guidance ---")
    avg_emissions = sum(milk_data) * CH4_EMISSION_FACTOR / len(milk_data)
    
    # General tips for emission reduction
    print("General Recommendations:")
    print("1. Improve cow feed quality to reduce methane emissions.")
    print("2. Adopt sustainable manure management practices.")
    print("3. Optimize herd management to improve productivity per cow.")
    print("4. Use advanced cooling and storage systems to minimize spoilage.")

    # Specific advice based on emission threshold
    for day, milk in enumerate(milk_data, start=1):
        emissions = milk * CH4_EMISSION_FACTOR
        if emissions > EMISSION_THRESHOLD:
            print(f"\nDay {day}: Emissions are high ({emissions:.2f} kg CO2eq). Consider:")
            print("- Increasing efficiency in production.")
            print("- Reviewing feed and herd management strategies.")

    print(f"\nAverage Daily Emissions: {avg_emissions:.2f} kg CO2eq")
    if avg_emissions > EMISSION_THRESHOLD:
        print("\nOverall Guidance: Your emissions are consistently high. Focus on efficiency and sustainable farming practices to reduce your carbon footprint.")
    else:
        print("\nOverall Guidance: Your emissions are within acceptable limits. Keep maintaining best practices.")

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

    # Provide Guidance
    provide_emission_guidance(milk_data)

# Main Program
if __name__ == "__main__":
    print("Welcome to the GHG Emission Analysis Tool for Dairy Production!\n")
    choice = input("Do you want to fetch data from the app (y/n)? ").strip().lower()
    if choice == 'y':
        milk_production_data = fetch_milk_data()
    else:
        days = int(input("How many days of data do you want to enter? "))
        milk_production_data = manual_data_entry(days)

    # Run the emission calculator and predictor
    calculate_and_predict_emissions(milk_production_data)
