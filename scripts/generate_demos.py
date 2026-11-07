#!/usr/bin/env python3
"""
Generate professional animated GIF demos for Veilkit README and docs.
Uses PIL and ffmpeg palettegen/paletteuse for 60fps/24fps crisp retina visuals.
"""

import os
import math
import shutil
import subprocess
from PIL import Image, ImageDraw, ImageFont

FONT_PATH = "/System/Library/Fonts/Helvetica.ttc"
BOLD_FONT_PATH = "/System/Library/Fonts/Helvetica.ttc"

def get_font(size, bold=False):
    try:
        index = 1 if bold else 0
        return ImageFont.truetype(FONT_PATH, size=size, index=index)
    except Exception:
        try:
            return ImageFont.truetype("/System/Library/Fonts/Supplemental/Arial.ttf", size=size)
        except Exception:
            return ImageFont.load_default()

def draw_window_frame(draw, width, height, title="veilkit.tashanto.com"):
    # Window background
    draw.rounded_rectangle([0, 0, width - 1, height - 1], radius=14, fill="#0b0f19", outline="#1e293b", width=1)
    # Title bar
    draw.rounded_rectangle([0, 0, width - 1, 42], radius=14, fill="#0f172a")
    draw.rectangle([0, 28, width - 1, 42], fill="#0f172a")
    draw.line([0, 42, width - 1, 42], fill="#1e293b", width=1)
    
    # Traffic lights
    draw.ellipse([16, 15, 28, 27], fill="#ef4444")
    draw.ellipse([36, 15, 48, 27], fill="#f59e0b")
    draw.ellipse([56, 15, 68, 27], fill="#10b981")
    
    # Search/address bar
    bar_w, bar_h = 320, 24
    bx = (width - bar_w) // 2
    by = 9
    draw.rounded_rectangle([bx, by, bx + bar_w, by + bar_h], radius=6, fill="#1e293b")
    font_bar = get_font(12)
    draw.text((bx + 12, by + 4), f"🔒 https://{title}", fill="#94a3b8", font=font_bar)

def render_hero_demo(tmp_dir, out_path):
    os.makedirs(tmp_dir, exist_ok=True)
    width, height = 860, 460
    fps = 24
    total_frames = 72 # 3 seconds
    
    font_title = get_font(18, bold=True)
    font_sub = get_font(13)
    font_btn = get_font(13, bold=True)
    font_tag = get_font(11, bold=True)
    font_price = get_font(16, bold=True)
    
    for f in range(total_frames):
        t = f / fps
        im = Image.new("RGBA", (width, height), (11, 15, 25, 255))
        draw = ImageDraw.Draw(im)
        draw_window_frame(draw, width, height, "veilkit.tashanto.com — synchronized 60fps skeletons")
        
        # State machine:
        # 0.0s - 1.6s: Skeleton shimmer
        # 1.6s - 2.0s: Reveal crossfade
        # 2.0s - 2.8s: Real UI
        # 2.8s - 3.0s: Reset
        reveal_p = 0.0
        if t < 1.5:
            reveal_p = 0.0
        elif t < 2.0:
            reveal_p = (t - 1.5) / 0.5
        elif t < 2.7:
            reveal_p = 1.0
        else:
            reveal_p = 1.0 - (t - 2.7) / 0.3
            
        # Shimmer position (sweeps across 0 -> width)
        shimmer_x = ((f * 18) % (width + 400)) - 200
        
        # Left card (Product card: 360w x 360h)
        cx, cy, cw, ch = 36, 64, 380, 366
        draw.rounded_rectangle([cx, cy, cx + cw, cy + ch], radius=12, fill="#131c31", outline="#1e293b", width=1)
        
        # Right container (KPI + Chart: 380w x 366h)
        rx, ry, rw, rh = 444, 64, 380, 366
        draw.rounded_rectangle([rx, ry, rx + rw, ry + rh], radius=12, fill="#131c31", outline="#1e293b", width=1)
        
        # Draw Left Card Content
        if reveal_p < 0.5:
            # SKELETON
            # Image placeholder
            draw.rounded_rectangle([cx + 16, cy + 16, cx + cw - 16, cy + 200], radius=8, fill="#1e293b")
            # Category chip
            draw.rounded_rectangle([cx + 16, cy + 218, cx + 90, cy + 236], radius=999, fill="#1e293b")
            # Title lines
            draw.rounded_rectangle([cx + 16, cy + 248, cx + cw - 40, cy + 268], radius=6, fill="#1e293b")
            draw.rounded_rectangle([cx + 16, cy + 276, cx + cw - 120, cy + 292], radius=6, fill="#1e293b")
            # Price & Button
            draw.rounded_rectangle([cx + 16, cy + 314, cx + 110, cy + 338], radius=6, fill="#1e293b")
            draw.rounded_rectangle([cx + cw - 140, cy + 308, cx + cw - 16, cy + 348], radius=8, fill="#1e293b")
            
            # Synchronized Shimmer Highlights
            # We can create a soft gradient sheen over the skeleton elements
            for elem in [
                [cx + 16, cy + 16, cx + cw - 16, cy + 200],
                [cx + 16, cy + 218, cx + 90, cy + 236],
                [cx + 16, cy + 248, cx + cw - 40, cy + 268],
                [cx + 16, cy + 276, cx + cw - 120, cy + 292],
                [cx + 16, cy + 314, cx + 110, cy + 338],
                [cx + cw - 140, cy + 308, cx + cw - 16, cy + 348],
            ]:
                el_x1, el_y1, el_x2, el_y2 = elem
                if el_x1 <= shimmer_x <= el_x2 + 80:
                    sheen_pos = max(el_x1, min(el_x2, shimmer_x))
                    draw.rectangle([sheen_pos - 20, el_y1, min(el_x2, sheen_pos + 40), el_y2], fill="#334155")
        else:
            # REVEALED UI
            # Product Image banner (sleek dark aesthetic)
            draw.rounded_rectangle([cx + 16, cy + 16, cx + cw - 16, cy + 200], radius=8, fill="#1e1e38")
            # Headphones graphic mockup in banner
            draw.ellipse([cx + 140, cy + 46, cx + 240, cy + 146], outline="#38bdf8", width=4)
            draw.rounded_rectangle([cx + 130, cy + 86, cx + 150, cy + 146], radius=6, fill="#38bdf8")
            draw.rounded_rectangle([cx + 230, cy + 86, cx + 250, cy + 146], radius=6, fill="#38bdf8")
            draw.text((cx + 148, cy + 160), "STUDIO AUDIO", fill="#64748b", font=font_tag)
            
            # Category chip
            draw.rounded_rectangle([cx + 16, cy + 218, cx + 90, cy + 236], radius=999, fill="#0369a1")
            draw.text((cx + 26, cy + 221), "PREMIUM", fill="#ffffff", font=font_tag)
            
            # Title
            draw.text((cx + 16, cy + 246), "Veil Acoustic Pro Wireless", fill="#f8fafc", font=font_title)
            draw.text((cx + 16, cy + 274), "Active Noise Cancelling • Spatial Audio", fill="#94a3b8", font=font_sub)
            
            # Price & Button
            draw.text((cx + 16, cy + 314), "$349.00", fill="#38bdf8", font=font_price)
            # Buy button
            draw.rounded_rectangle([cx + cw - 140, cy + 308, cx + cw - 16, cy + 348], radius=8, fill="#0284c7")
            draw.text((cx + cw - 120, cy + 318), "Add to Cart", fill="#ffffff", font=font_btn)
            
        # Draw Right Card Content
        if reveal_p < 0.5:
            # SKELETON
            # Metric Card 1
            draw.rounded_rectangle([rx + 16, ry + 16, rx + 180, ry + 106], radius=8, fill="#1e293b")
            # Metric Card 2
            draw.rounded_rectangle([rx + 200, ry + 16, rx + rw - 16, ry + 106], radius=8, fill="#1e293b")
            # Chart Area
            draw.rounded_rectangle([rx + 16, ry + 126, rx + rw - 16, ry + 276], radius=8, fill="#1e293b")
            # Action Row
            draw.rounded_rectangle([rx + 16, ry + 296, rx + rw - 16, ry + 348], radius=8, fill="#1e293b")
            
            for elem in [
                [rx + 16, ry + 16, rx + 180, ry + 106],
                [rx + 200, ry + 16, rx + rw - 16, ry + 106],
                [rx + 16, ry + 126, rx + rw - 16, ry + 276],
                [rx + 16, ry + 296, rx + rw - 16, ry + 348],
            ]:
                el_x1, el_y1, el_x2, el_y2 = elem
                if el_x1 <= shimmer_x <= el_x2 + 80:
                    sheen_pos = max(el_x1, min(el_x2, shimmer_x))
                    draw.rectangle([sheen_pos - 20, el_y1, min(el_x2, sheen_pos + 40), el_y2], fill="#334155")
        else:
            # REVEALED
            # Metric 1
            draw.rounded_rectangle([rx + 16, ry + 16, rx + 180, ry + 106], radius=8, fill="#1e293b")
            draw.text((rx + 28, ry + 28), "MONTHLY ACTIVE", fill="#94a3b8", font=font_tag)
            draw.text((rx + 28, ry + 52), "128,420", fill="#f8fafc", font=font_title)
            draw.text((rx + 28, ry + 80), "+18.4% vs last mo", fill="#10b981", font=font_tag)
            
            # Metric 2
            draw.rounded_rectangle([rx + 200, ry + 16, rx + rw - 16, ry + 106], radius=8, fill="#1e293b")
            draw.text((rx + 212, ry + 28), "GPU RENDER FPS", fill="#94a3b8", font=font_tag)
            draw.text((rx + 212, ry + 52), "60.0 FPS", fill="#38bdf8", font=font_title)
            draw.text((rx + 212, ry + 80), "0 Layout Thrashing", fill="#10b981", font=font_tag)
            
            # Chart Area
            draw.rounded_rectangle([rx + 16, ry + 126, rx + rw - 16, ry + 276], radius=8, fill="#1e293b")
            draw.text((rx + 28, ry + 140), "Performance Latency (Sub-millisecond)", fill="#cbd5e1", font=font_sub)
            # Simulated chart curve
            chart_pts = [
                (rx + 36, ry + 240),
                (rx + 90, ry + 220),
                (rx + 150, ry + 235),
                (rx + 210, ry + 190),
                (rx + 270, ry + 175),
                (rx + 340, ry + 160)
            ]
            draw.line(chart_pts, fill="#0ea5e9", width=3)
            for px, py in chart_pts:
                draw.ellipse([px - 4, py - 4, px + 4, py + 4], fill="#38bdf8")
                
            # Bottom row banner
            draw.rounded_rectangle([rx + 16, ry + 296, rx + rw - 16, ry + 348], radius=8, fill="#1e1b4b")
            draw.text((rx + 28, ry + 312), "✦ Synchronized Timelines Across Every Node", fill="#a855f7", font=font_sub)
            
        # Top banner status badge
        status_text = "STATUS: SKELETON (SHIMMER)" if reveal_p < 0.5 else "STATUS: REVEALED (CONTENT)"
        badge_color = "#3b82f6" if reveal_p < 0.5 else "#10b981"
        draw.rounded_rectangle([width - 250, 11, width - 20, 31], radius=6, fill=badge_color)
        draw.text((width - 240, 15), status_text, fill="#ffffff", font=font_tag)
            
        im.save(os.path.join(tmp_dir, f"frame_{f:03d}.png"))
        
    cmd = f'/opt/homebrew/bin/ffmpeg -y -framerate {fps} -i {tmp_dir}/frame_%03d.png -vf "split[s0][s1];[s0]palettegen=max_colors=128:reserve_transparent=0[p];[s1][p]paletteuse=dither=bayer:bayer_scale=3" {out_path}'
    subprocess.run(cmd, shell=True, check=True)
    print(f"✓ Generated {out_path} ({os.path.getsize(out_path)} bytes)")

def render_spinners_demo(tmp_dir, out_path):
    os.makedirs(tmp_dir, exist_ok=True)
    width, height = 800, 260
    fps = 24
    total_frames = 48 # 2 seconds loop
    
    font_name = get_font(12, bold=True)
    font_sub = get_font(10)
    
    # 6 featured spinners:
    # 1. Arc-Gradient (conic spin)
    # 2. Atom (orbital rings)
    # 3. Pulse-Ring (sonar ripple)
    # 4. Infinity (figure-8)
    # 5. Equalizer (audio bars)
    # 6. Morph-Circle
    
    spinners = [
        {"name": "arc-gradient", "label": "Conic Arc"},
        {"name": "atom", "label": "Atom Orbit"},
        {"name": "pulse-ring", "label": "Pulse Sonar"},
        {"name": "infinity", "label": "Infinity 8"},
        {"name": "equalizer", "label": "Equalizer"},
        {"name": "morph", "label": "Morph Orb"},
    ]
    
    for f in range(total_frames):
        t = f / fps
        angle = (f / total_frames) * 2 * math.pi
        
        im = Image.new("RGBA", (width, height), (11, 15, 25, 255))
        draw = ImageDraw.Draw(im)
        
        # Header banner
        draw.rounded_rectangle([16, 12, width - 16, 44], radius=8, fill="#131c31", outline="#1e293b", width=1)
        font_header = get_font(13, bold=True)
        draw.text((28, 20), "✦ 30 Built-in Ultra-Smooth GPU Spinners (CSS & SVG, Glass & Neon)", fill="#38bdf8", font=font_header)
        
        spacing = (width - 32) / 6
        for i, s in enumerate(spinners):
            cx = 16 + i * spacing + spacing / 2
            cy = 130
            
            # Glass container
            cw, ch = 110, 160
            draw.rounded_rectangle([cx - cw/2, cy - ch/2 + 10, cx + cw/2, cy + ch/2 + 10], radius=10, fill="#131c31", outline="#1e293b", width=1)
            
            # Draw specific spinner
            if s["name"] == "arc-gradient":
                # Arc ring rotating
                r = 24
                start_deg = math.degrees(angle)
                draw.arc([cx - r, cy - r, cx + r, cy + r], start=start_deg, end=start_deg + 260, fill="#38bdf8", width=4)
                # glowing dot
                dot_a = math.radians(start_deg + 260)
                dx = cx + r * math.cos(dot_a)
                dy = cy + r * math.sin(dot_a)
                draw.ellipse([dx - 3, dy - 3, dx + 3, dy + 3], fill="#ffffff")
                
            elif s["name"] == "atom":
                r1, r2 = 26, 10
                for rot in [0, 60, 120]:
                    rad = math.radians(rot)
                    # draw ellipse
                    draw.arc([cx - r1, cy - r2, cx + r1, cy + r2], 0, 360, fill="#64748b", width=2)
                # Nucleus
                draw.ellipse([cx - 5, cy - 5, cx + 5, cy + 5], fill="#00f0ff")
                # Electron
                ex = cx + 24 * math.cos(angle * 2)
                ey = cy + 9 * math.sin(angle * 2)
                draw.ellipse([ex - 3, ey - 3, ex + 3, ey + 3], fill="#38bdf8")
                
            elif s["name"] == "pulse-ring":
                # 3 expanding sonar rings
                for ring_i in range(3):
                    prog = (f / total_frames + ring_i / 3) % 1.0
                    r = prog * 28 + 4
                    alpha_fill = int((1.0 - prog) * 255)
                    # outline color in hex representation or RGBA
                    draw.ellipse([cx - r, cy - r, cx + r, cy + r], outline="#0284c7", width=2)
                draw.ellipse([cx - 6, cy - 6, cx + 6, cy + 6], fill="#38bdf8")
                
            elif s["name"] == "infinity":
                # Figure 8 trace
                pts = []
                for step in range(30):
                    theta = (step / 30) * 2 * math.pi
                    scale = 2 / (3 - math.cos(2 * theta))
                    x = cx + scale * math.cos(theta) * 22
                    y = cy + scale * math.sin(2 * theta) / 2 * 22
                    pts.append((x, y))
                draw.point(pts, fill="#475569")
                # Glowing tracing dot
                scale = 2 / (3 - math.cos(2 * angle))
                dot_x = cx + scale * math.cos(angle) * 22
                dot_y = cy + scale * math.sin(2 * angle) / 2 * 22
                draw.ellipse([dot_x - 5, dot_y - 5, dot_x + 5, dot_y + 5], fill="#a855f7")
                
            elif s["name"] == "equalizer":
                # 4 equalizer bars
                bar_w = 4
                gap = 4
                start_x = cx - (4 * (bar_w + gap)) / 2
                for b_i in range(4):
                    bar_h = 10 + 16 * math.sin(angle * 3 + b_i * 1.2)**2
                    bx = start_x + b_i * (bar_w + gap)
                    by = cy + 16 - bar_h
                    draw.rounded_rectangle([bx, by, bx + bar_w, cy + 16], radius=2, fill="#10b981")
                    
            elif s["name"] == "morph":
                # Morphing pulsing circle
                r = 18 + 5 * math.sin(angle * 2)
                draw.ellipse([cx - r, cy - r, cx + r, cy + r], fill="#6366f1")
                draw.ellipse([cx - r/2, cy - r/2, cx + r/2, cy + r/2], fill="#818cf8")
            
            # Label
            draw.text((cx - 36, cy + 54), s["name"], fill="#f8fafc", font=font_name)
            draw.text((cx - 30, cy + 70), s["label"], fill="#94a3b8", font=font_sub)
            
        im.save(os.path.join(tmp_dir, f"frame_{f:03d}.png"))
        
    cmd = f'/opt/homebrew/bin/ffmpeg -y -framerate {fps} -i {tmp_dir}/frame_%03d.png -vf "split[s0][s1];[s0]palettegen=max_colors=128:reserve_transparent=0[p];[s1][p]paletteuse=dither=bayer:bayer_scale=3" {out_path}'
    subprocess.run(cmd, shell=True, check=True)
    print(f"✓ Generated {out_path} ({os.path.getsize(out_path)} bytes)")

def render_button_demo(tmp_dir, out_path):
    os.makedirs(tmp_dir, exist_ok=True)
    width, height = 800, 220
    fps = 24
    total_frames = 72 # 3 seconds
    
    font_btn = get_font(15, bold=True)
    font_status = get_font(13, bold=True)
    font_desc = get_font(12)
    
    for f in range(total_frames):
        t = f / fps
        im = Image.new("RGBA", (width, height), (11, 15, 25, 255))
        draw = ImageDraw.Draw(im)
        
        # Window container
        draw.rounded_rectangle([16, 12, width - 16, height - 12], radius=10, fill="#131c31", outline="#1e293b", width=1)
        
        # State machine timeline:
        # 0.0s - 0.7s: IDLE ("Deploy to Production")
        # 0.7s - 1.8s: LOADING ("Deploying..." with spinner)
        # 1.8s - 2.6s: SUCCESS ("Live in Production!" with checkmark)
        # 2.6s - 3.0s: RESET back to IDLE
        
        bx, by, bw, bh = 60, 68, 280, 54
        
        if t < 0.7:
            state = "idle"
            btn_text = "Deploy to Production"
            btn_bg = "#0284c7"
            badge_text = "STATUS: IDLE"
            badge_color = "#64748b"
            desc = "Click auto-triggers async promise lifecycle."
        elif t < 1.8:
            state = "loading"
            btn_text = "Deploying..."
            btn_bg = "#0369a1"
            badge_text = "STATUS: LOADING (aria-busy=true)"
            badge_color = "#0284c7"
            desc = "Button width preserved: 0 layout shift. Clicks blocked."
        elif t < 2.6:
            state = "success"
            btn_text = "✓ Live in Production!"
            btn_bg = "#10b981"
            badge_text = "STATUS: SUCCESS (Haptics fired)"
            badge_color = "#10b981"
            desc = "Animated SVG checkmark draw + celebratory feedback."
        else:
            state = "idle"
            btn_text = "Deploy to Production"
            btn_bg = "#0284c7"
            badge_text = "STATUS: IDLE (Auto-reset)"
            badge_color = "#64748b"
            desc = "Auto-reset timer (resetAfter=2000ms) completes cycle."
            
        # Draw Button
        draw.rounded_rectangle([bx, by, bx + bw, by + bh], radius=10, fill=btn_bg)
        
        # If loading, draw spinner icon on left of text
        if state == "loading":
            angle = (f * 15) % 360
            sx, sy, sr = bx + 36, by + bh // 2, 10
            draw.arc([sx - sr, sy - sr, sx + sr, sy + sr], start=angle, end=angle + 270, fill="#ffffff", width=3)
            draw.text((bx + 64, by + 18), btn_text, fill="#ffffff", font=font_btn)
        elif state == "success":
            draw.text((bx + 44, by + 18), btn_text, fill="#ffffff", font=font_btn)
        else:
            draw.text((bx + 40, by + 18), btn_text, fill="#ffffff", font=font_btn)
            
        # Right info column
        rx = 380
        draw.rounded_rectangle([rx, by - 6, rx + 360, by + bh + 14], radius=8, fill="#0b0f19", outline="#1e293b", width=1)
        
        # State badge
        draw.rounded_rectangle([rx + 16, by + 4, rx + 16 + 240, by + 28], radius=6, fill=badge_color)
        draw.text((rx + 24, by + 8), badge_text, fill="#ffffff", font=font_status)
        
        draw.text((rx + 16, by + 38), desc, fill="#cbd5e1", font=font_desc)
        
        # Bottom subtitle
        draw.text((60, height - 44), "✦ 16 Loading Styles: morph-circle, shimmer-surface, stripes, border-trace, slide-text & more", fill="#94a3b8", font=font_desc)
        
        im.save(os.path.join(tmp_dir, f"frame_{f:03d}.png"))
        
    cmd = f'/opt/homebrew/bin/ffmpeg -y -framerate {fps} -i {tmp_dir}/frame_%03d.png -vf "split[s0][s1];[s0]palettegen=max_colors=128:reserve_transparent=0[p];[s1][p]paletteuse=dither=bayer:bayer_scale=3" {out_path}'
    subprocess.run(cmd, shell=True, check=True)
    print(f"✓ Generated {out_path} ({os.path.getsize(out_path)} bytes)")

def render_presets_demo(tmp_dir, out_path):
    os.makedirs(tmp_dir, exist_ok=True)
    width, height = 800, 360
    fps = 24
    total_frames = 96 # 4 seconds (1s per preset)
    
    font_badge = get_font(12, bold=True)
    font_title = get_font(14, bold=True)
    font_sub = get_font(12)
    
    presets_meta = [
        {"name": "product-card", "category": "CARDS & E-COMMERCE", "shape": "rounded (8px)", "color": "#0284c7"},
        {"name": "dashboard", "category": "ANALYTICS & METRICS", "shape": "glass (blur 12px)", "color": "#8b5cf6"},
        {"name": "feed-post", "category": "SOCIAL & STREAMS", "shape": "square (4px)", "color": "#10b981"},
        {"name": "chat", "category": "MESSAGING & SUPPORT", "shape": "pill (9999px)", "color": "#f59e0b"},
    ]
    
    for f in range(total_frames):
        preset_idx = (f // 24) % len(presets_meta)
        p = presets_meta[preset_idx]
        local_f = f % 24
        shimmer_x = ((local_f * 25) % (width + 300)) - 150
        
        im = Image.new("RGBA", (width, height), (11, 15, 25, 255))
        draw = ImageDraw.Draw(im)
        
        # Outer Card
        draw.rounded_rectangle([16, 12, width - 16, height - 12], radius=12, fill="#131c31", outline="#1e293b", width=1)
        
        # Header meta
        draw.rounded_rectangle([32, 24, 200, 50], radius=6, fill=p["color"])
        draw.text((44, 29), f"PRESET: {p['name']}", fill="#ffffff", font=font_badge)
        
        draw.text((220, 30), f"Category: {p['category']} • Shape: {p['shape']}", fill="#94a3b8", font=font_sub)
        
        # Presets preview area
        py_start = 70
        if p["name"] == "product-card":
            # Grid of 2 product cards
            for card_i in range(2):
                cx = 50 + card_i * 360
                draw.rounded_rectangle([cx, py_start, cx + 330, py_start + 240], radius=8, fill="#1e293b")
                # Shimmer sweep
                if cx <= shimmer_x <= cx + 400:
                    sheen = max(cx, min(cx + 330, shimmer_x))
                    draw.rectangle([sheen - 30, py_start, min(cx + 330, sheen + 30), py_start + 240], fill="#334155")
                # internal blocks
                draw.rounded_rectangle([cx + 12, py_start + 12, cx + 318, py_start + 120], radius=6, fill="#0f172a")
                draw.rounded_rectangle([cx + 12, py_start + 140, cx + 180, py_start + 158], radius=4, fill="#0f172a")
                draw.rounded_rectangle([cx + 12, py_start + 168, cx + 240, py_start + 182], radius=4, fill="#0f172a")
                draw.rounded_rectangle([cx + 12, py_start + 198, cx + 80, py_start + 224], radius=6, fill="#0f172a")
                draw.rounded_rectangle([cx + 210, py_start + 198, cx + 318, py_start + 224], radius=6, fill="#0f172a")
                
        elif p["name"] == "dashboard":
            # 3 stat cards
            for s_i in range(3):
                sx = 50 + s_i * 240
                draw.rounded_rectangle([sx, py_start, sx + 220, py_start + 90], radius=8, fill="#1e293b")
                draw.rounded_rectangle([sx + 12, py_start + 12, sx + 80, py_start + 26], radius=4, fill="#0f172a")
                draw.rounded_rectangle([sx + 12, py_start + 38, sx + 140, py_start + 64], radius=4, fill="#0f172a")
                if sx <= shimmer_x <= sx + 280:
                    sheen = max(sx, min(sx + 220, shimmer_x))
                    draw.rectangle([sheen - 25, py_start, min(sx + 220, sheen + 25), py_start + 90], fill="#334155")
            # Chart block
            draw.rounded_rectangle([50, py_start + 106, 50 + 700, py_start + 246], radius=8, fill="#1e293b")
            draw.rounded_rectangle([66, py_start + 122, 260, py_start + 140], radius=4, fill="#0f172a")
            # chart bars
            for b_i in range(8):
                bx = 90 + b_i * 80
                bh = 30 + (b_i * 23) % 65
                draw.rounded_rectangle([bx, py_start + 230 - bh, bx + 36, py_start + 230], radius=4, fill="#0f172a")
            if 50 <= shimmer_x <= 750:
                sheen = max(50, min(750, shimmer_x))
                draw.rectangle([sheen - 30, py_start + 106, min(750, sheen + 30), py_start + 246], fill="#334155")
                
        elif p["name"] == "feed-post":
            # Social feed post
            fx = 120
            draw.rounded_rectangle([fx, py_start, fx + 560, py_start + 246], radius=4, fill="#1e293b")
            # Avatar circle
            draw.ellipse([fx + 16, py_start + 16, fx + 64, py_start + 64], fill="#0f172a")
            # Name and handle lines
            draw.rounded_rectangle([fx + 76, py_start + 22, fx + 260, py_start + 38], radius=4, fill="#0f172a")
            draw.rounded_rectangle([fx + 76, py_start + 44, fx + 180, py_start + 56], radius=4, fill="#0f172a")
            # Body lines
            draw.rounded_rectangle([fx + 16, py_start + 80, fx + 540, py_start + 98], radius=4, fill="#0f172a")
            draw.rounded_rectangle([fx + 16, py_start + 106, fx + 460, py_start + 124], radius=4, fill="#0f172a")
            # Media embed
            draw.rounded_rectangle([fx + 16, py_start + 138, fx + 540, py_start + 232], radius=4, fill="#0f172a")
            if fx <= shimmer_x <= fx + 600:
                sheen = max(fx, min(fx + 560, shimmer_x))
                draw.rectangle([sheen - 30, py_start, min(fx + 560, sheen + 30), py_start + 246], fill="#334155")
                
        elif p["name"] == "chat":
            # Chat bubbles
            # Left bubble
            draw.ellipse([80, py_start + 10, 116, py_start + 46], fill="#0f172a")
            draw.rounded_rectangle([130, py_start + 10, 420, py_start + 60], radius=999, fill="#1e293b")
            # Right bubble
            draw.rounded_rectangle([380, py_start + 80, 670, py_start + 130], radius=999, fill="#0284c7")
            draw.ellipse([684, py_start + 80, 720, py_start + 116], fill="#0f172a")
            # Left bubble 2
            draw.ellipse([80, py_start + 150, 116, py_start + 186], fill="#0f172a")
            draw.rounded_rectangle([130, py_start + 150, 520, py_start + 200], radius=999, fill="#1e293b")
            # Input bar
            draw.rounded_rectangle([80, py_start + 214, 720, py_start + 244], radius=999, fill="#1e293b")
            
        im.save(os.path.join(tmp_dir, f"frame_{f:03d}.png"))
        
    cmd = f'/opt/homebrew/bin/ffmpeg -y -framerate {fps} -i {tmp_dir}/frame_%03d.png -vf "split[s0][s1];[s0]palettegen=max_colors=128:reserve_transparent=0[p];[s1][p]paletteuse=dither=bayer:bayer_scale=3" {out_path}'
    subprocess.run(cmd, shell=True, check=True)
    print(f"✓ Generated {out_path} ({os.path.getsize(out_path)} bytes)")

if __name__ == "__main__":
    render_hero_demo("/tmp/veilkit_hero_frames", "assets/demo-hero.gif")
    render_presets_demo("/tmp/veilkit_preset_frames", "assets/demo-presets.gif")
    render_spinners_demo("/tmp/veilkit_spin_frames", "assets/demo-spinners.gif")
    render_button_demo("/tmp/veilkit_btn_frames", "assets/demo-button.gif")
    # Clean up temp frames
    shutil.rmtree("/tmp/veilkit_hero_frames", ignore_errors=True)
    shutil.rmtree("/tmp/veilkit_preset_frames", ignore_errors=True)
    shutil.rmtree("/tmp/veilkit_spin_frames", ignore_errors=True)
    shutil.rmtree("/tmp/veilkit_btn_frames", ignore_errors=True)
    print("All demos successfully generated in assets/!")
