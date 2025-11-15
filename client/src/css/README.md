# Cyberpunk Theme System

A comprehensive dark mode cyberpunk theme for the Code 1v1 Tournament Platform, featuring neon accents, futuristic animations, and a competitive coding game interface.

## 🎨 Features

- **Dark Mode Design**: Deep blacks with neon accent colors
- **Monospace Typography**: JetBrains Mono and Fira Code fonts for coding feel
- **Neon Effects**: Glowing borders, text shadows, and animated elements
- **Glassmorphism**: Translucent cards with backdrop blur effects
- **Animated Backgrounds**: Subtle grid patterns and floating particles
- **HUD Elements**: Futuristic interface elements like status indicators
- **Responsive Design**: Works on all screen sizes
- **Modular CSS**: Easy to customize and extend

## 🚀 Quick Start

The theme is automatically applied to all components. The main theme configuration is in `theme-config.css` and includes:

- CSS Variables for all colors and effects
- Utility classes for quick styling
- Animation keyframes
- Responsive breakpoints

## 🎯 Color Palette

### Primary Neon Colors
- **Neon Blue**: `#00d4ff` - Primary accent color
- **Neon Purple**: `#b026ff` - Secondary accent
- **Neon Green**: `#00ff41` - Success/status color
- **Neon Cyan**: `#00ffff` - Highlight color
- **Neon Pink**: `#ff0080` - Warning/alert color
- **Neon Orange**: `#ff6b35` - Scoreboard/timer color

### Background Colors
- **Primary**: `#0a0a0a` - Main background
- **Secondary**: `#1a1a1a` - Card backgrounds
- **Tertiary**: `#2a2a2a` - Elevated elements
- **Glass**: `rgba(26, 26, 26, 0.8)` - Translucent elements

## 🛠️ Customization

### Changing Colors

To change the theme colors, edit the CSS variables in `theme-config.css`:

```css
:root {
  --neon-blue: #your-color-here;
  --neon-purple: #your-color-here;
  --neon-green: #your-color-here;
  /* ... other colors */
}
```

### Pre-built Theme Variations

The theme includes several pre-built variations:

```css
/* Matrix Green Theme */
[data-theme="matrix"] {
  --neon-blue: #00ff41;
  --neon-purple: #00cc33;
  --neon-green: #00ff88;
  /* ... */
}

/* Cyberpunk Red Theme */
[data-theme="red"] {
  --neon-blue: #ff0040;
  --neon-purple: #ff0080;
  --neon-green: #ff4000;
  /* ... */
}

/* Electric Blue Theme */
[data-theme="electric"] {
  --neon-blue: #0080ff;
  --neon-purple: #00ffff;
  --neon-green: #4000ff;
  /* ... */
}

/* Sunset Orange Theme */
[data-theme="sunset"] {
  --neon-blue: #ff6b35;
  --neon-purple: #ff8c42;
  --neon-green: #ff4757;
  /* ... */
}
```

To apply a theme variation, add the `data-theme` attribute to the `<html>` or `<body>` element:

```html
<html data-theme="matrix">
  <!-- Matrix green theme will be applied -->
</html>
```

## 🎭 Component Classes

### Buttons
```css
.neon-button {
  /* Primary neon button with hover effects */
}

.neon-button:hover {
  /* Glowing hover state */
}
```

### Cards
```css
.glass-card {
  /* Glassmorphism card with backdrop blur */
}

.glass-card:hover {
  /* Subtle animation on hover */
}
```

### Inputs
```css
.neon-input {
  /* Styled input with neon border */
}

.neon-input:focus {
  /* Glowing focus state */
}
```

### HUD Elements
```css
.hud-element {
  /* Futuristic HUD-style elements */
}

.scoreboard {
  /* Animated scoreboard/timer elements */
}
```

## 🎨 Utility Classes

### Color Utilities
```css
.text-neon-blue    /* Blue text */
.bg-neon-purple    /* Purple background */
.border-neon-green /* Green border */
```

### Glow Effects
```css
.glow-blue         /* Blue glow shadow */
.glow-purple       /* Purple glow shadow */
.glow-green        /* Green glow shadow */
```

### Text Shadows
```css
.text-shadow-blue  /* Blue text shadow */
.text-shadow-purple /* Purple text shadow */
.text-shadow-green /* Green text shadow */
```

### Animations
```css
.animate-pulse     /* Pulsing animation */
.animate-bounce    /* Bouncing animation */
.animate-spin      /* Spinning animation */
.animate-fade-in   /* Fade in animation */
.animate-slide-up  /* Slide up animation */
```

## 📱 Responsive Design

The theme includes responsive breakpoints:

- **Mobile**: `max-width: 480px`
- **Tablet**: `max-width: 768px`
- **Desktop**: `min-width: 769px`

All components automatically adapt to different screen sizes.

## 🎬 Animations

### Background Animations
- **Grid Movement**: Subtle grid pattern animation
- **Particle Float**: Floating neon particles
- **Background Pulse**: Breathing effect on background gradients

### Component Animations
- **Card Entrance**: Cards slide in from bottom
- **Button Hover**: Glowing and scaling effects
- **Text Glow**: Pulsing text shadows
- **Border Rotate**: Rotating gradient borders

### Loading Animations
- **Cyber Spinner**: Multi-layered spinning animation
- **Progress Fill**: Animated progress bars
- **Status Pulse**: Pulsing status indicators

## 🎯 Usage Examples

### Creating a Neon Button
```jsx
<button className="neon-button">
  ACCESS SYSTEM
</button>
```

### Creating a Glass Card
```jsx
<div className="glass-card">
  <h2 className="text-neon-blue">Card Title</h2>
  <p>Card content goes here</p>
</div>
```

### Creating a HUD Element
```jsx
<div className="hud-element">
  <span className="hud-label">STATUS</span>
  <span className="hud-value">ONLINE</span>
</div>
```

### Creating a Scoreboard
```jsx
<div className="scoreboard">
  <span>00:30</span>
</div>
```

## 🔧 Advanced Customization

### Adding New Colors
```css
:root {
  --neon-custom: #your-color;
  --glow-custom: 0 0 20px rgba(your-rgb, 0.4);
}
```

### Creating Custom Animations
```css
@keyframes customAnimation {
  0% { /* start state */ }
  100% { /* end state */ }
}

.custom-element {
  animation: customAnimation 2s ease-in-out infinite;
}
```

### Extending Component Styles
```css
.custom-card {
  composes: glass-card;
  border-color: var(--neon-custom);
  box-shadow: var(--glow-custom);
}
```

## 🎨 Design Principles

1. **Dark First**: All designs start with dark backgrounds
2. **Neon Accents**: Use bright neon colors sparingly for impact
3. **Monospace Typography**: Maintain coding aesthetic
4. **Glassmorphism**: Use translucent effects for depth
5. **Smooth Animations**: All transitions are smooth and purposeful
6. **HUD Interface**: Elements should feel like a futuristic dashboard
7. **Responsive**: Works on all devices and screen sizes

## 🚀 Performance

- CSS variables for efficient theming
- Hardware-accelerated animations
- Optimized for 60fps animations
- Minimal JavaScript dependencies
- Efficient CSS selectors

## 📝 File Structure

```
css/
├── theme-config.css    # Main theme configuration
├── Login.css          # Login page specific styles
├── NavBar.css         # Navigation bar styles
├── Loading.css        # Loading component styles
├── Result.css         # Result page styles
├── Rules.css          # Rules page styles
├── ContactUs.css      # Contact page styles
└── README.md          # This documentation
```

## 🤝 Contributing

When adding new components or styles:

1. Use the existing CSS variables from `theme-config.css`
2. Follow the established naming conventions
3. Include responsive design considerations
4. Add appropriate hover and focus states
5. Use the utility classes when possible
6. Document any new features

## 📄 License

This theme system is part of the Code 1v1 Tournament Platform project.

