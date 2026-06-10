# ASync — Landing

Landing page cho **ASync** — nền tảng vận hành & tự động hoá doanh nghiệp đa lĩnh vực.
Dựng lại từ thiết kế gốc (`ASync Landing.html`) trên một tech stack hiện đại.

## Tech stack

| Lớp | Công nghệ |
| --- | --- |
| Framework | **Next.js 16** (App Router) + **React 19** |
| Ngôn ngữ | **TypeScript** |
| Styling | **Tailwind CSS v4** (CSS-first `@theme`) + CSS thiết kế gốc đã port |
| UI primitives | **Radix UI** (Dialog, Tabs, Accordion) theo phong cách **shadcn/ui** |
| Database | **PostgreSQL** (chạy trên VPS) |
| ORM | **Drizzle ORM** + `drizzle-kit` |
| Fonts | Be Vietnam Pro + JetBrains Mono qua `next/font` |

## Cấu trúc

```
src/
  app/
    layout.tsx          # fonts + metadata
    page.tsx            # lắp ráp các section
    globals.css         # design tokens + CSS đã port từ bản gốc
    actions.ts          # Server Action: submitDemoRequest
  components/
    sections/           # Header, Hero, Platform, EduDiff, Industries, Dashboard, ...
    demo/               # Dialog "Đặt lịch demo" + form + context
    ui/                 # button, dialog, input, textarea, label (shadcn-style)
    count-up.tsx        # animation đếm số khi cuộn tới
    reveal-effects.tsx  # reveal-on-scroll
  db/
    schema.ts           # bảng demo_requests (+ enums)
    index.ts            # pg Pool + drizzle client
  hooks/                # use-reveal
  lib/                  # content.ts (nội dung), utils.ts (cn)
drizzle.config.ts
```

## Bắt đầu

### 1. Cài dependencies

```bash
npm install
```

### 2. Cấu hình Postgres trên VPS

Tạo database và user trên VPS:

```sql
CREATE DATABASE async;
CREATE USER async WITH PASSWORD 'mat_khau_manh';
GRANT ALL PRIVILEGES ON DATABASE async TO async;
```

Để app (chạy ở nơi khác) kết nối được tới Postgres trên VPS:

- `postgresql.conf`: `listen_addresses = '*'` (hoặc IP nội bộ/VPN).
- `pg_hba.conf`: thêm dòng cho host của app, ví dụ
  `host async async <APP_IP>/32 scram-sha-256`.
- Mở cổng `5432` trên firewall **chỉ cho IP tin cậy** (đừng phơi ra Internet công khai).
  Khuyến nghị đặt sau VPN/SSH tunnel và bật TLS (`?sslmode=require`).

### 3. Biến môi trường

```bash
cp .env.example .env
```

Sửa `DATABASE_URL` trỏ tới Postgres trên VPS:

```
DATABASE_URL="postgres://async:mat_khau_manh@vps-host:5432/async?sslmode=require"
```

### 4. Tạo & chạy migration

```bash
npm run db:generate   # sinh SQL migration từ schema
npm run db:migrate    # áp dụng lên Postgres của VPS
# hoặc nhanh gọn khi prototyp: npm run db:push
```

### 5. Chạy dev

```bash
npm run dev
# http://localhost:3000
```

## Tính năng động

- **Mega menu** "Hệ thống" với 6 bộ sản phẩm (hover/click, đóng khi click ra ngoài / Esc).
- **Reveal-on-scroll** cho mọi phần tử `.reveal`.
- **Đếm số** (CountUp) cho KPI, gamification stats, impact band; thanh KPI chạy width.
- **Tabs lĩnh vực** (Radix Tabs) và **tabs ASync EDU+**.
- **FAQ accordion** (Radix Accordion).
- **Form "Đặt lịch demo"** trong Dialog → Server Action → lưu vào bảng `demo_requests` (Drizzle/Postgres).

## Scripts

| Lệnh | Mô tả |
| --- | --- |
| `npm run dev` | Dev server |
| `npm run build` | Build production |
| `npm run start` | Chạy bản build |
| `npm run typecheck` | `tsc --noEmit` |
| `npm run db:generate` | Sinh migration |
| `npm run db:migrate` | Áp migration |
| `npm run db:push` | Đẩy schema trực tiếp |
| `npm run db:studio` | Drizzle Studio |
