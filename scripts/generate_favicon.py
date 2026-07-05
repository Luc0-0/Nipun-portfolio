from PIL import Image, ImageDraw
import os

def round_corners(img, radius):
    """Add rounded corners to an image"""
    # Create a transparent layer for the rounded corners mask
    mask = Image.new('L', img.size, 0)
    mask_draw = ImageDraw.Draw(mask)
    
    # Draw white rounded rectangle on the mask
    mask_draw.rounded_rectangle(
        [(0, 0), (img.size[0] - 1, img.size[1] - 1)],
        radius=radius,
        fill=255
    )
    
    # Apply the mask to the image
    img.putalpha(mask)
    return img

# Open the original image
img = Image.open("public/N.png").convert("RGBA")

sizes = [256, 64, 32, 16]
frames = []

for s in sizes:
    # Resize the image
    resized = img.resize((s, s), Image.LANCZOS)
    
    # Add rounded corners (radius is ~20% of size)
    radius = max(2, int(s * 0.15))
    rounded = round_corners(resized, radius)
    
    frames.append(rounded)

# Save favicon.ico with all sizes
frames[0].save(
    "public/favicon.ico",
    format="ICO",
    append_images=frames[1:],
    sizes=[(s, s) for s in sizes]
)

# Save individual PNG versions for preview
frames[0].save("public/favicon-256.png", "PNG")
frames[2].save("public/favicon-32.png", "PNG")

print("Favicon generated successfully!")
print("- public/favicon.ico (multi-resolution)")
print("- public/favicon-256.png")
print("- public/favicon-32.png")
