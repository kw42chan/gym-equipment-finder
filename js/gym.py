class Gym:
    def __init__(self, name, location, postal_code):
        self.name = name
        self.location = location
        self.postal_code = postal_code
        self.equipment = []

    def add_equipment(self, equipment):
        self.equipment.append(equipment)

    def __str__(self):
        return f"Gym: {self.name}, Location: {self.location}, Postal Code: {self.postal_code}"


class Equipment:
    def __init__(self, type, quantity, brand, condition, training_area):
        self.type = type
        self.quantity = quantity
        self.brand = brand
        self.condition = condition
        self.training_area = training_area

    def __str__(self):
        return f"Equipment: {self.type}, Quantity: {self.quantity}, Brand: {self.brand}, Condition: {self.condition}, Training Area: {self.training_area}"

class GymApp:
    def __init__(self):
        self.gyms = []

    def add_gym(self, name, location, postal_code):
        gym = Gym(name, location, postal_code)
        self.gyms.append(gym)
        print(f"Gym '{name}' added.")

    def add_equipment_to_gym(self, gym_name, equipment_type, quantity, brand, condition, training_area):
        gym = self.find_gym_by_name(gym_name)
        if gym:
            equipment = Equipment(equipment_type, quantity, brand, condition, training_area)
            gym.add_equipment(equipment)
            print(f"Equipment '{equipment_type}' added to '{gym_name}'.")
        else:
            print(f"Gym '{gym_name}' not found.")

    def find_gym_by_name(self, gym_name):
        for gym in self.gyms:
            if gym.name == gym_name:
                return gym
        return None

    def search_gyms_by_location(self, location):
        results = [gym for gym in self.gyms if location.lower() in gym.location.lower()]
        return results

    def search_gyms_by_equipment(self, equipment_type):
        results = []
        for gym in self.gyms:
            for equipment in gym.equipment:
                if equipment_type.lower() in equipment.type.lower():
                    results.append(gym)
                    break  # Avoid adding the same gym multiple times
        return results
    
    def list_all_gyms(self):
        if not self.gyms:
            print("No gyms have been added.")
        else:
            for gym in self.gyms:
                print(gym)

    def list_all_equipment(self):
        all_equipment = []
        for gym in self.gyms:
            all_equipment.extend(gym.equipment)
        if not all_equipment:
            print("No equipment has been added.")
        else:
            for equipment in all_equipment:
                print(equipment)

def main():
    app = GymApp()

    while True:
        print("\nGym Equipment App")
        print("1. Add Gym")
        print("2. Add Equipment to Gym")
        print("3. Search Gyms by Location")
        print("4. Search Gyms by Equipment")
        print("5. List all Gyms")
        print("6. List all equipment")
        print("7. Exit")

        choice = input("Enter your choice: ")

        if choice == '1':
            name = input("Enter gym name: ")
            location = input("Enter gym location: ")
            postal_code = input("Enter gym postal code: ")
            app.add_gym(name, location, postal_code)
        elif choice == '2':
            gym_name = input("Enter gym name: ")
            equipment_type = input("Enter equipment type: ")
            quantity = int(input("Enter the quantity of equipment: "))
            brand = input("Enter the brand of the equipment: ")
            condition = input("Enter the condition of the equipment: ")
            training_area = input("Enter the area that the equipment is used to train: ")
            app.add_equipment_to_gym(gym_name, equipment_type, quantity, brand, condition, training_area)
        elif choice == '3':
            location = input("Enter location to search: ")
            results = app.search_gyms_by_location(location)
            if results:
                print("Matching gyms:")
                for gym in results:
                    print(gym)
            else:
                print("No gyms found in that location.")
        elif choice == '4':
            equipment_type = input("Enter equipment type to search: ")
            results = app.search_gyms_by_equipment(equipment_type)
            if results:
                print("Gyms with that equipment:")
                for gym in results:
                    print(gym)
            else:
                print("No gyms found with that equipment.")
        elif choice == '5':
            app.list_all_gyms()
        elif choice == '6':
            app.list_all_equipment()
        elif choice == '7':
            print("Exiting...")
            break
        else:
            print("Invalid choice.")

if __name__ == "__main__":
    main()

