# Font Loading Issue Fix

## 🐛 Vấn đề

Lỗi khi tải custom fonts:
```
Failure loading font http://localhost:5174/fonts/serif-bold.woff
RangeError: Offset is outside the bounds of the DataView
```

### Nguyên nhân
- **Font files không tồn tại**: Không có file trong `/public/fonts/`
- **Invalid font paths**: Three.js Text component không tìm thấy fonts
- **Font format errors**: File font có thể bị corrupt hoặc wrong format

## 🔧 Giải pháp

### Trước đây (lỗi):
```tsx
<Text
  font="/fonts/serif-bold.woff"  // ❌ File không tồn tại
  fontSize={2}
  color="#ffffff"
>
  I AM LINH
</Text>
```

### Bây giờ (đúng):
```tsx
<Text
  fontSize={2}
  color="#ffffff"
  // ❌ Không có font attribute = sử dụng default font
>
  I AM LINH
</Text>
```

## 📊 Kết quả

- ✅ **Font Loading**: Sử dụng default Three.js font
- ✅ **No Errors**: Không còn font loading errors
- ✅ **Performance**: Không cần tải external fonts
- ✅ **Compatibility**: Works trên mọi browser

## 🎯 Default Font Behavior

Khi không có `font` attribute:
- Three.js sử dụng built-in font (Roboto)
- Font được embedded trong bundle
- Không cần external file loading
- Stable và reliable

## 📝 Best Practices

### Custom Fonts (nếu cần)
```tsx
// 1. Add font files to /public/fonts/
// 2. Sử dụng đúng paths
<Text
  font="/fonts/inter-bold.woff"  // ✅ File tồn tại
  fontSize={2}
>
  Text
</Text>
```

### Default Fonts (recommended)
```tsx
// ✅ Simple và reliable
<Text fontSize={2} color="white">
  Text
</Text>
```

## 🚀 Performance Impact

### Custom Fonts
- ❌ Additional network requests
- ❌ Larger bundle size
- ❌ Loading delays
- ❌ Potential format issues

### Default Fonts
- ✅ No network requests
- ✅ Smaller bundle
- ✅ Instant rendering
- ✅ Cross-browser compatible

## 📁 File Structure (nếu muốn custom fonts)
```
public/
└── fonts/
    ├── inter-bold.woff
    ├── inter-regular.woff
    └── mono-regular.woff
```

## 🔍 Troubleshooting

### Font Loading Errors
1. **Check file existence**: Verify fonts in `/public/fonts/`
2. **Check file format**: Use `.woff` hoặc `.ttf`
3. **Check paths**: Ensure correct relative paths
4. **Use default**: Remove `font` attribute for reliability

### Performance Issues
1. **Font size**: Compress fonts before use
2. **Font formats**: Use WOFF2 for better compression
3. **Loading strategy**: Consider lazy loading for non-critical fonts

---
*Fixed: 27/12/2025 - Font loading issue resolved*
