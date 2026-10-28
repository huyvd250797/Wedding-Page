# Huy & Sao · Wedding Page v1.0.0

Thiệp cưới dạng **static website** — không yêu cầu Node.js, npm, cơ sở dữ liệu hay dịch vụ trả phí. Phiên bản được thiết kế lại từ source Wedding-Page-main.

## Thay đổi

- Giao diện Elegant Wedding Editorial, responsive cho điện thoại / máy tính, typography và màu sắc đồng nhất.
- Loại bỏ các thư mục `node_modules` được đóng gói thừa, Bootstrap và FontAwesome không sử dụng trong bản mới.
- Chuyển ảnh JPEG dung lượng lớn thành WebP tối ưu, giữ ảnh gốc riêng ngoài gói triển khai; album có ảnh preview độc lập và ảnh lớn chỉ tải khi mở.
- Ảnh đầu trang tải ưu tiên với `fetchpriority=high`, ảnh bên dưới dùng `loading=lazy`.
- Animation dựa trên `IntersectionObserver`, tránh lặp hàng loạt `scroll` listeners và đo vị trí phần tử; tôn trọng Reduced Motion.
- Menu di động, điều hướng theo section, nút về đầu trang, thanh tiến trình cuộn, album phóng to và điều khiển bằng phím, hộp thoại mừng cưới, sao chép số tài khoản.
- Nội dung cô dâu / chú rể có phần mở rộng, giúp giao diện dễ đọc hơn.
- SEO cơ bản, mô tả trang, Open Graph, liên kết bản đồ an toàn.

## Chạy thử

Mở `index.html` trực tiếp bằng trình duyệt. Nếu kiểm tra các tính năng yêu cầu ngữ cảnh an toàn, có thể chạy một static server cục bộ:

```bash
python -m http.server 8080
```

Sau đó truy cập `http://localhost:8080`.

## Triển khai Vercel

1. Push toàn bộ thư mục này lên repository GitHub (đặt `index.html` tại root).
2. Trong Vercel, chọn **Add New → Project** và import repository.
3. **Framework Preset: Other**, build command để trống, output directory `.` (root).
4. Deploy. Không cần Environment Variables.

## Triển khai Netlify / GitHub Pages

- Netlify: kéo thả toàn bộ thư mục website vào Netlify Drop hoặc import từ GitHub; publish directory `.`.
- GitHub Pages: Settings → Pages → Deploy from a branch → main/root.
- Các đường dẫn đều tương đối nên hỗ trợ host dưới subpath.

## Tùy chỉnh

- Nội dung tên, ngày cưới và địa chỉ ở `index.html`.
- Màu sắc, bố cục, hiệu ứng ở `assets/css/style.css`.
- Hiệu ứng cuộn, QR bank, album và chức năng sao chép ở `assets/js/main.js`.
- Ảnh WebP và ảnh QR nằm trong `assets/img`.

## Lưu ý chức năng lời chúc

Source gốc có form “Tham dự” nhưng không thấy logic gửi dữ liệu tới backend. Bản này **không tự nhận hoặc lưu lời chúc vào máy chủ**, tránh hiển thị xác nhận gửi thành công sai sự thật. Nút “Sao chép lời chúc” sẽ copy văn bản, sau đó khách có thể gửi trực tiếp. Nếu muốn lưu RSVP/lời chúc trên web, cần bổ sung endpoint/database riêng (ví dụ Supabase) và chống spam.

**Hình ảnh:** Các JPG gốc đã được nén và chuyển sang WebP trong gói bàn giao; gói không chứa ảnh gốc độ phân giải đầy đủ. Hãy lưu giữ ZIP ban đầu làm bản sao lưu ảnh chất lượng gốc.
