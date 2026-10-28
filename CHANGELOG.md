# Changelog

## v1.0.0 — Elegant Wedding & Performance Refresh

**Giao diện:** làm mới hero, navbar, lịch lễ cưới, timeline, chuyện tình yêu, chân dung cô dâu/chú rể, gallery và chân trang theo phong cách editorial. Responsive cho mobile và desktop, không còn tràn ngang trong kích thước thử nghiệm 390px.

**Tốc độ:** tách ảnh thumbnail/ảnh xem lớn của album, chuyển JPEG sang WebP, ưu tiên ảnh LCP, lazy-load phần dưới, dọn dependency dư thừa, bỏ scroll listener nặng và thay bằng IntersectionObserver.

**Tương tác:** menu di động, đọc thêm nội dung, xem ảnh toàn màn hình và phím trái/phải, copy số tài khoản mừng cưới, toast, cuộn đến section, quay đầu trang, hỗ trợ người dùng giảm chuyển động.

**Chất lượng:** được kiểm tra cú pháp JS (`node --check`), liên kết tệp local, các thao tác dialog, chuyển tab, phím Esc, menu mobile, và scroll overflow ở 1440x900/390x844. Không có lỗi JavaScript trong bộ kiểm tra Chromium được chạy offline.

**Lưu ý:** thử nghiệm UI được thực hiện trong trình duyệt Chromium offline bằng nội dung nội tuyến do môi trường kiểm tra chặn truy cập HTTP và file URL. Chưa chạy Lighthouse/giả lập mạng thực tế. Form lời chúc có nút sao chép và không gửi dữ liệu lên máy chủ vì source ban đầu không có endpoint xử lý RSVP.
