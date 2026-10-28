# Wedding Page — Huy & Sao

**Version:** `2.0.0` · **Design:** Luxury Minimalist + Cinematic Motion · **Platform:** Static HTML/CSS/JavaScript

Thiệp cưới của Huy & Sao, phát triển trực tiếp từ **Wedding Page v1.0.0 Optimized Source**. Không cần Node.js, database hoặc dịch vụ trả phí để chạy website.

## Điểm mới v2.0.0

- **Luxury editorial system:** màu ivory / champagne / evergreen, kiểu chữ serif thanh lịch, khung ảnh mảnh, chapter numbering và khoảng trắng lớn.
- **Cinematic cover:** ảnh cưới full-screen, lớp gradient bảo toàn tương phản chữ, hiệu ứng Ken Burns rất chậm, tiêu đề xuất hiện nhẹ, line-scroll animation.
- **Storytelling:** ceremony cards kiểu thiệp giấy, schedule tối giản, layout câu chuyện + ảnh, ảnh chuyển cảnh full-bleed, đôi chân dung editorial, gallery masonry.
- **Motion tối ưu:** hiệu ứng `transform`/`opacity` để tránh layout thrash; ảnh chuyển cảnh chỉ chạy khi xuất hiện; hỗ trợ `prefers-reduced-motion`.
- **Ảnh hero responsive:** desktop WebP khoảng **354 KiB**, mobile WebP khoảng **117 KiB** (so với ~548 KiB mỗi file ở v1); `picture` chọn ảnh theo màn hình. Kích thước tải có thể khác tùy nén/transfer.
- **Responsive:** tối ưu cho desktop, tablet, mobile và viewport hẹp 375px; hạn chế tràn ngang.
- **Giữ các chức năng v1:** navigation, mobile menu, scroll-progress, bản đồ, lời nhắn cô dâu chú rể, phóng to album, điều khiển phím và swipe trên điện thoại, mừng cưới qua QR, sao chép STK, lời chúc được sao chép.
- **Footer phiên bản:** `© 2026 HuyVo. All rights reserved · v2.0.0`.

## Cấu trúc

```text
index.html                 Trang và nội dung
assets/css/style.css       Layout, component và tương tác nền (giữ từ v1)
assets/css/luxury.css      Luxury/Cinematic design system v2
assets/js/main.js          Nghiệp vụ có sẵn: menu, gallery, QR, copy, form
assets/js/cinematic.js     Hiệu ứng chuyển cảnh, active nav, swipe gallery
assets/img/                Ảnh WebP, QR, favicon, icon
vercel.json                Cấu hình static hosting / cache
README.md                  Hướng dẫn
CHANGELOG.md               Lịch sử thay đổi
QA.md                      Kiểm tra kỹ thuật và giới hạn
```

## Chạy thử trên máy

Website không cần build. Cách khuyến nghị để kiểm tra giống hosting thực tế:

```bash
cd Wedding-Page-v2.0.0-Luxury-Cinematic-Source
python -m http.server 8080
```

Mở http://localhost:8080. Có thể mở `index.html` trực tiếp, nhưng một vài API như Clipboard có hạn chế trên `file://`.

## Deploy lên Vercel

1. Push các file trong ZIP lên GitHub, giữ `index.html` ở thư mục root.
2. Vercel → **Add New → Project** → Import Git Repository.
3. Framework preset: **Other**; không cần build command; output directory để root `.`.
4. Deploy. **Không cần environment variables.**

Netlify và GitHub Pages cũng tương thích vì website dùng đường dẫn tài nguyên tương đối.

## Tùy chỉnh

- Nội dung, tên, ngày cưới, địa chỉ, URL bản đồ: `index.html`.
- Hình ảnh: `assets/img`.
- Màu sắc, typography, motion: `assets/css/luxury.css` (v2 ưu tiên điều chỉnh ở đây).
- Nghiệp vụ album, tài khoản, clipboard: `assets/js/main.js`.
- Hiệu ứng bổ trợ và điều hướng chủ động: `assets/js/cinematic.js`.

## Lưu ý về lời chúc

Form lời chúc **không gửi thông tin tới máy chủ**, vì source v1 không có endpoint lưu trữ. Nhấn nút sẽ **sao chép lời chúc** để khách chủ động gửi; không hiển thị xác nhận sai rằng lời chúc đã được gửi. Muốn lưu lời chúc tự động cần thêm API/database/chống spam, nằm ngoài phạm vi bản thiết kế này.

## Tốc độ và ảnh

Ảnh album sử dụng thumbnail WebP (`loading="lazy"`), chỉ mở ảnh lớn khi nhấp. Ảnh hero có `fetchpriority="high"` và preload theo breakpoint. Tải font Google Fonts cần kết nối Internet; nếu không tải được, trình duyệt dùng font dự phòng. Không có video autoplay, library animation nặng hay CDN JavaScript.

**Không xóa bản ZIP trước nâng cấp.** Bộ source v2 không chứa bộ ảnh gốc JPEG có độ phân giải đầy đủ của dự án đầu tiên.
