# WARP.md

This file provides guidance to WARP (warp.dev) when working with code in this repository.

## Project Overview

This is an AI-powered 3D portfolio website that combines immersive 3D graphics with artificial intelligence integration. Built with vanilla JavaScript and Three.js, it showcases modern web development techniques including WebGL rendering, particle systems, GSAP animations, and AI chat functionality.

## Development Commands

### Primary Development Workflow
```bash
# Install dependencies
npm install

# Start development server (opens at http://localhost:3000)
npm run dev

# Build for production
npm run build

# Preview production build
npm run preview
```

### Development Server
- **Port**: 3000 (configured in vite.config.js)
- **Auto-open**: Browser opens automatically on server start
- **Hot reload**: Vite provides instant hot module replacement

### Testing
Note: No test suite is currently configured. The `npm test` command will show an error message indicating tests need to be set up.

## Architecture & Code Structure

### High-Level Architecture
```
ai-3d-portfolio/
├── src/
│   ├── js/
│   │   ├── main.js           # 3D scene setup, Three.js core logic
│   │   ├── animations.js     # GSAP animations, UI interactions
│   │   └── ai-chat.js        # AI chatbot functionality
│   └── css/
│       └── style.css         # Modern CSS with custom properties
├── index.html               # Entry point with semantic HTML5
├── vite.config.js          # Vite configuration
└── package.json            # Dependencies and scripts
```

### Core Application Classes

#### `Portfolio3D` (main.js)
- **Purpose**: Manages the entire 3D scene using Three.js
- **Key Features**:
  - WebGL renderer with anti-aliasing and shadows
  - Particle system with custom GLSL shaders (5000 particles)
  - 12 floating geometric shapes (tetrahedron, octahedron, icosahedron, dodecahedron)
  - Dynamic lighting system (ambient, directional, and 3 colored point lights)
  - Mouse-based camera movement and object interaction via raycasting
- **Animation Loop**: Continuous rendering with particle rotation and shape animations

#### `PortfolioAnimations` (animations.js)
- **Purpose**: Handles all UI animations and interactions using GSAP
- **Key Features**:
  - ScrollTrigger-based section animations
  - Project card hover effects and staggered reveals
  - Skill bar progress animations triggered by Intersection Observer
  - Counter animations for statistics
  - Mobile hamburger menu functionality
- **Performance**: Uses hardware-accelerated transforms and optimized scroll triggers

#### `AIChat` (ai-chat.js)
- **Purpose**: Implements the AI chatbot interface
- **Key Features**:
  - Context-aware responses based on portfolio content
  - Conversation history management
  - Typing indicators with animated dots
  - Mock AI responses (ready for real AI API integration)
  - Export conversation functionality

### 3D Graphics Implementation

#### Particle System
- **Technology**: Custom GLSL vertex/fragment shaders
- **Count**: 5000 particles with individual colors and sizes
- **Effects**: Additive blending for glow effects, distance-based opacity
- **Performance**: Optimized for 60fps across devices

#### Geometric Shapes
- **Materials**: MeshPhysicalMaterial with metalness and roughness
- **Lighting**: Realistic PBR lighting with shadows
- **Interaction**: Click-to-rotate animations via raycaster
- **Positioning**: Procedurally distributed in 3D space

#### Shader Details
- **Vertex Shader**: Handles particle positioning and size based on camera distance
- **Fragment Shader**: Creates circular particle appearance with distance-based falloff
- **Uniforms**: Time-based animation and pixel ratio for crisp rendering

### CSS Architecture

#### Design System
- **CSS Custom Properties**: Comprehensive color and spacing system
- **Color Scheme**: Neon-inspired with primary green (#00ff88), blue (#0088ff), and pink (#ff0088)
- **Typography**: Poppins font family with fluid scaling
- **Responsive**: Mobile-first approach with breakpoints at 480px, 768px, 1024px

#### Animation Strategy
- **GSAP**: Primary animation library for complex sequences
- **CSS Animations**: Simple keyframe animations for loading states
- **Intersection Observer**: Performance-optimized scroll-triggered animations

## Key Technologies & Dependencies

### Core Dependencies
- **three**: 3D graphics library for WebGL rendering
- **gsap**: Professional animation library with ScrollTrigger
- **axios**: HTTP client for potential AI API integration
- **vite**: Fast build tool and development server

### Development Architecture
- **ES6 Modules**: Modern JavaScript with import/export
- **WebGL**: Hardware-accelerated 3D graphics
- **Custom Shaders**: GLSL for advanced particle effects
- **Responsive Design**: CSS Grid and Flexbox layouts

## Development Guidelines

### 3D Scene Modifications
- **Performance**: Monitor particle count on mobile devices (currently optimized for 5000)
- **Lighting**: Three point lights provide color variety - modify colors in setupLights()
- **Materials**: Use MeshPhysicalMaterial for realistic PBR rendering
- **Optimization**: LOD (Level of Detail) system ready for implementation

### Animation Best Practices
- **GSAP**: Use transforms for hardware acceleration
- **ScrollTrigger**: Implement proper cleanup for performance
- **Mobile**: Reduced animation complexity on touch devices
- **Intersection Observer**: Prefer over scroll events for performance

### AI Chat Integration
- **Mock Responses**: Currently uses predefined contextual responses
- **API Ready**: Structure in place for OpenAI, Anthropic, or similar services
- **Context**: Responses are portfolio-aware and categorized by topic
- **Extensibility**: Easy to add new response categories and conversation flows

### CSS Custom Properties Usage
```css
/* Primary colors available */
--primary-color: #00ff88
--secondary-color: #0088ff
--accent-color: #ff0088
--gradient-primary: linear-gradient(135deg, var(--primary-color), var(--secondary-color))

/* Use for consistent theming */
background: var(--gradient-primary);
color: var(--text-primary);
```

### Mobile Optimization
- **Particle Count**: Consider reducing on mobile for performance
- **Touch Events**: Optimized for mobile interactions
- **Responsive Breakpoints**: 480px, 768px, 1024px
- **Menu**: Collapsible hamburger navigation

## Build Configuration

### Vite Configuration
- **Entry Point**: index.html in root directory
- **Output**: dist/ directory with assets/ subdirectory
- **Dependencies**: Pre-bundling for three.js and gsap
- **Development**: Auto-open browser on port 3000

### Production Build
- **Optimization**: Automatic code splitting and minification
- **Assets**: Optimized bundling of CSS, JS, and static assets
- **Browser Support**: Modern browsers with WebGL support required

## Browser Compatibility Requirements
- **WebGL Support**: Essential for 3D graphics functionality
- **ES6+ Support**: Modern JavaScript features used throughout
- **Minimum Versions**: Chrome 80+, Firefox 75+, Safari 13+, Edge 80+
