# Em Linh AI - Cinematic Portfolio

## 🎬 Layout Design

Portfolio với layout 2 cột hiện đại: nhân vật 3D fixed bên phải, content scrollable bên trái.

### 📐 Layout Structure

```
┌─────────────────────────────────────────────────────────────┐
│                    Navigation Bar                            │
├─────────────────────┬───────────────────────────────────────┤
│                     │                                       │
│   Content Area      │         3D Character Area             │
│   (50% width)       │         (50% width)                   │
│   - Scrollable      │         - Fixed position               │
│   - 4 Sections      │         - VRM Model                    │
│   - Full height     │         - Animations                   │
│                     │         - Interactive                  │
│                     │                                       │
│                     │                                       │
└─────────────────────┴───────────────────────────────────────┘
```

## 📑 Content Sections

### Section 1: Introduction
- **Headline**: "EM LINH" với gradient text
- **Subtitle**: "Digital Oracle & AI Assistant"
- **Description**: Giới thiệu về Em Linh AI
- **Features**: Trí tuệ Gemini 2.5, 20+ animations

### Section 2: Skills
- **Livestream YouTube**: Tự động dẫn và tương tác
- **Trả lời Facebook**: CSKH 24/7
- **Chat trực tiếp**: Phản hồi < 200ms

### Section 3: Fortune Telling
- **Xem Tử Vi AI**: 900+ lá số
- **Luận giải chi tiết**: 12 cung hoàng đạo
- **Lời khuyên**: Công danh, tài lộc, tình duyên

### Section 4: Contact
- **Development Team**: Thông tin liên hệ
- **Email**: contact@emlinh.ai
- **Website**: www.emlinh.ai

## 🎭 3D Character Features

### VRM Model
- **Model**: emlinh-v2.vrm (19.8MB)
- **Animations**: Standing Idle, Normal Talking
- **Position**: Fixed bên phải màn hình
- **Controls**: Orbit giới hạn (không zoom, không pan)

### Animation System
```typescript
// Change animation based on scroll section
useEffect(() => {
  const animations = ['idle', 'talking', 'idle', 'idle'];
  vrmRef.current?.playAnimationById(animations[currentSection], true);
}, [currentSection]);
```

### Lighting Setup
- **Ambient**: 0.4 intensity
- **Directional**: White light từ trên phải
- **Spot**: Main light từ trên
- **Point**: Purple accent từ trái

## 🎨 Visual Design

### Color Scheme
- **Background**: Slate-900 → Purple-900 → Slate-900 gradient
- **Text**: White với gradient accents
- **Cards**: Glass morphism với backdrop-blur
- **Icons**: Cyan, purple, yellow, green

### Typography
- **Headlines**: 5xl-6xl font-bold với gradient
- **Body**: Large text-lg cho readability
- **Cards**: Semibold headers, normal body

### Interactive Elements
- **Hover effects**: Cards brightness trên hover
- **Transitions**: Smooth 0.3s transitions
- **Buttons**: Gradient backgrounds với hover states

## 🛠️ Technical Implementation

### Scroll Detection
```typescript
const handleScroll = () => {
  const scrollY = window.scrollY;
  const windowHeight = window.innerHeight;
  const section = Math.floor(scrollY / windowHeight);
  setCurrentSection(Math.min(section, 3));
};
```

### Fixed Layout
```tsx
{/* 3D Character - Fixed Right */}
<div className="fixed right-0 top-0 w-1/2 h-screen">
  <Canvas>...</Canvas>
</div>

{/* Content - Scrollable Left */}
<div className="relative w-1/2 min-h-screen">
  <section>...</section>
</div>
```

### VRM Integration
- **Component**: VRMModel từ @emlinh/vrm-character-controller
- **Animation Registry**: Preload idle và talking animations
- **Ref Control**: Programmatic animation changes

## 📱 Responsive Design

### Desktop (≥1024px)
- ✅ Full 2-column layout
- ✅ VRM model hiển thị đầy đủ
- ✅ All interactions available

### Tablet (768px-1023px)
- ⚠️ Layout cần adjustment
- ⚠️ VRM size cần optimize

### Mobile (<768px)
- ❌ Cần redesign cho mobile
- ❌ VRM performance issues

## 🚀 Performance Optimizations

### 3D Rendering
- **Fixed Camera**: Giảm computational load
- **Limited Controls**: Orbit giới hạn
- **Preload Animations**: Reduce runtime loading

### Content Loading
- **Section-based**: Lazy load content khi scroll
- **Optimized Images**: WebP format cho icons
- **CSS Animations**: GPU accelerated

## 🎯 User Experience

### Navigation
- **Smooth scrolling**: Natural scroll behavior
- **Section detection**: Auto-highlight current section
- **Scroll indicator**: Visual prompt để scroll

### Interactions
- **VRM response**: Animation changes theo section
- **Card hovers**: Visual feedback
- **Button states**: Clear affordances

## 📁 File Structure
```
src/
├── App-Cinematic.tsx         # Main cinematic portfolio
├── components/
│   └── VRMModel.tsx          # VRM character component
└── docs/
    └── cinematic-portfolio.md # This documentation
```

## 🔧 Future Enhancements

### Content
- [ ] Add video demonstrations
- [ ] Interactive skill demos
- [ ] Testimonials section

### 3D Features
- [ ] More VRM animations
- [ ] Facial expressions
- [ ] Hand gestures
- [ ] Background environments

### Performance
- [ ] Mobile responsive design
- [ ] VRM LOD system
- [ ] Web worker for calculations

---

**Current Status**: ✅ Working cinematic portfolio with fixed layout
**Next Steps**: Mobile optimization, enhanced animations
