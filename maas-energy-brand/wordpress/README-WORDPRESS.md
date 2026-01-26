# MAAS Energy Works - WordPress Integration Guide

This folder contains the CSS and JavaScript files needed to integrate MAAS Energy Works brand styling into a WordPress site.

## Files Included

- `maas-brand.css` - Complete brand styling (colors, typography, components)
- `maas-brand.js` - JavaScript utilities (animations, counters, scroll effects)

## Installation Methods

### Method 1: Theme Integration (Recommended)

1. Copy both files to your theme's directory (or child theme)
2. Add the following to your theme's `functions.php`:

```php
function maas_enqueue_brand_assets() {
    // Enqueue CSS
    wp_enqueue_style(
        'maas-brand-css',
        get_template_directory_uri() . '/maas-brand.css',
        array(),
        '1.0.0'
    );

    // Enqueue JavaScript
    wp_enqueue_script(
        'maas-brand-js',
        get_template_directory_uri() . '/maas-brand.js',
        array(),
        '1.0.0',
        true // Load in footer
    );
}
add_action('wp_enqueue_scripts', 'maas_enqueue_brand_assets');
```

### Method 2: Plugin (Simple Custom CSS and JS)

1. Install and activate "Simple Custom CSS and JS" plugin
2. Go to **Custom CSS & JS** in the admin menu
3. Add new CSS code and paste contents of `maas-brand.css`
4. Add new JS code and paste contents of `maas-brand.js`

### Method 3: WordPress Customizer

1. Go to **Appearance > Customize > Additional CSS**
2. Paste the contents of `maas-brand.css`
3. For JavaScript, use a plugin like "Header and Footer Scripts"

## Using Brand Components

### Typography

```html
<!-- Display heading (largest) -->
<h1 class="maas-heading-display">Powering Tomorrow</h1>

<!-- Section headings -->
<h2 class="maas-heading-1">Our Services</h2>
<h3 class="maas-heading-2">Digester Development</h3>

<!-- Eyebrow/label text -->
<p class="maas-eyebrow">Case Study</p>

<!-- Emphasized text -->
<span class="maas-text-emphasis">renewable energy</span>
```

### Buttons

```html
<!-- Primary button (green) -->
<a href="#" class="maas-btn maas-btn-primary">Learn More</a>

<!-- Secondary button (outline on dark) -->
<a href="#" class="maas-btn maas-btn-secondary">Contact Us</a>

<!-- Outline button -->
<a href="#" class="maas-btn maas-btn-outline">View Projects</a>

<!-- Button sizes -->
<a href="#" class="maas-btn maas-btn-primary maas-btn-sm">Small</a>
<a href="#" class="maas-btn maas-btn-primary maas-btn-lg">Large</a>
```

### Cards

```html
<!-- Standard dark card -->
<div class="maas-card">
    <h3 class="maas-heading-3">Card Title</h3>
    <p>Card content goes here.</p>
</div>

<!-- Card with accent bar on hover -->
<div class="maas-card maas-card-accent">
    <h3 class="maas-heading-3">Service Name</h3>
    <p>Description of service.</p>
</div>

<!-- Light card (for light backgrounds) -->
<div class="maas-card maas-card-light">
    <h3 class="maas-heading-3">Card Title</h3>
    <p>Card content.</p>
</div>
```

### Statistics

```html
<div class="maas-stat-card">
    <div class="maas-stat-number" data-counter="70" data-suffix="+">0</div>
    <div class="maas-stat-label">Digesters Developed</div>
</div>
```

Counter options:
- `data-counter="100"` - Target number
- `data-duration="2000"` - Animation duration in ms (default: 2000)
- `data-prefix="$"` - Prefix (e.g., "$")
- `data-suffix="M+"` - Suffix (e.g., "M+", "%")

### Badges

```html
<span class="maas-badge maas-badge-primary">Renewable Energy</span>
<span class="maas-badge maas-badge-secondary">Operations</span>
<span class="maas-badge maas-badge-outline">New</span>
```

### Quotes

```html
<blockquote class="maas-quote">
    "MAAS Energy Works transformed our operation into a sustainable business."
    <cite class="maas-quote-attribution">
        <strong>John Peterson</strong>, Dairy Farmer
    </cite>
</blockquote>
```

### Sections

```html
<!-- Dark section -->
<section class="maas-section maas-section-dark">
    <div class="maas-container">
        <!-- Content -->
    </div>
</section>

<!-- With grid pattern background -->
<section class="maas-section maas-section-dark maas-grid-pattern">
    <div class="maas-container">
        <!-- Content -->
    </div>
</section>
```

### Animations

```html
<!-- Fade-up animation on scroll -->
<div class="maas-fade-up">
    This content will fade up when scrolled into view.
</div>

<!-- Staggered animations -->
<div class="maas-fade-up maas-delay-1">First item</div>
<div class="maas-fade-up maas-delay-2">Second item</div>
<div class="maas-fade-up maas-delay-3">Third item</div>
```

## CSS Variables

You can override brand colors in your theme:

```css
:root {
    --maas-green: #2D8B4E;
    --maas-green-bright: #3CAF5C;
    --biogas-blue: #1E7F9C;
    --near-black: #0D1210;
    --dark-gray: #1A1F1C;
    --charcoal: #242B27;
}
```

## Page Builder Compatibility

### Elementor

The JavaScript automatically reinitializes animations when Elementor loads new content. Use the CSS classes directly in Elementor's Advanced tab > CSS Classes field.

### WPBakery/Visual Composer

Compatible out of the box. Add CSS classes through the element's Design Options.

### Gutenberg

Works with the default block editor. Add classes through the Block > Advanced > Additional CSS class(es) field.

## Typography Recommendations

For best results, include these Google Fonts in your theme:

```html
<link rel="preconnect" href="https://fonts.googleapis.com">
<link rel="preconnect" href="https://fonts.gstatic.com" crossorigin>
<link href="https://fonts.googleapis.com/css2?family=Inter:wght@300;400;500;600;700&family=JetBrains+Mono:wght@400;500;600;700&display=swap" rel="stylesheet">
```

Or add to `functions.php`:

```php
function maas_enqueue_fonts() {
    wp_enqueue_style(
        'maas-google-fonts',
        'https://fonts.googleapis.com/css2?family=Inter:wght@300;400;500;600;700&family=JetBrains+Mono:wght@400;500;600;700&display=swap',
        array(),
        null
    );
}
add_action('wp_enqueue_scripts', 'maas_enqueue_fonts');
```

## Support

For questions about brand implementation, contact the MAAS Energy Works marketing team.

---

*MAAS Energy Works Brand House v1.0*
*Last updated: 2025*