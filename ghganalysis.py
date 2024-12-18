import matplotlib.pyplot as plt
import random

def calculate_milk_emissions():
    print("\nWelcome to the Milk GHG Emissions Analyzer!")
    print("This model calculates emissions for daily milk production and visualizes it.\n")

    # Constants
    CH4_EMISSION_FACTOR = 0.25  # kg CO2eq per liter of milk

    # Input: Daily milk production data (liters)
    try:
        days = int(input("Enter the number of days to simulate: "))
        daily_milk_production = []

        for day in range(1, days + 1):
            milk_liters = float(input(f"Enter liters of milk produced on day {day}: "))
            daily_milk_production.append(milk_liters)

        # Calculations: Daily emissions
        daily_emissions = [milk * CH4_EMISSION_FACTOR for milk in daily_milk_production]
        total_emissions = sum(daily_emissions)

        # Display Results
        print("\n--- GHG Emissions Summary ---")
        for i, emissions in enumerate(daily_emissions, 1):
            print(f"Day {i}: {emissions:.2f} kg CO2eq")
        print(f"\nTotal GHG Emissions over {days} days: {total_emissions:.2f} kg CO2eq")

        # Visualization
        plt.figure(figsize=(10, 6))
        plt.plot(range(1, days + 1), daily_emissions, marker='o', linestyle='-', color='green', label='Daily Emissions')
        plt.title('Daily GHG Emissions from Milk Production')
        plt.xlabel('Day')
        plt.ylabel('GHG Emissions (kg CO2eq)')
        plt.xticks(range(1, days + 1))
        plt.grid(True)
        plt.legend()
        plt.tight_layout()
        plt.show()

    except ValueError:
        print("\nError: Please enter valid numerical values for inputs.")

# Run the GHG Emission Calculator
calculate_milk_emissions()
