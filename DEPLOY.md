# Deploy ASyncs Landing lên VPS (Docker)

Stack production chạy bằng `docker-compose.prod.yml`: **app Next.js** + **Postgres** +
một bước **migrate** tự động (áp dụng migration Drizzle rồi thoát). App chỉ khởi động
sau khi migrate xong.

## Yêu cầu trên VPS
- Docker Engine + Docker Compose plugin (`docker compose version`).
- Đã mở port cho Nginx/Caddy (80/443). App chỉ nghe `127.0.0.1:3000`, không expose ra ngoài.

## 1. Đưa code lên VPS
```bash
git clone https://github.com/davidnguyenvn7/ASyncs-Landing.git
cd ASyncs-Landing
```
(Hoặc `git pull` nếu đã clone trước đó.)

## 2. Tạo file env production
```bash
cp .env.prod.example .env.prod
# Mở .env.prod và đặt POSTGRES_PASSWORD là một chuỗi ngẫu nhiên đủ mạnh
```
`.env.prod` đã được `.gitignore` — không bị commit lên GitHub.

## 3. Build & chạy
```bash
docker compose -f docker-compose.prod.yml --env-file .env.prod up -d --build
```
Lần đầu sẽ build image (vài phút). Sau đó:
- `postgres` chạy nền, dữ liệu lưu ở volume `async_pgdata_prod` (không mất khi restart).
- `migrate` tạo bảng `demo_requests` rồi thoát.
- `web` phục vụ trang ở `http://127.0.0.1:3000`.

Kiểm tra:
```bash
docker compose -f docker-compose.prod.yml ps
curl -I http://127.0.0.1:3000        # kỳ vọng HTTP 200
docker compose -f docker-compose.prod.yml logs -f web
```

## 4. Đặt reverse proxy + HTTPS (khuyến nghị)
App không tự lo TLS/domain. Ví dụ với **Caddy** (tự động Let's Encrypt) — `/etc/caddy/Caddyfile`:
```
your-domain.com {
    reverse_proxy 127.0.0.1:3000
}
```
Hoặc Nginx `proxy_pass http://127.0.0.1:3000;` rồi cấp SSL bằng certbot.

## 5. Cập nhật khi có thay đổi
```bash
git pull
docker compose -f docker-compose.prod.yml --env-file .env.prod up -d --build
```
Migration mới (nếu có trong `drizzle/`) sẽ tự áp dụng ở bước `migrate`.

## Vận hành
- **Xem log:** `docker compose -f docker-compose.prod.yml logs -f web`
- **Backup DB:**
  `docker compose -f docker-compose.prod.yml exec postgres pg_dump -U async async > backup.sql`
- **Xem lead đã nhận:**
  `docker compose -f docker-compose.prod.yml exec postgres psql -U async -d async -c 'select id,name,email,created_at from demo_requests order by id desc limit 20;'`
- **Dừng:** `docker compose -f docker-compose.prod.yml down` (thêm `-v` để xoá luôn dữ liệu DB — cẩn thận).

> `docker-compose.yml` (gốc) chỉ dùng cho **dev** (Postgres cổng 5434). Production dùng file `.prod`.
