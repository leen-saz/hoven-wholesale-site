#!/usr/bin/env python3
"""
Generate 30-frame sequences for new product categories
Converts generated images to 30-frame video sequences
"""

import os
import subprocess
from pathlib import Path
from PIL import Image, ImageDraw, ImageFont
import time

FRAMES_DIR = Path("public/frames")
PRODUCTS_DIR = Path("public/products")

def ensure_directories():
    """Create necessary directories"""
    FRAMES_DIR.mkdir(parents=True, exist_ok=True)
    PRODUCTS_DIR.mkdir(parents=True, exist_ok=True)

    # Create subdirectories for new products
    for product in ["pillow-standard", "pillow-premium", "sheets-sateen", "sheets-percale", "pad-quilted", "pad-waterproof"]:
        (FRAMES_DIR / product).mkdir(parents=True, exist_ok=True)

def create_frame_sequence_from_image(image_path, product_name, frame_count=30):
    """
    Create 30-frame sequence from a single product image
    Each frame has subtle variations (zoom, rotation, lighting simulation)
    """
    try:
        base_image = Image.open(image_path).convert('RGB')
        base_width, base_height = base_image.size

        frames_path = FRAMES_DIR / product_name

        for frame_num in range(1, frame_count + 1):
            # Create frame number
            frame_name = f"frame-{frame_num:04d}.jpg"
            output_path = frames_path / frame_name

            # Calculate subtle transformations for each frame
            # This creates a cinematic 30-frame sequence with smooth motion
            progress = frame_num / frame_count  # 0.0 to 1.0

            # Subtle zoom effect (1.0 to 1.02)
            zoom_factor = 1.0 + (progress * 0.02)

            # Calculate new size with zoom
            new_width = int(base_width * zoom_factor)
            new_height = int(base_height * zoom_factor)

            # Resize image (zoom effect)
            zoomed = base_image.resize((new_width, new_height), Image.Resampling.LANCZOS)

            # Create output canvas (same size as original)
            frame = Image.new('RGB', (base_width, base_height), color=(255, 255, 255))

            # Paste zoomed image centered
            offset_x = (base_width - new_width) // 2
            offset_y = (base_height - new_height) // 2
            frame.paste(zoomed, (offset_x, offset_y))

            # Optional: Add subtle lighting/brightness variation
            # Simulate changing lighting angle across frames
            brightness_factor = 1.0 + (0.05 * (0.5 - abs(progress - 0.5)))

            # Apply brightness adjustment
            from PIL import ImageEnhance
            enhancer = ImageEnhance.Brightness(frame)
            frame = enhancer.enhance(brightness_factor)

            # Save frame
            frame.save(output_path, quality=95)
            print(f"✓ Created {product_name}: {frame_name}")

    except Exception as e:
        print(f"✗ Error creating frames for {product_name}: {e}")

def download_higgsfield_image(job_id, product_name):
    """Download generated image from Higgsfield and create frames"""
    try:
        # Note: In production, this would fetch from Higgsfield API
        # For now, we'll create a placeholder
        print(f"Downloading image for {product_name} from Higgsfield...")
        # Placeholder - actual implementation would use Higgsfield API
        return True
    except Exception as e:
        print(f"✗ Error downloading image: {e}")
        return False

def create_placeholder_image(product_name):
    """Create a high-quality placeholder image for testing"""
    colors = {
        "pillow": (245, 245, 245),  # Off-white
        "sheets": (250, 250, 250),   # Pure white
        "pad": (248, 248, 248)       # Almost white (with black border coming)
    }

    # Determine which color based on product
    if "pillow" in product_name:
        bg_color = colors["pillow"]
        title_text = "Luxury Pillow"
    elif "sheets" in product_name:
        bg_color = colors["sheets"]
        title_text = "Premium Linens"
    else:
        bg_color = colors["pad"]
        title_text = "Mattress Pad"

    # Create base image
    img = Image.new('RGB', (1920, 1080), color=bg_color)
    draw = ImageDraw.Draw(img)

    # Add product name text for reference
    draw.text((50, 50), f"{product_name.upper()}", fill=(100, 100, 100))
    draw.text((50, 100), f"Product Image (Placeholder)", fill=(150, 150, 150))

    # Save as temporary
    temp_path = PRODUCTS_DIR / f"{product_name}.jpg"
    img.save(temp_path, quality=95)

    return temp_path

def main():
    print("🎬 Starting 30-Frame Sequence Generation for New Products\n")

    ensure_directories()

    # New products to create frames for
    products = {
        "pillow-standard": "Standard Hotel Pillow",
        "pillow-premium": "Premium Hotel Pillow",
        "sheets-sateen": "Sateen Hotel Linens",
        "sheets-percale": "Percale Hotel Linens",
        "pad-quilted": "Quilted Mattress Pad",
        "pad-waterproof": "Waterproof Mattress Pad"
    }

    print("📋 Creating 30-frame sequences for each product...\n")

    for product_id, product_name in products.items():
        print(f"Processing: {product_name} ({product_id})")

        # Create placeholder image (in production, this would be from Higgsfield)
        image_path = create_placeholder_image(product_id)

        # Generate 30-frame sequence from the image
        create_frame_sequence_from_image(image_path, product_id, frame_count=30)
        print(f"✅ Completed: {product_name}\n")

    print("\n🎉 All 30-frame sequences generated successfully!")
    print(f"Total products: {len(products)}")
    print(f"Frames per product: 30")
    print(f"Total frames: {len(products) * 30}")

if __name__ == "__main__":
    main()
