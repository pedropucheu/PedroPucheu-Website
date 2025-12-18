# Pedro Pucheu Portfolio

Modern, cinematic portfolio website for filmmaker and photographer Pedro Pucheu.

## Structure

```
pucheu portfolio/
├── index.html              # Homepage with hero, showreel, featured work
├── motion.html             # Motion showcase with all video projects
├── stills.html             # Photography gallery (portraits, food, clothing)
├── contact.html            # Contact page with form
├── fighting-productions.html # Fighting Productions Ltd page
├── css/
│   └── style.css           # Complete styling system
├── js/
│   └── main.js             # Interactions, animations, galleries
├── assets/
│   ├── images/             # All images go here
│   │   └── stills/         # Photography images by category
│   └── videos/             # Video files (showreel, etc.)
└── projects/               # Individual project pages (optional)
```

## Setup Instructions

### 1. Add Your Images

Replace placeholder images in `assets/images/`:

**Project Thumbnails:**
- `yan-texeira-thumb.jpg`
- `celebration-thumb.jpg`
- `unknown-reality-thumb.jpg`
- `homegrown-thumb.jpg`
- `community-thumb.jpg`

**Project Gallery Images:**
- `yan-texeira-1.jpg`, `yan-texeira-2.jpg`, etc.
- `celebration-1.jpg`, `celebration-2.jpg`, etc.
- (Similar for other projects)

**Photography (in `assets/images/stills/`):**
- `portrait-1.jpg` through `portrait-12.jpg`
- `food-1.jpg` through `food-7.jpg`
- `clothing-1.jpg` through `clothing-8.jpg`

**Other:**
- `pedro-portrait.jpg` - About section photo
- `hero-poster.jpg` - Hero video poster/fallback
- `pedro-founder.jpg` - Fighting Productions founder photo
- `andrew-founder.jpg` - Co-founder photo
- `fighting-productions-bg.jpg` - Background image

### 2. Add Your Videos

**Option A: Video File (Hero Background)**
Add `showreel.mp4` to `assets/videos/`

**Option B: Vimeo/YouTube Embeds**
Replace `YOUR_VIDEO_ID` or `YOUR_SHOWREEL_ID` in the HTML files with actual video IDs:
```html
<!-- Vimeo -->
<iframe src="https://player.vimeo.com/video/123456789" ...></iframe>

<!-- YouTube -->
<iframe src="https://www.youtube.com/embed/ABC123xyz" ...></iframe>
```

### 3. Configure Contact Form

The contact form uses Formspree. To set it up:

1. Go to [formspree.io](https://formspree.io)
2. Create a free account
3. Create a new form
4. Replace `YOUR_FORM_ID` in `contact.html`:
```html
<form action="https://formspree.io/f/YOUR_FORM_ID" method="POST">
```

### 4. Update Social Links

In all HTML files, update:
- Instagram: `https://www.instagram.com/plp_visuals`
- LinkedIn: `https://www.linkedin.com/in/pedropucheu`
- Vimeo: `https://vimeo.com/pedropucheu`

## Design Features

- **Dark Cinematic Theme** - Professional black/dark gray with red accent
- **Responsive Design** - Works on all devices
- **Smooth Animations** - Fade-in effects on scroll
- **Lightbox Gallery** - Click images to view full size
- **Filter System** - Filter projects/photos by category
- **Video Modal** - Dedicated video playback
- **Page Loader** - Smooth loading transition
- **Mobile Navigation** - Hamburger menu on mobile

## Customization

### Colors (in `css/style.css`)
```css
:root {
  --color-accent: #e50914;        /* Red accent */
  --color-bg-primary: #0a0a0a;    /* Main background */
  --color-bg-secondary: #111111;  /* Section backgrounds */
}
```

### Fonts
Using Google Fonts:
- **Bebas Neue** - Display/titles
- **Montserrat** - Headings
- **Inter** - Body text

## Deployment

Upload all files to any web hosting service:
- Netlify (free)
- Vercel (free)
- GitHub Pages (free)
- Any standard web host

## Image Recommendations

**Optimal Sizes:**
- Thumbnails: 800x450px (16:9)
- Gallery images: 800x800px (1:1)
- Hero poster: 1920x1080px
- Portrait photos: 600x600px min

**Format:** JPG for photos, WebP for better compression

## Browser Support

- Chrome, Firefox, Safari, Edge (latest versions)
- Mobile browsers (iOS Safari, Chrome Android)

---

Created for Pedro Pucheu | Filmmaker & Photographer | London, UK
