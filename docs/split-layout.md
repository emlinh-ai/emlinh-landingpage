# Em Linh AI - Split Layout Portfolio

## 🎨 Bố cục Trái-Phải với 3D Character

Portfolio với bố cục hiện đại: nội dung bên trái, nhân vật 3D bên phải với animations đa dạng.

### 📐 Layout Structure

```
┌─────────────────────────────────────────────────────────────┐
│                    Navigation Bar                            │
├─────────────────────┬───────────────────────────────────────┤
│                     │                                       │
│   Content Area      │         3D Character Area             │
│   (50% width)       │         (50% width)                   │
│                     │                                       │
│ • Header & Title    │ • VRM Model                           │
│ • Description       │ • Animations                          │
│ • Features Grid     │ • Interactive Controls                │
│ • Animation Panel   │ • Environment & Lighting              │
│                     │                                       │
│                     │                                       │
└─────────────────────┴───────────────────────────────────────┘
```

### 🎭 VRM Animations

#### Registered Animations
```typescript
// Idle animations
registerAnimation({
  id: 'idle',
  name: 'Standing Idle',
  path: '/animations/fbx/Standing Idle.fbx',
  category: 'idle',
});

// Talking animations
registerAnimation({
  id: 'talking',
  name: 'Normal Talking', 
  path: '/animations/fbx/Normal Talking.fbx',
  category: 'talking',
});

// Gesture animations
registerAnimation({
  id: 'gesture',
  name: 'Hand Gesture Talk Fast',
  path: '/animations/fbx/Hand Gesture Talk Fast.fbx', 
  category: 'gesture',
});
```

#### Available Animations
- **idle**: Standing Idle - Đứng yên
- **talking**: Normal Talking - Nói chuyện bình thường
- **gesture**: Hand Gesture Talk Fast - Nói với tay nhanh
- **explaining**: Talk Explanation - Giải thích
- **confident**: Confidence Talking - Nói tự tin

### 🎛️ Animation Controls

#### Auto Play Mode
- Tự động chuyển animation mỗi 3 giây
- Cycle qua tất cả animations đã đăng ký
- Có thể pause/resume bất cứ lúc nào

#### Manual Control
- Click button để play animation cụ thể
- Visual feedback cho animation đang active
- Smooth transitions giữa animations

### 🛠️ Technical Implementation

#### VRMViewer Component
```tsx
<VRMViewer
  ref={vrmRef}
  vrmUrl="/models/emlinh-v2.vrm"
  isAISpeaking={currentAnimation !== 'idle'}
  animationId={currentAnimation}
  enableBlink={true}
  enableLookAt={true}
  lookAtTarget={[0, 1.2, 10]}
/>
```

#### Key Features
- **VRM Loading**: Sử dụng @emlinh/vrm-character-controller
- **Animation System**: FBX support với crossfade
- **Auto Blinking**: Tự động nhấp mắt tự nhiên
- **Look At Camera**: Nhân vật nhìn vào camera
- **Environment**: City preset cho realistic lighting

### 🎨 Visual Design

#### Left Side - Content
- **Gradient Background**: Slate-900 → Purple-900 → Slate-900
- **Typography**: Gradient text cho headlines
- **Cards**: Glass morphism với backdrop-blur
- **Features Grid**: 2x2 layout với icons

#### Right Side - 3D Character
- **Canvas Size**: 600px height, full width
- **Camera**: Position [0, 1.2, 3], FOV 40
- **Lighting Setup**:
  - Ambient: 0.4 intensity
  - Directional: White light từ trên phải
  - Spot: Main light từ trên
  - Point: Purple accent từ trái

### 🎮 User Interaction

#### Animation Controls
1. **Auto Play**: Toggle auto-cycle animations
2. **Manual Selection**: Click specific animation button
3. **Visual Feedback**: Highlight animation đang active

#### Language Switcher
- Top-right corner
- Supports Vietnamese/English
- Smooth transitions

### 📱 Responsive Design

#### Desktop (≥1024px)
- Full split layout 50/50
- All features available
- Optimal 3D rendering

#### Tablet (768px-1023px)
- Stacked layout
- Reduced canvas size
- Touch-friendly controls

#### Mobile (<768px)
- Single column layout
- Simplified controls
- Optimized performance

### 🚀 Performance Optimizations

#### Animation Loading
- Preload critical animations
- Lazy load non-essential
- Cache system cho frequently used

#### 3D Rendering
- LOD system cho mobile
- Optimized lighting setup
- Efficient material usage

### 🔧 Development

#### File Structure
```
src/
├── App-Split.tsx              # Main split layout app
├── main.tsx                   # Entry point
└── docs/
    └── split-layout.md        # This documentation
```

#### Dependencies
- @emlinh/vrm-character-controller
- @react-three/fiber
- @react-three/drei
- Three.js
- GSAP (future enhancements)

### 🎯 Usage Examples

#### Play Animation Programmatically
```tsx
const playAnimation = (animationId: string) => {
  setCurrentAnimation(animationId);
  if (vrmRef.current?.playAnimationById) {
    vrmRef.current.playAnimationById(animationId, true);
  }
};
```

#### Add New Animation
```tsx
registerAnimation({
  id: 'custom',
  name: 'Custom Animation',
  type: 'fbx',
  path: '/animations/fbx/custom.fbx',
  category: 'gesture',
  preload: true,
});
```

---

**Current Status**: ✅ Working split layout with VRM animations
**Next Steps**: Add more interactions, voice integration, performance optimization
