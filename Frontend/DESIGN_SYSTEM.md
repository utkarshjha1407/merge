# CodeStreak Design System

## 🎨 Visual Foundation

### Color Palette

#### Primary Colors
- **Background**: `#0B0F19` (Deep Navy) - Main background
- **Surface**: `#111827` (Dark Gray) - Cards and elevated surfaces
- **Accent**: `#00FF88` (Neon Green) - Primary actions and highlights
- **Muted Text**: `#9CA3AF` - Secondary text
- **Pure White**: `#FAFAFA` - Emphasis only

#### Accent Colors
- **Green**: `#00FF88` - Primary accent, success states
- **Blue**: `#3B82F6` - Information, analytics
- **Purple**: `#A855F7` - Social features
- **Orange**: `#FB923C` - Streaks, fire elements
- **Yellow**: `#FBBF24` - Achievements, gold medals

### Typography

#### Font Families
```css
/* Primary */
font-family: 'Inter', -apple-system, BlinkMacSystemFont, 'Segoe UI', sans-serif;

/* Headings */
font-family: 'Space Grotesk', 'Inter', sans-serif;
```

#### Font Sizes
- **Hero**: `text-6xl` to `text-8xl` (60px-96px)
- **H1**: `text-4xl` to `text-5xl` (36px-48px)
- **H2**: `text-3xl` to `text-4xl` (30px-36px)
- **H3**: `text-2xl` (24px)
- **Body**: `text-base` (16px)
- **Small**: `text-sm` (14px)
- **Tiny**: `text-xs` (12px)

#### Font Weights
- **Light**: 300
- **Regular**: 400
- **Medium**: 500
- **Semibold**: 600
- **Bold**: 700
- **Extrabold**: 800

### Spacing System
- **Base unit**: 4px
- **Scale**: 4, 8, 12, 16, 20, 24, 32, 40, 48, 64, 80, 96

## 🎭 Design Principles

### 1. Dark-First Design
- 90% dark neutral colors
- 10% glowing accents
- High contrast for readability
- Reduced eye strain

### 2. Glassmorphism
```css
.glass {
  background: rgba(17, 24, 39, 0.7);
  backdrop-filter: blur(12px);
  border: 1px solid rgba(255, 255, 255, 0.1);
}

.glass-strong {
  background: rgba(17, 24, 39, 0.9);
  backdrop-filter: blur(20px);
  border: 1px solid rgba(255, 255, 255, 0.15);
}
```

### 3. Glow Effects
```css
.glow-green {
  box-shadow: 0 0 20px rgba(0, 255, 136, 0.3),
              0 0 40px rgba(0, 255, 136, 0.1);
}
```

### 4. Hover Interactions
```css
.hover-lift {
  transition: transform 0.3s cubic-bezier(0.4, 0, 0.2, 1);
}

.hover-lift:hover {
  transform: translateY(-4px);
  box-shadow: 0 20px 40px rgba(0, 0, 0, 0.4);
}
```

## 🎬 Motion Design

### Animation Principles
1. **Subtle and Purposeful** - Every animation serves a purpose
2. **Fast but Smooth** - 200-600ms duration
3. **Easing** - `cubic-bezier(0.4, 0, 0.2, 1)`
4. **Stagger** - Delay between elements: 50-100ms

### Key Animations

#### Fade In
```css
@keyframes fade-in {
  from {
    opacity: 0;
    transform: translateY(20px);
  }
  to {
    opacity: 1;
    transform: translateY(0);
  }
}
```

#### Gradient Shift
```css
@keyframes gradient-shift {
  0%, 100% { background-position: 0% 50%; }
  50% { background-position: 100% 50%; }
}
```

#### Pulse Glow
```css
@keyframes pulse-glow {
  0%, 100% {
    opacity: 1;
    transform: scale(1);
  }
  50% {
    opacity: 0.8;
    transform: scale(1.05);
  }
}
```

#### Number Counter
- Animates from 0 to target value
- Duration: 1000ms
- Updates every 16ms (60fps)

### Framer Motion Variants

#### Page Transitions
```typescript
initial={{ opacity: 0, y: 20 }}
animate={{ opacity: 1, y: 0 }}
transition={{ duration: 0.6 }}
```

#### Staggered Children
```typescript
initial={{ opacity: 0, x: -20 }}
animate={{ opacity: 1, x: 0 }}
transition={{ delay: index * 0.1 }}
```

## 🎯 Component Patterns

### Cards
```tsx
<Card className="glass hover-lift border-white/10">
  {/* Content */}
</Card>
```

### Buttons
```tsx
// Primary
<Button className="bg-[#00FF88] hover:bg-[#00FF88]/90 text-black glow-green">

// Outline
<Button variant="outline" className="border-white/20 hover:bg-white/5">

// Ghost
<Button variant="ghost" className="hover:bg-white/5">
```

### Stat Cards
```tsx
<Card className="glass hover-lift border-white/10 glow-green">
  <CardHeader>
    <div className="p-2 rounded-lg bg-green-500/10">
      <Icon className="h-5 w-5 text-green-400" />
    </div>
  </CardHeader>
  <CardContent>
    <div className="text-4xl font-bold animate-count">
      {value}
    </div>
  </CardContent>
</Card>
```

### Badges
```tsx
<Badge className="bg-[#00FF88]/10 text-[#00FF88] border-[#00FF88]/30">
  Active
</Badge>
```

## 🌟 Special Effects

### Neon Text
```css
.neon-text {
  color: #00FF88;
  text-shadow: 0 0 10px rgba(0, 255, 136, 0.5),
               0 0 20px rgba(0, 255, 136, 0.3),
               0 0 30px rgba(0, 255, 136, 0.2);
}
```

### Border Gradient
```css
.border-gradient {
  background: linear-gradient(
    90deg,
    rgba(0, 255, 136, 0.3),
    rgba(59, 130, 246, 0.3),
    rgba(168, 85, 247, 0.3),
    rgba(0, 255, 136, 0.3)
  );
  background-size: 300% 300%;
  animation: border-flow 6s ease infinite;
  padding: 1px;
  border-radius: 0.75rem;
}
```

### Spotlight Effect
```css
.spotlight::before {
  content: '';
  position: absolute;
  background: radial-gradient(
    circle,
    rgba(0, 255, 136, 0.1) 0%,
    transparent 50%
  );
  opacity: 0;
  transition: opacity 0.3s ease;
}

.spotlight:hover::before {
  opacity: 1;
}
```

### Grid Pattern
```css
.grid-pattern {
  background-image: 
    linear-gradient(rgba(255, 255, 255, 0.02) 1px, transparent 1px),
    linear-gradient(90deg, rgba(255, 255, 255, 0.02) 1px, transparent 1px);
  background-size: 50px 50px;
}
```

## 📱 Responsive Design

### Breakpoints
- **Mobile**: < 768px
- **Tablet**: 768px - 1024px
- **Desktop**: > 1024px

### Mobile-First Approach
```tsx
// Mobile default
<div className="text-4xl">

// Tablet and up
<div className="text-4xl md:text-5xl">

// Desktop
<div className="text-4xl md:text-5xl lg:text-6xl">
```

## 🎨 Page-Specific Designs

### Landing Page
- Animated gradient background
- Floating glow orbs
- Hero with large typography
- Feature cards with hover effects
- Staggered animations on scroll

### Dashboard
- Glassmorphic cards
- Animated stat counters
- Glow effects on streak cards
- Quick action buttons
- Motivational banners

### Leaderboard
- Rank-based styling (gold, silver, bronze)
- Trophy icons with glow
- Hover lift on entries
- Staggered list animations

### Profile
- Large avatar with border
- Stat grid with icons
- Tabbed content
- Follow button with state

## 🔧 Implementation Guidelines

### CSS Classes to Use
```css
/* Backgrounds */
.gradient-bg
.grid-pattern
.glass
.glass-strong

/* Effects */
.glow-green
.glow-blue
.glow-purple
.glow-orange
.hover-lift
.spotlight
.border-gradient

/* Text */
.neon-text

/* Animations */
.animate-count
.pulse-glow
.animate-fade-in
.animate-slide-in-left
.animate-slide-in-right
```

### Framer Motion Patterns
```typescript
// Page entrance
<motion.div
  initial={{ opacity: 0, y: 20 }}
  animate={{ opacity: 1, y: 0 }}
  transition={{ duration: 0.6 }}
>

// Scroll reveal
<motion.div
  initial={{ opacity: 0, y: 30 }}
  whileInView={{ opacity: 1, y: 0 }}
  viewport={{ once: true }}
  transition={{ delay: 0.2 }}
>

// Hover scale
<motion.div
  whileHover={{ scale: 1.05 }}
  whileTap={{ scale: 0.95 }}
>
```

## 🎯 Best Practices

1. **Consistency** - Use design tokens consistently
2. **Performance** - Optimize animations for 60fps
3. **Accessibility** - Maintain contrast ratios
4. **Responsiveness** - Test on all screen sizes
5. **Loading States** - Always show skeletons
6. **Error States** - Provide clear feedback
7. **Empty States** - Make them engaging

## 🚀 Future Enhancements

- [ ] Dark/Light theme toggle
- [ ] Custom color themes
- [ ] More animation variants
- [ ] Particle effects
- [ ] 3D elements
- [ ] Sound effects
- [ ] Haptic feedback
- [ ] Advanced data visualizations

## 📚 Resources

- **Fonts**: Google Fonts (Inter, Space Grotesk)
- **Icons**: Lucide React
- **Animations**: Framer Motion
- **UI Components**: shadcn/ui
- **Styling**: Tailwind CSS

---

**Design Philosophy**: "Make it feel premium, fast, and alive. Every interaction should delight."
