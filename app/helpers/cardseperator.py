from PIL import Image

image_path = "./vecteezy_set-of-poker-cards-with-isolated-on-white-background-poker_53654344.jpg"
original_image = Image.open(image_path)

image_width, image_height = original_image.size

cols = 13 
rows = 4  

card_width = image_width // cols
card_height = image_height // rows

left_padding = 21   
right_padding = 10 
top_padding = 16
bottom_padding = 15 

output_dir = "./cards/"
import os
os.makedirs(output_dir, exist_ok=True)

card_names = ['hearts', 'diamonds', 'spades', 'clubs']
file_paths = []

for row in range(rows):
    for col in range(cols):
        left = col * card_width + left_padding
        upper = row * card_height + top_padding
        right = (col + 1) * card_width - right_padding
        lower = (row + 1) * card_height - bottom_padding

        card = original_image.crop((left, upper, right, lower))
        
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
        card.save(card_path)

file_paths
