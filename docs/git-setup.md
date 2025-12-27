# Git Setup Instructions

## Xóa git cũ và push lại repository mới

### Bước 1: Xóa thư mục .git hiện tại
```bash
rmdir /s /q .git
```

### Bước 2: Khởi tạo git repository mới
```bash
git init
```

### Bước 3: Thêm remote origin mới
```bash
git remote add origin https://github.com/emlinh-ai/emlinh-landingpage.git
```

### Bước 4: Add tất cả file và commit lần đầu
```bash
git add .
git commit -m "Initial commit with Tailwind CSS setup"
```

### Bước 5: Push lên repository mới
```bash
git branch -M main
git push -u origin main
```

## Lưu ý:
- Đảm bảo bạn đã đăng nhập vào GitHub
- Repository https://github.com/emlinh-ai/emlinh-landingpage.git phải tồn tại
- Nếu repository private, bạn cần cấu hình authentication
