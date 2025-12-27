# Em Linh 3D Portfolio - "The Awakening of a Digital Oracle"

## Tổng quan

Portfolio 3D cho Em Linh với kịch bản "Sự thức tỉnh của nhà tiên tri số", sử dụng:
- React Three Fiber cho 3D rendering
- GSAP cho animations và scroll controls
- @emlinh/vrm-character-controller cho VRM animations
- Custom VFX effects (particles, zodiac circle)

## Cấu trúc kịch bản

### Scene 0: Dormant (Trạng thái ngủ đông)
- **Bối cảnh**: Màn hình tối, rim light xanh đậm
- **Em Linh**: Đứng cúi đầu, nhắm mắt, tư thế ngủ đông
- **UI**: Text "INITIALIZING..." mờ ảo
- **Camera**: Position [0, 0, 6], FOV 50

### Scene 1: The Awakening (Thức tỉnh)
- **Bối cảnh**: Gradient purple, particles effects
- **Em Linh**: Ngẩng đầu, mở mắt, mỉm cười nhẹ
- **UI**: Headline "EM LINH AI" với gradient effects
- **Camera**: Position [0, 1.4, 3.5], zoom gần hơn

### Scene 2: The Intelligence (Kết nối trí tuệ)
- **Bối cảnh**: Cyan theme, tech particles
- **Em Linh**: Tay phải đưa lên, gõ phím ảo, mắt dõi camera
- **UI**: Tech stack badges (Gemini 2.5, Qwen TTS, etc.)
- **Camera**: Position [2, 1.4, 3.5], orbit 45 độ

### Scene 3: The Astrology Oracle (Huyền học)
- **Bối cảnh**: Purple/yellow mystical, zodiac circle
- **Em Linh**: Tay đưa ra trước như ôm năng lượng
- **UI**: "DESTINY DECODED" text, mystical effects
- **Camera**: Position [0, 0.5, 7], góc thấp uy nghi

## Components chính

### 1. App.tsx
- Main container với 4 scenes
- GSAP ScrollTrigger để điều khiển transitions
- Responsive design với TailwindCSS

### 2. SceneController.tsx
- Điều khiển VRM animations theo scene
- Camera animations với GSAP
- Expression management (happy, neutral, etc.)

### 3. ParticleField.tsx
- Dynamic particle systems
- Customizable colors và movements
- Additive blending cho glow effects

### 4. ZodiacCircle.tsx
- 3D zodiac wheel với 12 cung hoàng đạo
- Rotating rings và mystical effects
- Energy beams và central orb

### 5. ScrollIndicator.tsx
- Hướng dẫn user scroll
- Animations với GSAP
- Auto-hide on scroll

## VRM Model

- **File**: `/models/emlinh-vroid-1.1.vrm`
- **Controller**: CustomVRMModel.tsx với @emlinh/vrm-character-controller
- **Animations**: standingIdle, talking, gesture (fallback system)
- **Expressions**: neutral, happy (morph targets)

## GSAP Timeline

```javascript
// Scene transitions (0-100% scroll)
0-25%: Scene 0 → Scene 1 (INITIALIZING fade out)
25-50%: Scene 1 → Scene 2 (Tech stack reveal)
50-75%: Scene 2 → Scene 3 (Oracle transformation)
75-100%: Scene 3 completion
```

## Lighting Setup

### Scene 0 (Dormant)
- Ambient: 0.1 intensity
- SpotLight: Cyan, intensity 0 → 2 (animation)
- Rim light: Blue, intensity 0.5

### Scene 1 (Awakening)
- Ambient: 0.3 intensity
- SpotLight: White, intensity 2
- Directional: Light blue, intensity 1

### Scene 2 (Intelligence)
- Ambient: 0.4 intensity
- SpotLight: Cyan, intensity 2.5
- PointLight: Purple, intensity 1

### Scene 3 (Mystic)
- Ambient: 0.2 intensity
- SpotLight: Gold, intensity 3
- PointLights: Purple & Blue, intensity 2

## Performance Optimizations

- React.memo cho components
- useFrame với conditional updates
- BufferGeometry cho particles
- Material reuse với useMemo
- Lazy loading cho VRM model

## Development Commands

```bash
# Install dependencies
npm install

# Start development server
npm run dev

# Build for production
npm run build

# Type checking
npx tsc --noEmit

# Linting
npm run lint
```

## Customization

### Modify Scene Transitions
Edit `useGSAP` timeline trong App.tsx để调整 animation timing và effects.

### Add New Particles
Modify ParticleField.tsx props:
```jsx
<ParticleField 
  count={2000} 
  color="#06b6d4" 
  size={0.02}
  area={10}
  speed={0.5}
/>
```

### Update VRM Animations
Trong SceneController.tsx, thêm animations vào array:
```javascript
const animations = ['newAnimation', 'talking', 'standingIdle'];
```

## Browser Compatibility

- Chrome/Edge: Full support
- Firefox: Good support
- Safari: Basic support (WebGL 2.0 required)
- Mobile: Limited performance

## Future Enhancements

1. **Audio Integration**: Background music theo scene
2. **Mouse Interactions**: Direct VRM control
3. **Performance Mode**: LOD cho mobile
4. **Custom Shaders**: Advanced VFX materials
5. **Physics Simulation**: Cloth/hair dynamics
