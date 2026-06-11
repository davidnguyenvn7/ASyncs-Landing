/**
 * Static content for the ASync landing page, lifted verbatim from the original
 * design so the React components stay declarative and easy to edit.
 */

export type MegaSuite = {
  icon: string;
  name: string; // bold portion, e.g. "CORE+"
  desc: string;
  apps: string[];
  href: string;
};

export const megaSuites: MegaSuite[] = [
  { icon: "🗂️", name: "CORE+", desc: "Vận hành & quy trình", apps: ["Công việc", "Quy trình", "Phê duyệt", "Dự án"], href: "#platform" },
  { icon: "💳", name: "FINANCE+", desc: "Tài chính & dòng tiền", apps: ["Thu chi", "Công nợ", "Hoá đơn", "QR thanh toán"], href: "#platform" },
  { icon: "👥", name: "PEOPLE+", desc: "Nhân sự & HRM", apps: ["Hồ sơ NV", "Chấm công", "Tính lương", "KPI"], href: "#platform" },
  { icon: "🎯", name: "CRM+", desc: "Bán hàng & khách hàng", apps: ["Lead", "Pipeline", "Chăm sóc", "Chuyển đổi"], href: "#platform" },
  { icon: "🎓", name: "EDU+", desc: "Vertical cho giáo dục", apps: ["Học viên", "Học phí", "Quiz Engine", "Gamification"], href: "#diff" },
  { icon: "📊", name: "INSIGHT+", desc: "Dữ liệu & báo cáo", apps: ["Dashboard", "Doanh thu", "Cảnh báo", "Báo cáo"], href: "#dashboard" },
];

export const logos = [
  "RetailOne",
  "Chuỗi F&B Mặn",
  "Dược Minh Châu",
  "Nội thất Vivu",
  "LogiX",
  "EduMaster",
  "CleanPro",
  "Decor House",
];

export type MockRow = { ava: string; title: string; sub: string; tag: string; tagKind: "green" | "gray" };

export type Suite = {
  id: string;
  icon: string;
  label: string;
  title: string;
  desc?: string;
  bullets: string[];
  apps: { icon: string; name: string }[];
  flip?: boolean;
  barLabel: string;
  visual:
    | { kind: "rows"; rows: MockRow[] }
    | { kind: "finance"; kpis: { value: string; label: string }[]; chart: number[] };
};

export const suites: Suite[] = [
  {
    id: "core",
    icon: "🗂️",
    label: "ASyncs CORE+",
    title: "Vận hành & quy trình,\ngọn trong một hệ thống",
    bullets: [
      "Giao việc & theo dõi tiến độ tập trung",
      "Quy trình & phê duyệt tự động theo kịch bản",
      "Quản lý dự án & luồng công việc đa phòng ban",
    ],
    apps: [
      { icon: "✅", name: "Công việc" },
      { icon: "🔀", name: "Quy trình" },
      { icon: "📝", name: "Phê duyệt" },
      { icon: "📁", name: "Dự án" },
    ],
    barLabel: "asyncs core · công việc",
    visual: {
      kind: "rows",
      rows: [
        { ava: "🟢", title: "Duyệt đơn mua vật tư Q2", sub: "Phòng Mua hàng · hạn 12/06", tag: "Đã duyệt", tagKind: "green" },
        { ava: "🟡", title: "Triển khai chi nhánh mới", sub: "Dự án · 8/12 đầu việc hoàn thành", tag: "Đang chạy", tagKind: "gray" },
        { ava: "🔵", title: "Quy trình onboarding NV", sub: "Nhân sự · chờ phê duyệt bước 2", tag: "Chờ duyệt", tagKind: "gray" },
      ],
    },
  },
  {
    id: "finance",
    icon: "💳",
    label: "ASyncs FINANCE+",
    title: "Kiểm soát tài chính,\nkhông thất thoát dòng tiền",
    desc: "Thu chi, công nợ, hoá đơn và doanh thu hiển thị tức thì. Tự động nhắc công nợ và thu qua QR — giảm tới 70% thao tác thủ công.",
    bullets: [
      "Quản lý thu chi & công nợ theo thời gian thực",
      "Tự động nhắc thanh toán qua đa kênh",
      "Xuất hoá đơn & thu tiền qua QR",
    ],
    apps: [
      { icon: "💰", name: "Thu chi" },
      { icon: "📒", name: "Công nợ" },
      { icon: "🧾", name: "Hoá đơn" },
      { icon: "🔳", name: "QR thanh toán" },
    ],
    flip: true,
    barLabel: "asyncs finance · dòng tiền",
    visual: {
      kind: "finance",
      kpis: [
        { value: "+22%", label: "Doanh thu" },
        { value: "78%", label: "Đã thu" },
        { value: "12,4tr", label: "Tồn đọng" },
      ],
      chart: [40, 55, 48, 70, 62, 85, 78, 96],
    },
  },
  {
    id: "people",
    icon: "👥",
    label: "ASyncs PEOPLE+",
    title: "Quản trị nhân sự minh bạch theo dữ liệu",
    desc: "Chấm công, ngày công, KPI và tính lương\ndựa trên dữ liệu thực tế —\ncông bằng cho nhân viên, rõ ràng cho nhà quản lý.",
    bullets: [
      "Hồ sơ nhân sự & chấm công tập trung",
      "KPI & đánh giá hiệu suất theo phòng ban",
      "Tính lương tự động theo công & chỉ tiêu",
    ],
    apps: [
      { icon: "🗂️", name: "Hồ sơ NV" },
      { icon: "⏱️", name: "Chấm công" },
      { icon: "💵", name: "Tính lương" },
      { icon: "📈", name: "KPI" },
    ],
    barLabel: "asyncs people · nhân sự",
    visual: {
      kind: "rows",
      rows: [
        { ava: "HT", title: "Hương Trà · 24/24 công", sub: "KPI 94% · Phòng Kinh doanh", tag: "Top KPI", tagKind: "green" },
        { ava: "DV", title: "Đức Vũ · 23/24 công", sub: "KPI 88% · Phòng Vận hành", tag: "Đạt", tagKind: "green" },
        { ava: "LP", title: "Lan Phương · 20/24 công", sub: "KPI 71% · Phòng CSKH", tag: "Theo dõi", tagKind: "gray" },
      ],
    },
  },
  {
    id: "crm",
    icon: "🎯",
    label: "ASyncs CRM+",
    title: "Bán hàng có quy trình, không rơi rớt cơ hội",
    desc: "Mọi lead từ quảng cáo, giới thiệu hay hotline đổ về một pipeline. Theo dõi chăm sóc, nhắc lịch và đo tỷ lệ chuyển đổi theo từng nguồn.",
    bullets: [
      "Quản lý lead tập trung đa nguồn",
      "Pipeline bán hàng & nhắc chăm sóc tự động",
      "Đo tỷ lệ chuyển đổi theo chiến dịch",
    ],
    apps: [
      { icon: "🎯", name: "Lead" },
      { icon: "📊", name: "Pipeline" },
      { icon: "💬", name: "Chăm sóc" },
      { icon: "🔁", name: "Chuyển đổi" },
    ],
    flip: true,
    barLabel: "asyncs crm · pipeline",
    visual: {
      kind: "rows",
      rows: [
        { ava: "①", title: "Lead mới · 124", sub: "Facebook 58 · Giới thiệu 41 · Hotline 25", tag: "Mới", tagKind: "gray" },
        { ava: "②", title: "Đang chăm sóc · 67", sub: "Đã liên hệ & gửi báo giá", tag: "Nóng", tagKind: "green" },
        { ava: "③", title: "Đã chốt · 32", sub: "Tỷ lệ chuyển đổi 26%", tag: "Won", tagKind: "green" },
      ],
    },
  },
];

export type EduTab = {
  num: string;
  title: string;
  desc: string;
  chips: { label: string; check?: boolean }[];
};

export const eduTabs: EduTab[] = [
  {
    num: "01",
    title: "Quiz Engine",
    desc: "Bộ công cụ tạo bài kiểm tra đa định dạng, chấm điểm tự động và phản hồi tức thì.",
    chips: [
      { label: "Trắc nghiệm", check: true },
      { label: "Nối câu", check: true },
      { label: "Điền khuyết", check: true },
      { label: "Luyện nghe", check: true },
      { label: "Đánh giá nói", check: true },
      { label: "Thử thách tính giờ", check: true },
    ],
  },
  {
    num: "02",
    title: "Gamification",
    desc: "Biến việc học thành thói quen với cơ chế điểm thưởng, huy hiệu và bảng xếp hạng.",
    chips: [
      { label: "🏆 Bảng xếp hạng" },
      { label: "🔥 Chuỗi ngày học" },
      { label: "⭐ Huy hiệu thành tích" },
      { label: "🎯 Thử thách mỗi ngày" },
      { label: "💎 Hệ thống phần thưởng" },
    ],
  },
  {
    num: "03",
    title: "Learning Analytics",
    desc: "Dữ liệu học tập được phân tích để can thiệp đúng lúc, đúng người.",
    chips: [
      { label: "Phát hiện nguy cơ bỏ học", check: true },
      { label: "Đo lường điểm yếu kỹ năng", check: true },
      { label: "Theo dõi tiến độ thời gian thực", check: true },
    ],
  },
];

export type Industry = {
  tab: string;
  title: string;
  desc: string;
  points: string[];
  stats: { value: string; label: string }[];
};

export const industries: Industry[] = [
  {
    tab: "Bán lẻ & Chuỗi",
    title: "Bán lẻ & Chuỗi cửa hàng",
    desc: "Quản lý đơn hàng, tồn kho và doanh thu đồng bộ giữa nhiều chi nhánh.",
    points: [
      "Đồng bộ tồn kho & đơn hàng đa chi nhánh",
      "CRM khách hàng thân thiết & khuyến mãi",
      "Báo cáo doanh thu theo cửa hàng & SKU",
    ],
    stats: [
      { value: "+28%", label: "Doanh thu / cửa hàng" },
      { value: "−45%", label: "Sai sót tồn kho" },
      { value: "99%", label: "Đồng bộ tồn kho" },
      { value: "12", label: "Chi nhánh trên 1 hệ thống" },
    ],
  },
  {
    tab: "Dịch vụ & F&B",
    title: "Dịch vụ & F&B",
    desc: "Đặt lịch – đặt bàn, xếp ca nhân viên và chăm sóc khách hàng thân thiết trên cùng một nền tảng.",
    points: [
      "Đặt lịch / đặt bàn & nhắc hẹn tự động",
      "Xếp ca & chấm công nhân viên theo ngày",
      "Tích điểm, ưu đãi & chăm sóc sau bán",
    ],
    stats: [
      { value: "+22%", label: "Khách quay lại" },
      { value: "−50%", label: "Thời gian xếp ca" },
      { value: "4.8★", label: "Hài lòng khách hàng" },
      { value: "95%", label: "Đơn phục vụ đúng giờ" },
    ],
  },
  {
    tab: "Sản xuất",
    title: "Sản xuất",
    desc: "Theo dõi lệnh sản xuất, vật tư và công đoạn — minh bạch chi phí và tiến độ từng đơn hàng.",
    points: [
      "Lệnh sản xuất & định mức vật tư",
      "Theo dõi công đoạn & năng suất nhân công",
      "Truy xuất nguồn gốc & kiểm soát chất lượng",
    ],
    stats: [
      { value: "+18%", label: "Năng suất" },
      { value: "−30%", label: "Tồn kho vật tư" },
      { value: "100%", label: "Truy xuất nguồn gốc" },
      { value: "−40%", label: "Thời gian báo cáo" },
    ],
  },
  {
    tab: "Giáo dục & Đào tạo",
    title: "Giáo dục & Đào tạo",
    desc: "Quản lý học viên, lớp học, học phí và trải nghiệm học tập — phân hệ chuyên sâu ASyncs EDU+.",
    points: [
      "Học viên, xếp lớp & học phí tập trung",
      "Quiz Engine & gamification cho lớp học",
      "Cổng phụ huynh theo dõi bài tập",
    ],
    stats: [
      { value: "+18%", label: "Tỷ lệ tái đăng ký" },
      { value: "92%", label: "Hoàn thành bài tập" },
      { value: "−70%", label: "Thao tác thủ công" },
      { value: "4.8★", label: "Hài lòng phụ huynh" },
    ],
  },
  {
    tab: "Y tế & Phòng khám",
    title: "Y tế & Phòng khám",
    desc: "Đặt lịch hẹn, hồ sơ bệnh nhân và viện phí được số hoá, giảm thời gian chờ và sai sót giấy tờ.",
    points: [
      "Đặt lịch hẹn online & nhắc tái khám",
      "Hồ sơ bệnh nhân & lịch sử khám",
      "Viện phí, bảo hiểm & thanh toán QR",
    ],
    stats: [
      { value: "−55%", label: "Thời gian chờ" },
      { value: "+30%", label: "Lịch hẹn online" },
      { value: "100%", label: "Hồ sơ số hoá" },
      { value: "4.9★", label: "Hài lòng bệnh nhân" },
    ],
  },
  {
    tab: "Bất động sản",
    title: "Bất động sản",
    desc: "Quản lý lead, giỏ hàng dự án, giao dịch và hoa hồng — minh bạch cho cả sale lẫn nhà quản lý.",
    points: [
      "Quản lý lead & giỏ hàng theo dự án",
      "Pipeline giao dịch & đặt chỗ trực quan",
      "Tính hoa hồng tự động theo chính sách",
    ],
    stats: [
      { value: "+35%", label: "Chuyển đổi lead" },
      { value: "−50%", label: "Thời gian chốt" },
      { value: "3×", label: "Năng suất sale" },
      { value: "100%", label: "Minh bạch hoa hồng" },
    ],
  },
];

export const journey = [
  { n: "01", title: "Khảo sát", text: "Phân tích quy trình hiện tại và những điểm thất thoát trong vận hành của trung tâm." },
  { n: "02", title: "Số hoá", text: "Đưa toàn bộ khách hàng,\nđơn hàng, tài chính và\nnhân sự lên một hệ thống." },
  { n: "03", title: "Tối ưu hoá", text: "Tự động hoá nhắc công nợ,\nphê duyệt và quy trình\nbán hàng theo kịch bản." },
  { n: "04", title: "Dữ liệu hoá", text: "Ra quyết định bằng dữ liệu thời gian thực\nvà sẵn sàng mở rộng quy mô." },
];

export const testimonials = [
  {
    stat: "+28%",
    quote: "Tồn kho đồng bộ giữa 12 cửa hàng, doanh thu mỗi điểm bán tăng 28%. Lần đầu tiên toàn chuỗi nhìn chung một bức tranh.",
    ava: "TH",
    name: "Trần Hà",
    role: "COO · RetailOne",
  },
  {
    stat: "−60%",
    quote: "Xếp ca, chấm công và giấy tờ giảm 60% thời gian. Quản lý 5 chi nhánh F&B mà vẫn nắm sát từng ca.",
    ava: "PL",
    name: "Phạm Long",
    role: "Quản lý · Chuỗi F&B Mặn",
  },
  {
    stat: "3×",
    quote: "Từ 1 cơ sở lên 3 cơ sở trong một năm mà không tăng đội ngũ quản lý — quy trình đã được chuẩn hoá sẵn.",
    ava: "NT",
    name: "Nguyễn Thảo",
    role: "Giám đốc · EduMaster (Giáo dục)",
  },
];

export const faqs = [
  {
    q: "ASyncs phù hợp với doanh nghiệp quy mô nào?",
    a: "Từ hộ kinh doanh, SME đến chuỗi nhiều chi nhánh và doanh nghiệp đa phòng ban. Nền tảng triển khai theo phân hệ, mở rộng dần theo nhu cầu.",
  },
  {
    q: "Mất bao lâu để triển khai và chuyển dữ liệu?",
    a: "Với gói cơ bản, doanh nghiệp có thể bắt đầu vận hành trong vài ngày. Đội ngũ ASyncs hỗ trợ nhập dữ liệu khách hàng, đơn hàng và công nợ từ Excel hiện có.",
  },
  {
    q: "Có giải pháp riêng cho ngành của tôi không?",
    a: "Có. ASyncs cấu hình theo từng ngành — bán lẻ, dịch vụ, sản xuất, y tế, bất động sản… và có các vertical chuyên sâu như ASyncs EDU+ cho giáo dục.",
  },
  {
    q: "ASyncs ERP và các vertical khác nhau thế nào?",
    a: "ASyncs ERP là nền tảng lõi đa ngành (công việc, tài chính, nhân sự, CRM). Các vertical như EDU+ bổ sung phân hệ chuyên sâu cho từng ngành trên cùng nền tảng đó.",
  },
];

export const footerColumns = [
  {
    title: "Bộ sản phẩm",
    links: [
      { label: "ASyncs CORE+", href: "#platform" },
      { label: "ASyncs FINANCE+", href: "#platform" },
      { label: "ASyncs PEOPLE+", href: "#platform" },
      { label: "ASyncs CRM+", href: "#platform" },
      { label: "ASyncs EDU+", href: "#diff" },
      { label: "ASyncs INSIGHT+", href: "#dashboard" },
    ],
  },
  {
    title: "Giải pháp",
    links: [
      { label: "ASyncs ERP", href: "#platform" },
      { label: "ASyncs CRM", href: "#platform" },
      { label: "ASyncs EDU+", href: "#diff" },
      { label: "Theo lĩnh vực", href: "#industries" },
    ],
  },
  {
    title: "Tài nguyên",
    links: [
      { label: "Khách hàng", href: "#testimonials" },
      { label: "Hỏi đáp", href: "#faq" },
      { label: "Tính năng", href: "#diff" },
      { label: "Báo giá", href: "#cta" },
    ],
  },
  {
    title: "Công ty",
    links: [
      { label: "Về ASyncs", href: "#top" },
      { label: "Liên hệ", href: "#cta" },
      { label: "Đặt lịch demo", href: "#cta" },
      { label: "asyncs.tech@gmail.com", href: "mailto:asyncs.tech@gmail.com" },
    ],
  },
];

export const productOptions = [
  { value: "erp", label: "ASyncs ERP (đa lĩnh vực)" },
  { value: "core", label: "ASyncs CORE+ — Vận hành" },
  { value: "finance", label: "ASyncs FINANCE+ — Tài chính" },
  { value: "people", label: "ASyncs PEOPLE+ — Nhân sự" },
  { value: "crm", label: "ASyncs CRM+ — Bán hàng" },
  { value: "edu", label: "ASyncs EDU+ — Giáo dục" },
  { value: "insight", label: "ASyncs INSIGHT+ — Dữ liệu" },
] as const;
