# VRM Path Resolution Fix

## 🐛 Vấn đề

VRM model loading failed với lỗi:
```
Could not load models//models/emlinh-v2.vrm: Unexpected token '<', "<!doctype "... is not valid JSON
```

### Nguyên nhân
- **Double path**: `models//models/emlinh-v2.vrm`
- **Path duplication**: VRMModel component tự động thêm `models/` prefix
- **URL construction**: Input `/models/emlinh-v2.vrm` + component prefix = double path

## 🔧 Giải pháp

### Trước đây (lỗi):
```tsx
// App-Split.tsx
const vrmUrl = '/models/emlinh-v2.vrm';

// VRMModel.tsx (dòng 42)
const { scene, userData } = useGLTF(
  `models/${vrmUrl}`, // → models//models/emlinh-v2.vrm
  ...
);
```

### Bây giờ (đúng):
```tsx
// App-Split.tsx
const vrmUrl = 'emlinh-v2.vrm';

// VRMModel.tsx (dòng 42)
const { scene, userData } = useGLTF(
  `models/${vrmUrl}`, // → models/emlinh-v2.vrm ✅
  ...
);
```

## 📊 Kết quả

- ✅ **VRM Loading**: Thành công
- ✅ **Path Resolution**: Đúng `models/emlinh-v2.vrm`
- ✅ **Error Handling**: Không còn 404 errors
- ✅ **3D Rendering**: VRM model hiển thị
- ✅ **Animations**: Sẵn sàng để play

## 🎯 Technical Notes

### VRMModel Path Handling
VRMModel component tự động xử lý path:
```typescript
// Component tự thêm prefix
const finalPath = `models/${vrmUrl}`;
```

### Best Practices
1. **Relative paths**: Truyền vào tên file không có prefix
2. **Public folder**: Đảm bảo file trong `/public/models/`
3. **No leading slash**: Tránh `/` ở đầu path

### File Structure
```
public/
└── models/
    └── emlinh-v2.vrm (19.8MB)
```

### Usage Examples
```tsx
// ✅ Đúng
const vrmUrl = 'emlinh-v2.vrm';
<VRMModel vrmUrl={vrmUrl} />

// ❌ Sai - gây double path
const vrmUrl = '/models/emlinh-v2.vrm';
<VRMModel vrmUrl={vrmUrl} />
```

---
*Fixed: 27/12/2025 - VRM path resolution issue*
