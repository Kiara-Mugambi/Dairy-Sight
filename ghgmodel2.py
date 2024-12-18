import matplotlib.pyplot as plt
import numpy as np
import pandas as pd
from datetime import datetime, timedelta
from sklearn.linear_model import LinearRegression
import warnings

warnings.filterwarnings("ignore", category=FutureWarning)

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

# Function: AI-Driven Guidance for Emission Reduction
def ai_emission_guidance(milk_data):
    print("\n--- AI-Driven Emission Reduction Guidance ---")

    # Prepare data for regression model
    days = np.array(range(1, len(milk_data) + 1)).reshape(-1, 1)
    emissions = np.array([milk * CH4_EMISSION_FACTOR for milk in milk_data]).reshape(-1, 1)

    # Train a linear regression model
    model = LinearRegression()
    model.fit(days, emissions)

    # Predict future trends
    future_days = np.array(range(len(milk_data) + 1, len(milk_data) + 8)).reshape(-1, 1)
    predicted_emissions = model.predict(future_days).flatten()

    # Provide AI Recommendations
    print("AI Insights:")
    if np.mean(emissions) > EMISSION_THRESHOLD:
        print("- Your emissions are consistently high. AI suggests:")
        print("  1. Optimizing feed composition to lower methane production.")
        print("  2. Enhancing herd management to maximize milk yield per cow.")
        print("  3. Implementing advanced cooling/storage solutions to reduce spoilage.")
    else:
        print("- Your emissions are within acceptable limits. Continue current best practices.")

    print("\nPredicted Emissions for Next 7 Days:")
    for i, emission in enumerate(predicted_emissions, start=1):
        print(f"Day {len(milk_data) + i}: {emission:.2f} kg CO2eq")

    # Visualization
    plt.figure(figsize=(10, 6))
    plt.plot(days, emissions, marker='o', linestyle='-', color='green', label='Historical Emissions')
    plt.plot(future_days, predicted_emissions, marker='x', linestyle='--', color='blue', label='Predicted Emissions')
    plt.title('Historical and Predicted GHG Emissions')
    plt.xlabel('Day')
    plt.ylabel('GHG Emissions (kg CO2eq)')
    plt.grid(True)
    plt.legend()
    plt.tight_layout()
    plt.show()

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

    # Provide Guidance
    ai_emission_guidance(milk_data)

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
