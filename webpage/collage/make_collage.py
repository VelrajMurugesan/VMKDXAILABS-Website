from PIL import Image, ImageDraw, ImageFont, ExifTags
import os

A4_WIDTH = 2480
A4_HEIGHT = 3508
collage_dir = os.path.dirname(os.path.abspath(__file__))

images_data = [
    ("1. sand.jpeg", "1. Adding Sand to the Pot"),
    ("2.seed.jpeg", "2. Planting the Seed"),
    ("3.seed.jpeg", "3. Pressing Seed into Soil"),
    ("4. water.jpeg", "4. Watering the Planted Seed"),
    ("5. water.jpeg", "5. Watering the Growing Plant"),
    ("6. water.jpeg", "6. Caring for the Plant"),
    ("7. water.jpeg", "7. Watching the Plant Sprout"),
]

# Sapling images for decoration (real PNGs)
sapling_files = ["sapling_5.png", "sapling_4.png", "sapling_1.png"]

COLS = 3
ROWS = 3
MARGIN = 50
TITLE_HEIGHT = 120
CAPTION_HEIGHT = 60
SPACING = 30
BORDER = 5

available_width = A4_WIDTH - 2 * MARGIN - (COLS - 1) * SPACING
cell_width = available_width // COLS
available_height = A4_HEIGHT - 2 * MARGIN - TITLE_HEIGHT - ROWS * CAPTION_HEIGHT - (ROWS - 1) * SPACING
cell_img_height = available_height // ROWS

canvas = Image.new("RGB", (A4_WIDTH, A4_HEIGHT), (240, 248, 240))
draw = ImageDraw.Draw(canvas)

try:
    title_font = ImageFont.truetype("C:/Windows/Fonts/arialbd.ttf", 90)
    caption_font = ImageFont.truetype("C:/Windows/Fonts/arial.ttf", 38)
except:
    title_font = ImageFont.load_default()
    caption_font = ImageFont.load_default()


# --- Colorful rainbow title ---
def draw_colorful_title(draw, text, font, center_x, y):
    colors = [
        (220, 50, 50),    # Red
        (240, 130, 30),   # Orange
        (230, 190, 20),   # Yellow
        (50, 170, 70),    # Green
        (40, 130, 200),   # Blue
        (120, 60, 180),   # Purple
        (200, 50, 150),   # Pink
    ]
    # Measure total width
    total_bbox = draw.textbbox((0, 0), text, font=font)
    total_w = total_bbox[2] - total_bbox[0]
    x = center_x - total_w // 2

    # Draw each character with a cycling color
    color_idx = 0
    for ch in text:
        ch_bbox = draw.textbbox((0, 0), ch, font=font)
        ch_w = ch_bbox[2] - ch_bbox[0]
        if ch.strip():
            # Draw shadow
            draw.text((x + 3, y + 3), ch, fill=(180, 180, 180), font=font)
            # Draw character
            draw.text((x, y), ch, fill=colors[color_idx % len(colors)], font=font)
            color_idx += 1
        else:
            draw.text((x, y), ch, fill=(0, 0, 0), font=font)
        x += ch_w


draw_colorful_title(draw, "My Gardening Project", title_font, A4_WIDTH // 2, 15)

# Colorful decorative line under title
line_y = 110
segment_w = 100
colors_line = [(220,50,50), (240,130,30), (230,190,20), (50,170,70), (40,130,200), (120,60,180), (200,50,150)]
line_start = A4_WIDTH // 2 - (len(colors_line) * segment_w) // 2
for i, c in enumerate(colors_line):
    draw.line([(line_start + i * segment_w, line_y),
               (line_start + (i + 1) * segment_w, line_y)], fill=c, width=5)

start_y = TITLE_HEIGHT + 10


def fix_orientation(img):
    try:
        exif = img._getexif()
        if exif:
            for tag, value in exif.items():
                if ExifTags.TAGS.get(tag) == "Orientation":
                    if value == 3:
                        img = img.rotate(180, expand=True)
                    elif value == 6:
                        img = img.rotate(270, expand=True)
                    elif value == 8:
                        img = img.rotate(90, expand=True)
    except:
        pass
    return img


def fit_image(img, target_w, target_h):
    img_ratio = img.width / img.height
    target_ratio = target_w / target_h
    if img_ratio > target_ratio:
        new_h = target_h
        new_w = int(target_h * img_ratio)
    else:
        new_w = target_w
        new_h = int(target_w / img_ratio)
    img = img.resize((new_w, new_h), Image.LANCZOS)
    left = (new_w - target_w) // 2
    top = (new_h - target_h) // 2
    return img.crop((left, top, left + target_w, top + target_h))


def paste_sapling(canvas, sapling_path, cx, cy, size):
    """Paste a sapling PNG centered at (cx, cy) with given size, preserving transparency."""
    sap = Image.open(sapling_path).convert("RGBA")
    sap = sap.resize((size, size), Image.LANCZOS)
    # Position so it's centered
    x = cx - size // 2
    y = cy - size // 2
    # Paste with transparency mask
    canvas.paste(sap, (x, y), sap)


# Place photo images
for idx, (filename, caption) in enumerate(images_data):
    row = idx // COLS
    col = idx % COLS
    items_in_row = min(COLS, len(images_data) - row * COLS)
    if items_in_row < COLS:
        row_offset = (A4_WIDTH - items_in_row * cell_width - (items_in_row - 1) * SPACING) // 2
    else:
        row_offset = MARGIN
    x = row_offset + col * (cell_width + SPACING)
    y = start_y + row * (cell_img_height + CAPTION_HEIGHT + SPACING)

    img = Image.open(os.path.join(collage_dir, filename))
    img = fix_orientation(img)
    fitted = fit_image(img, cell_width, cell_img_height)

    draw.rounded_rectangle(
        [x - BORDER, y - BORDER, x + cell_width + BORDER, y + cell_img_height + BORDER],
        radius=14, fill=(50, 160, 90))
    canvas.paste(fitted, (x, y))

    cbbox = draw.textbbox((0, 0), caption, font=caption_font)
    cw = cbbox[2] - cbbox[0]
    draw.text((x + (cell_width - cw) // 2, y + cell_img_height + BORDER + 8),
              caption, fill=(35, 75, 45), font=caption_font)



output_path = os.path.join(collage_dir, "collage.png")
canvas.save(output_path, "PNG", dpi=(300, 300), quality=100)
print(f"Collage saved: {output_path}")
