import pygame
import random

# Initialize pygame
pygame.init()

# Set up the display
width, height = 800, 600
screen = pygame.display.set_mode((width, height))
pygame.display.set_caption("DairySight: A Fun Simulation")

# Colors
WHITE = (255, 255, 255)
GREEN = (0, 255, 0)
BLUE = (0, 0, 255)
RED = (255, 0, 0)
BLACK = (0, 0, 0)

# GHG Emission Factor (kg CO₂e per liter of milk)
GHG_EMISSION_FACTOR = 1.3  # Example: 1.3 kg CO₂e per liter

# Classes for entities
class Cow:
    def __init__(self):
        self.x = random.randint(50, width - 50)
        self.y = height - 50
        self.speed = random.uniform(0.5, 1.5)  # Reduced speed range

    def move(self):
        self.x += random.choice([-1, 1]) * self.speed
        self.x = max(50, min(self.x, width - 50))

    def draw(self, surface):
        pygame.draw.ellipse(surface, GREEN, (self.x, self.y, 40, 20))
        pygame.draw.ellipse(surface, WHITE, (self.x + 5, self.y - 10, 30, 20))

class MilkTruck:
    def __init__(self):
        self.x = random.randint(50, width - 50)
        self.y = height - 100
        self.speed = random.uniform(1.0, 2.0)  # Reduced speed range
        self.direction = 1

    def move(self):
        self.x += self.direction * self.speed
        if self.x <= 50 or self.x >= width - 50:
            self.direction *= -1

    def draw(self, surface):
        pygame.draw.rect(surface, BLUE, (self.x, self.y, 60, 30))
        pygame.draw.polygon(surface, RED, [(self.x + 60, self.y + 15), (self.x + 70, self.y + 10), (self.x + 70, self.y + 20)])

# Game loop
cows = [Cow() for _ in range(5)]
trucks = [MilkTruck() for _ in range(2)]

clock = pygame.time.Clock()
running = True

while running:
    for event in pygame.event.get():
        if event.type == pygame.QUIT:
            running = False

    screen.fill(WHITE)

    # Draw and update cows
    for cow in cows:
        cow.move()
        cow.draw(screen)

    # Draw and update milk trucks
    for truck in trucks:
        truck.move()
        truck.draw(screen)

    # Simulate data flow with lines
    for i in range(10):
        start_x = random.randint(50, width - 50)
        pygame.draw.line(screen, BLUE, (start_x, height - 50), (start_x, random.randint(50, height - 100)), 2)

    # Generate milk output and calculate GHG emissions
    milk_output = random.randint(100, 1000)  # Milk output in liters
    ghg_emissions = milk_output * GHG_EMISSION_FACTOR  # GHG emissions in kg CO₂e

    # Display fun data and GHG emissions
    font = pygame.font.Font(None, 36)
    text = font.render(f"Milk Output: {milk_output}L", True, BLACK)
    screen.blit(text, (10, 10))

    text = font.render(f"Happy Cows: {random.randint(0, 100)}%", True, BLACK)
    screen.blit(text, (10, 50))

    text = font.render(f"Green Energy Used: {random.randint(0, 100)}%", True, GREEN)
    screen.blit(text, (10, 90))

    # Display GHG emissions
    text = font.render(f"GHG Emissions: {ghg_emissions:.1f} kg CO₂e", True, RED)
    screen.blit(text, (10, 130))

    pygame.display.flip()
    clock.tick(30)

pygame.quit()

