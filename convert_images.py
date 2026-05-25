import os
from PIL import Image

# Input folder (read PNG files from here)
input_folder = r"C:\Users\SharmaArj\OneDrive - Informa plc\Pictures\Screenshots"

output_folder = r"C:\arjit-32\Computer-Science-Primer"

# Output folder (save WebP files here)
output_folder = os.path.join(output_folder, "converted_images")

# Create output folder if it doesn't exist
if not os.path.exists(output_folder):
    os.makedirs(output_folder)

# Loop through files in input folder
for filename in os.listdir(input_folder):
    if filename.lower().endswith(".png"):
        file_path = os.path.join(input_folder, filename)
        try:
            # Open image and convert to RGB
            img = Image.open(file_path).convert("RGB")

            # Build new filename with .webp extension
            new_filename = os.path.splitext(filename)[0] + ".webp"
            new_file_path = os.path.join(output_folder, new_filename)

            # Double-check folder exists before saving
            os.makedirs(os.path.dirname(new_file_path), exist_ok=True)

            # Save as WebP
            img.save(new_file_path, "WEBP")

            print(f"✅ Converted: {filename} → {new_filename}")
        except Exception as e:
            print(f"❌ Failed to convert {filename}: {e}")