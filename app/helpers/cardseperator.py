from PIL import Image

# Load the uploaded image
image_path = "./vecteezy_set-of-poker-cards-with-isolated-on-white-background-poker_53654344.jpg"
original_image = Image.open(image_path)

# Get image dimensions
image_width, image_height = original_image.size

# Define the grid (13 columns for ranks, 4 rows for suits)
cols = 13  # 13 cards per suit
rows = 4   # 4 suits

# Calculate the width and height of each card
card_width = image_width // cols
card_height = image_height // rows

# Refine the padding adjustments
left_padding = 21    # Less padding on the left to remove white space
right_padding = 10   # Adjusted to avoid cutting off the card's edge
top_padding = 16     # Minor adjustment for the top white space
bottom_padding = 15  # Adjusted for the bottom white space

# Directory to save individual cards
output_dir = "./cards/"
import os
os.makedirs(output_dir, exist_ok=True)

# Crop each card and save
card_names = ['hearts', 'diamonds', 'spades', 'clubs']
file_paths = []

for row in range(rows):
    for col in range(cols):
        # Calculate cropping coordinates
        left = col * card_width + left_padding
        upper = row * card_height + top_padding
        right = (col + 1) * card_width - right_padding
        lower = (row + 1) * card_height - bottom_padding

        
        # Crop the card
        card = original_image.crop((left, upper, right, lower))
        
        # Name cards appropriately
        rank = col + 1
        if rank == 1:
            rank_name = "ace"
        elif rank == 11:
            rank_name = "jack"
        elif rank == 12:
            rank_name = "queen"
        elif rank == 13:
            rank_name = "king"
        else:
            rank_name = str(rank)
        
        card_name = f"{rank_name}_of_{card_names[row]}.png"
        card_path = os.path.join(output_dir, card_name)
        file_paths.append(card_path)
        
        # Save the card
        card.save(card_path)

file_paths
