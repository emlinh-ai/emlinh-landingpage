# The Awakening of a Digital Oracle - Storyboard Implementation

## 🎬 Storyboard Overview

Portfolio 3D cinematic với 4 scenes theo kịch bản "Sự thức tỉnh của nhà tiên tri số", sử dụng ScrollControls và VRM animations.

## 📜 Scene Breakdown

### Scene 0: Dormant (Trạng thái tĩnh)
- **VRM State**: Cúi đầu 45°, mắt nhắm (blink: 1)
- **Camera**: z: 6, view toàn thân
- **Lighting**: Rim-light xanh mờ
- **UI**: "INITIALIZING" font lớn, màu #111 (gần như vô hình)

### Scene 1: Awakening (Thức Tỉnh) - 0% → 30%
- **Camera Animation**: Zoom z: 6 → 3.5, y: 0 → 1.4
- **VRM Animation**: 
  - Neck rotation x: 0.5 → 0 (ngẩng đầu)
  - Blink: 1 → 0 (mở mắt)
  - Happy: 0 → 0.4 (mỉm cười)
- **UI**: "I AM LINH" + sub-text fade-in
- **VFX**: Spotlight trắng đánh vào mặt

### Scene 2: Intelligence (Trí Tuệ) - 30% → 65%
- **Camera Animation**: Orbit 45°, roll 5°
- **VRM Animation**:
  - LookAt camera (giữ hướng nhìn)
  - Tay phải đưa lên (handRaise: 0 → 1)
  - Finger wiggling (fingerWiggle: 0 → 1)
- **UI**: "COGNITIVE SPEED" + tech stack list
- **VFX**: Data blocks trôi nổi, cyan emission

### Scene 3: Oracle (Huyền Học) - 65% → 100%
- **Camera Animation**: Pull back z: 7, low-angle y: 0.5
- **VRM Animation**:
  - Hai tay đưa ra trước (mystical pose)
  - Biểu cảm thần bí (mysterious: 0 → 1)
- **UI**: "DESTINY DECODED" + description
- **VFX**: Zodiac circle xoay, mystical lighting

## 🛠️ Technical Implementation

### ScrollControls Setup
```tsx
<ScrollControls pages={3} damping={0.2}>
  {/* 4 scenes với positions khác nhau */}
</ScrollControls>
```

### VRM Proxy System
```typescript
class VRMProxy {
  public neckRotationX = 0.5;
  public blinkValue = 1;
  public happyValue = 0;
  public handRaise = 0;
  public fingerWiggle = 0;
  public mysteriousValue = 0;
  
  updateValues() {
    // Update VRM 3.0 bones và expressions
  }
}
```

### GSAP Timeline
```typescript
const tl = gsap.timeline({
  scrollTrigger: {
    trigger: "body",
    start: "top top",
    end: "bottom bottom",
    scrub: 1,
  }
});

// Scene transitions với timeline
tl.to("camera", { z: 3.5, y: 1.4 }, 0);
tl.to(vrmProxy, { neckRotationX: 0, blinkValue: 0 }, 0);
```

## 🎨 Visual Effects

### Lighting Progression
1. **Scene 0**: Rim light xanh (#004080)
2. **Scene 1**: Spotlight trắng + ambient
3. **Scene 2**: Cyan emission + data lighting
4. **Scene 3**: Mystical gold/violet

### VFX Elements
- **Scene 2**: Floating hexagons/data blocks
- **Scene 3**: Rotating zodiac circle
- **Transitions**: Smooth color grading

## 📊 Animation Mapping

| Scroll Progress | Camera | VRM State | UI Elements | VFX |
|----------------|--------|-----------|-------------|-----|
| 0% | z: 6 | Dormant | INITIALIZING | Rim light |
| 30% | z: 3.5, y: 1.4 | Awake | I AM LINH | Spotlight |
| 65% | Orbit 45° | Hand gesture | Tech stack | Data blocks |
| 100% | z: 7, low | Mystical | DESTINY | Zodiac |

## 🎯 Performance Optimizations

### Rendering
- **Antialiasing**: Tự động tắt nếu FPS < 45
- **InstancedMesh**: Cho data blocks (scene 2)
- **LOD System**: Cho zodiac circle

### Animation
- **Scroll Damping**: 0.2 cho smooth scrolling
- **GSAP Scrub**: 1 cho cinematic feel
- **Proxy Updates**: Batch VRM value updates

## 🎮 User Experience

### Navigation
- **Natural Scroll**: Desktop wheel/touchpad
- **Touch Support**: Mobile swipe gestures
- **Progress Indicator**: Visual scroll feedback

### Interactions
- **Language Switcher**: Top-right corner
- **Scene Progression**: Automatic via scroll
- **VRM Response**: Real-time bone/expression updates

## 📁 File Structure
```
src/
├── App-StoryEnhanced.tsx    # Main storyboard implementation
├── components/
│   ├── Scene0.tsx          # Dormant state
│   ├── Scene1.tsx          # Awakening
│   ├── Scene2.tsx          # Intelligence
│   └── Scene3.tsx          # Oracle
└── docs/
    └── storyboard-implementation.md
```

## 🚀 Future Enhancements

### VRM Features
- **Full bone control**: Head, hands, fingers
- **Expression system**: Happy, surprised, mysterious
- **LookAt tracking**: Smooth camera following

### Visual Effects
- **Particle systems**: Scene transitions
- **Post-processing**: Bloom, depth of field
- **Audio integration**: TTS với lip sync

### Performance
- **Web Workers**: For heavy calculations
- **Texture optimization**: Compressed VRM textures
- **Animation compression**: Smaller file sizes

---

**Current Status**: ✅ Storyboard foundation with ScrollControls
**Next Steps**: VRM bone control integration, VFX polish
