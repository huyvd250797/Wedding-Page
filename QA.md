# QA — Wedding Page v2.0.0

## Kết quả đã kiểm tra trong môi trường xây dựng

- Source HTML được đọc và phân tích, có đầy đủ `#ceremony`, `#events`, `#story`, `#couple`, `#gallery`, `#wishes`.
- JavaScript: `node --check` pass với `main.js`, `cinematic.js`.
- CSS: cú pháp hai stylesheet được phân tích không có lỗi cấp stylesheet.
- Trình duyệt Chromium thử nghiệm ở viewport **1440 × 900** và **390 × 844** thông qua bản kiểm thử inline/offline do môi trường hạn chế truy cập `file://` và localhost.
- Không phát sinh `pageerror` khi chạy các script trên DOM.
- Không có scroll overflow ngang ở hai viewport đã thử (`scrollWidth === innerWidth`).
- Có thể mở / đóng gift dialog, chuyển tài khoản chú rể / cô dâu, mở gallery và dùng phím mũi tên chuyển ảnh.
- Kiểm tra hiển thị full-page desktop/mobile, sửa lỗi story grid ở mobile.

## Giới hạn và khuyến nghị khi nghiệm thu

- Test sử dụng fixture inline để vượt hạn chế môi trường; **không tương đương kiểm thử deploy trên Vercel**.
- Không thể tự xác nhận Lighthouse/Core Web Vitals thực tế khi chưa deploy và chưa có điều kiện mạng thiết bị người dùng.
- Font Google Fonts không được tải trong fixture offline; font fallback được sử dụng để kiểm tra cấu trúc, cần kiểm tra lại font thực tế trên website đã deploy.
- Cần kiểm thử thủ công trên Safari iPhone, Android Chrome, trình duyệt desktop ở mạng 4G yếu; đặc biệt biểu mẫu clipboard (HTTP không hỗ trợ Clipboard API trên một số môi trường), QR, link Google Maps.
- Form lời chúc là **copy-only**, không gửi/lưu backend.
- Với thiết bị cấu hình thấp và người dùng bật Reduced Motion, ưu tiên hiển thị không animation.
