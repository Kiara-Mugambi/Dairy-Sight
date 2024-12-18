import sqlite3
import time

def setup_database():
    conn = sqlite3.connect('milk_simulation.db')
    cursor = conn.cursor()
    cursor.execute('''CREATE TABLE IF NOT EXISTS milk_data (
                        id INTEGER PRIMARY KEY,
                        liters REAL,
                        ghg_emission REAL,
                        fermented REAL,
                        timestamp DATETIME DEFAULT CURRENT_TIMESTAMP)''')
    conn.commit()
    conn.close()

def add_entry(liters, ghg_emission, fermented):
    conn = sqlite3.connect('milk_simulation.db')
    cursor = conn.cursor()
    cursor.execute("INSERT INTO milk_data (liters, ghg_emission, fermented) VALUES (?, ?, ?)",
                   (liters, ghg_emission, fermented))
    conn.commit()
    conn.close()

def view_history():
    conn = sqlite3.connect('milk_simulation.db')
    cursor = conn.cursor()
    cursor.execute("SELECT * FROM milk_data")
    rows = cursor.fetchall()
    for row in rows:
        print(f"ID: {row[0]}, Liters: {row[1]}, GHG: {row[2]}kg CO2, Fermented: {row[3]}L, Time: {row[4]}")
    conn.close()

def run_simulation():
    print("\n--- New Milk Simulation ---")
    liters = float(input("Enter liters of milk: "))
    fermented = float(input("Enter liters for fermentation: "))
    ghg_emission = liters * 1.9  # Example: 1.9kg CO2 per liter.
    print(f"GHG Emitted: {ghg_emission}kg CO2")
    print(f"Milk left for fermentation: {fermented} liters.")
    
    # Save data
    add_entry(liters, ghg_emission, fermented)

def main():
    setup_database()
    while True:
        print("\n1. Start New Simulation")
        print("2. View History")
        print("3. Exit")
        choice = input("Choose an option: ")
        if choice == '1':
            run_simulation()
        elif choice == '2':
            view_history()
        elif choice == '3':
            print("Goodbye!")
            break
        else:
            print("Invalid choice. Try again.")

if __name__ == "__main__":
    main()
