from PIL import Image
import os

# Folder containing the GIF files
input_folder = "./../../public/cards/images"
# Folder where converted PNGs will be saved
output_folder = "./../../public/cards/updated_images"

# List of ranks and suits (modify if necessary)
ranks = [
    "ace", "2", "3", "4", "5", "6", "7", "8", "9", "10", "jack", "queen", "king"
]
suits = ["spades", "hearts", "diamonds", "clubs"]

# Loop through each rank and suit to convert GIF to PNG
for rank in ranks:
    for suit in suits:
        # Construct the filename for the GIF
        gif_filename = f"{rank}_of_{suit}.gif"
        # Construct the full input path (GIF location)
        gif_path = os.path.join(input_folder, gif_filename)
        
        # Check if the GIF file exists
        if os.path.exists(gif_path):
            # Open the GIF file
            with Image.open(gif_path) as img:
                # Save it as a PNG file (you can also save it as JPEG by using .jpg extension)
                png_filename = f"{rank}_of_{suit}.png"
                png_path = os.path.join(output_folder, png_filename)
                img.save(png_path, "PNG")  # Or use "JPEG" for JPEG format
                print(f"Converted {gif_filename} to {png_filename}")
        else:
            print(f"File {gif_filename} not found!")

print("Conversion complete!")
