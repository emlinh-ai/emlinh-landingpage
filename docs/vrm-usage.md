# Hướng dẫn sử dụng thư viện VRM Character Controller

## Tổng quan

Thư viện `@emlinh/vrm-character-controller` được tích hợp vào dự án như một submodule để cung cấp khả năng tải và hiển thị các file VRM (Virtual Reality Model) trong ứng dụng React.

## Cài đặt

Thư viện đã được thêm vào dự án qua submodule và package.json:

```bash
# Clone submodule (đã thực hiện)
git submodule add https://github.com/emlinh-ai/vrm-character-controller.git libs/vrm-character-controller

# Cài đặt dependencies (đã thực hiện)
npm install
```

## Các thành phần chính

### 1. VRMViewer Component

Component chính để hiển thị mô hình 3D VRM với đầy đủ tính năng:

```tsx
import { VRMViewerComponent } from '../components/VRMViewer';

<VRMViewerComponent
  width={800}
  height={600}
  enableControls={true}
  enableEnvironment={true}
  vrmUrl="path/to/model.vrm"
/>
```

**Props:**
- `vrmUrl`: URL hoặc đường dẫn đến file VRM
- `width`: Chiều rộng của canvas (mặc định: 800px)
- `height`: Chiều cao của canvas (mặc định: 600px)
- `enableControls`: Bật/tắt điều khiển camera (mặc định: true)
- `enableEnvironment`: Bật/tắt môi trường 3D (mặc định: true)

### 2. VRMModel Component

Component cấp thấp hơn để tích hợp vào Canvas tùy chỉnh:

```tsx
import { VRMModel } from '@emlinh/vrm-character-controller';

<Canvas>
  <VRMModel
    url="path/to/model.vrm"
    position={[0, 0, 0]}
    scale={[1, 1, 1]}
    castShadow
    receiveShadow
  />
</Canvas>
```

### 3. Các Hook hữu ích

Thư viện cung cấp nhiều hook để điều khiển mô hình VRM:

```tsx
import {
  useVrmBlink,           // Điều khiển nháy mắt
  useVrmLookAt,           // Điều khiển nhìn theo chuột
  useVrmExpression,       // Điều khiển biểu cảm
  useVrmLipsync,          // Đồng bộ hóa môi
  useVrmAnimationLoader,  // Tải animation
  useVrmAnimationPlayer,  // Phát animation
} from '@emlinh/vrm-character-controller';
```

## Sử dụng trong ứng dụng

### 1. Tải file từ local

```tsx
const [vrmUrl, setVrmUrl] = useState<string>('');

const handleFileUpload = (event: React.ChangeEvent<HTMLInputElement>) => {
  const file = event.target.files?.[0];
  if (file && file.name.endsWith('.vrm')) {
    const url = URL.createObjectURL(file);
    setVrmUrl(url);
  }
};

<input
  type="file"
  accept=".vrm"
  onChange={handleFileUpload}
/>
```

### 2. Tải file từ URL

```tsx
const [vrmUrl, setVrmUrl] = useState<string>('https://example.com/model.vrm');

<input
  type="text"
  value={vrmUrl}
  onChange={(e) => setVrmUrl(e.target.value)}
  placeholder="Enter VRM URL"
/>
```

### 3. Tích hợp vào Canvas có sẵn

```tsx
import { Canvas } from '@react-three/fiber';
import { OrbitControls, Environment } from '@react-three/drei';
import { VRMModel } from '@emlinh/vrm-character-controller';

const MyVRMScene = ({ vrmUrl }) => (
  <Canvas camera={{ position: [0, 1.5, 3] }}>
    <ambientLight intensity={0.5} />
    <directionalLight position={[5, 5, 5]} intensity={1} />
    
    <VRMModel
      url={vrmUrl}
      position={[0, 0, 0]}
      scale={[1, 1, 1]}
    />
    
    <Environment preset="sunset" />
    <OrbitControls />
  </Canvas>
);
```

## Tính năng hỗ trợ

- ✅ Tải file VRM 1.0
- ✅ Animation và biểu cảm
- ✅ Lip sync (đồng bộ hóa môi)
- ✅ Blink (nháy mắt tự động)
- ✅ Look at (theo dõi chuột/camera)
- ✅ Shadow rendering
- ✅ Environment lighting
- ✅ Orbit controls
- ✅ Mobile responsive

## Ví dụ hoàn chỉnh

Xem file `src/pages/VRMDemo.tsx` để xem ví dụ hoàn chỉnh về cách sử dụng thư viện.

## Lưu ý quan trọng

1. **File format**: Chỉ hỗ trợ file VRM 1.0
2. **Performance**: VRM files có thể lớn, cần tối ưu cho web
3. **Memory**: Nhớ giải phóng URL object khi không sử dụng:
   ```tsx
   useEffect(() => {
     return () => {
       if (vrmUrl.startsWith('blob:')) {
         URL.revokeObjectURL(vrmUrl);
       }
     };
   }, [vrmUrl]);
   ```
4. **Dependencies**: Đảm bảo các package Three.js liên quan đã được cài đặt:
   - `@pixiv/three-vrm`
   - `@pixiv/three-vrm-animation`
   - `@react-three/fiber`
   - `@react-three/drei`
   - `three`

## Xử lý lỗi

```tsx
const [error, setError] = useState<string>('');

const handleVRMError = (error: Error) => {
  setError(`Failed to load VRM: ${error.message}`);
};

// Trong VRMModel component
<VRMModel
  url={vrmUrl}
  onError={handleVRMError}
/>
```

## Tùy chỉnh nâng cao

Thư viện cho phép tùy chỉnh sâu qua các hook và utils:

```tsx
import {
  remapMixamoAnimationToVrm,
  cleanAnimationTracks,
  Lipsync
} from '@emlinh/vrm-character-controller';

// Remap animation từ Mixamo sang VRM
const remappedAnimation = remapMixamoAnimationToVrm(mixamoClip, vrmRig);

// Dọn dẹp animation tracks
cleanAnimationTracks(animationClip);
```
