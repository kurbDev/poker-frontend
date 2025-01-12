from PIL import Image
import os

input_folder = "./../../public/cards/images"
output_folder = "./../../public/cards/updated_images"

ranks = [
    "ace", "2", "3", "4", "5", "6", "7", "8", "9", "10", "jack", "queen", "king"
]
suits = ["spades", "hearts", "diamonds", "clubs"]

for rank in ranks:
    for suit in suits:
        gif_filename = f"{rank}_of_{suit}.gif"
        gif_path = os.path.join(input_folder, gif_filename)
        
        if os.path.exists(gif_path):
            with Image.open(gif_path) as img:
                png_filename = f"{rank}_of_{suit}.png"
                png_path = os.path.join(output_folder, png_filename)
                img.save(png_path, "PNG")
                print(f"Converted {gif_filename} to {png_filename}")
        else:
            print(f"File {gif_filename} not found!")

print("Conversion complete!")
