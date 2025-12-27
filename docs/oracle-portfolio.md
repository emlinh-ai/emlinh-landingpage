# Em Linh 3D Portfolio - The Digital Oracle

## 🎬 Kịch bản "The Awakening of a Digital Oracle"

Portfolio 3D với 4 scene chuyển tiếp mượt mà theo kịch bản "Sự thức tỉnh của nhà tiên tri số".

### 🎭 Scene Breakdown

#### Scene 0: Dormant (Trạng thái ngủ đông)
- **Bối cảnh**: Màn hình tối với rim light xanh đậm
- **Camera**: Position [0, 0, 6], FOV 50 (xa)
- **Lighting**: 
  - Ambient: 0.1 intensity
  - SpotLight: 0 intensity (sẽ bật dần)
  - Rim light: 0.5 intensity, màu #004080
- **UI**: "INITIALIZING..." text với hiệu ứng pulse
- **Animation**: Text tan biến khi scroll (opacity 0, scale 2)

#### Scene 1: Awakening (Thức tỉnh)
- **Bối cảnh**: Gradient purple, ánh sáng trắng lạnh
- **Camera**: Position [0, 1.4, 3.5], FOV 50 (zoom gần)
- **Lighting**:
  - Ambient: 0.3 intensity
  - SpotLight: 2 intensity, màu trắng
  - Directional: 1 intensity, màu #e0e7ff
- **UI**: Headline "EM LINH AI" với gradient colors
- **Animation**: Text trồi lên từ dưới (y: 100 -> 0)

#### Scene 2: Intelligence (Kết nối trí tuệ)
- **Bối cảnh**: Cyberpunk theme với cyan lighting
- **Camera**: Position [2, 1.4, 3.5], FOV 50 (orbit 45 độ)
- **Lighting**:
  - Ambient: 0.4 intensity
  - SpotLight: 2.5 intensity, màu #00ffff
  - PointLight: 1 intensity, màu #8b5cf6
- **UI**: Tech stack badges với stagger animations
- **Animation**: Tech items bay từ trái (x: -100 -> 0)

#### Scene 3: Oracle (Huyền học)
- **Bối cảnh**: Mystical với purple/yellow gradient
- **Camera**: Position [0, 0.5, 7], FOV 60 (rộng và thấp)
- **Lighting**:
  - Ambient: 0.2 intensity
  - SpotLight: 3 intensity, màu #fbbf24
  - PointLights: 2 intensity, màu #a855f7 và #3b82f6
- **UI**: "DESTINY DECODED" với mystical gradient
- **Animation**: Scale từ 0.5 lên 1 với fade in

## 🛠️ Technical Implementation

### GSAP ScrollTrigger Timeline
```javascript
// Scene transitions mapped to scroll progress
// 0-25%: Scene 0 (Dormant)
// 25-50%: Scene 1 (Awakening) 
// 50-75%: Scene 2 (Intelligence)
// 75-100%: Scene 3 (Oracle)
```

### React Three Fiber Setup
- **4 Canvas instances** - Mỗi scene một Canvas riêng
- **Camera transitions** - Different positions và FOV per scene
- **Dynamic lighting** - Color và intensity changes
- **VRM Model** - CustomVRMModelSimple với error handling

### Component Structure
```
src/
├── App-Oracle.tsx              # Main app với 4 scenes
├── components/
│   ├── CustomVRMModel-Simple.tsx  # VRM model loading
│   └── ScrollIndicator-Oracle.tsx # Scroll guidance
└── docs/
    └── oracle-portfolio.md     # This documentation
```

## 🎨 Visual Features

### Color Schemes per Scene
- **Scene 0**: Xanh đậm (#004080, #0080ff)
- **Scene 1**: Gradient cyan-purple-pink
- **Scene 2**: Cyberpunk cyan (#00ffff, #8b5cf6)
- **Scene 3**: Mystical purple-yellow (#a855f7, #fbbf24)

### Typography
- **Scene 0**: Monospace, cyan, tracking-widest
- **Scene 1**: Bold, gradient text
- **Scene 2**: Cyan tech font
- **Scene 3**: Purple-yellow gradient

### Animations Timeline
1. **Initial state**: "INITIALIZING..." pulse
2. **Scroll 20%**: Text fade out & scale
3. **Scene 1**: Headline slide up
4. **Scene 2**: Tech items stagger in
5. **Scene 3**: Destiny text scale & fade

## 🚀 Usage

### Development
```bash
npm run dev  # Starts on http://localhost:5174
npm run build  # Production build
npm run lint  # Code quality check
```

### Navigation
- **Scroll**: Natural scrolling giữa scenes
- **ScrollIndicator**: Click để jump đến scene tiếp theo
- **Language Switcher**: Top-right corner

## 📱 Responsive Design
- **Desktop**: Full 4K experience
- **Tablet**: Optimized canvas sizes
- **Mobile**: Simplified animations

## 🎯 Future Enhancements

### VRM Animations (TODO)
- Head rotation mapped to scroll progress
- Eye blinking và expressions
- Hand gestures cho từng scene
- LookAt camera tracking

### VFX Effects (TODO)
- Particle systems cho Scene 2
- Zodiac circle cho Scene 3
- Data blocks floating
- Energy beams và mystical effects

### Performance (TODO)
- LOD system cho mobile
- Texture optimization
- Animation compression
- Memory management

---

**Current Status**: ✅ Working 4-scene foundation with GSAP animations
**Next Steps**: VRM animations, VFX effects, performance optimization
