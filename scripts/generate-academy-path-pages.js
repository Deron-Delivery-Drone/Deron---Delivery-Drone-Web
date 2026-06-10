const fs = require("fs");
const path = require("path");

const root = path.resolve(__dirname, "..");
const outRoot = path.join(root, "academy", "paths");
const logoPath = "/public/Deronlogocolor_0E1A2B-removebg-preview.png";
const siteUrl = "https://deron.vn";
const academyPath = "/academy";

const courses = [
  {
    id: "drone-beginner-foundation",
    index: "FP 01",
    status: "Beta · Mở học thử",
    statusClass: "beta",
    title: "Drone Beginner Foundation",
    subtitle: "Flight Path nền tảng drone cho người mới",
    level: "Người mới",
    duration: "~ 6-8 giờ",
    lessons: "~19 bài học",
    modulesCount: "5 module",
    checks: "5 Knowledge Check",
    labs: "3 Deron Lab",
    details: ["Deron Badge", "Không phải giấy phép bay", "Cập nhật 2026", "Tiếng Việt"],
    description:
      "Học drone/UAV từ con số 0: hiểu một chiếc quadcopter được tạo thành từ gì, vì sao nó bay được, cảm biến nào giúp nó ổn định, GPS/receiver hoạt động ra sao và các nguyên tắc an toàn cơ bản.",
    purpose: "Hiểu drone/UAV là gì và cách một chiếc quadcopter hoạt động , nền tảng cho mọi lộ trình sau.",
    learn: [
      "Phân biệt UAV, drone, quadcopter và FPV.",
      "Nhận diện các phần chính: frame, motor, propeller, ESC và flight controller.",
      "Hiểu vai trò của IMU, GPS, receiver và pin LiPo trong một hệ UAV cơ bản.",
      "Nắm khái niệm throttle, pitch, roll, yaw và nguyên tắc lực nâng.",
      "Biết các nguyên tắc an toàn trước khi cấp nguồn hoặc bay thật."
    ],
    skills: ["UAV / Drone", "Quadcopter", "Motor", "Propeller", "ESC", "Flight Controller", "IMU", "Gyroscope", "Accelerometer", "GPS", "Receiver", "Pin LiPo", "PID (khái niệm)", "SBUS · CRSF · DSMX", "An toàn bay cơ bản"],
    modules: [
      {
        title: "Nhập môn & ứng dụng",
        meta: "4 bài học · 2 reading · 1 Knowledge Check",
        desc: "Hiểu UAV/drone là gì, một lịch sử ngắn gọn, và vì sao drone hữu ích , từ đời sống đến công nghiệp.",
        topics: ["Định nghĩa UAV/Drone", "Lịch sử ngắn", "Ứng dụng đời sống", "Ứng dụng công nghiệp", "Phân biệt UAV · Drone · FPV"]
      },
      {
        title: "Cấu tạo quadcopter & lực nâng",
        meta: "5 bài học · 1 Deron Lab · 1 Knowledge Check",
        desc: "Nhận diện từng bộ phận và hiểu vì sao 4 động cơ tạo ra lực nâng; throttle/pitch/roll/yaw điều khiển chuyển động ra sao.",
        topics: ["Frame · Motor · Propeller", "ESC", "Flight Controller", "Nguyên lý lực nâng", "Throttle · Pitch · Roll · Yaw"]
      },
      {
        title: "Cảm biến & ổn định bay",
        meta: "3 bài học · 1 Knowledge Check",
        desc: "Vì sao drone giữ thăng bằng được: vai trò của IMU, gyroscope, accelerometer và khái niệm bộ điều khiển PID.",
        topics: ["IMU", "Gyroscope", "Accelerometer", "PID (khái niệm)", "Bộ lọc tín hiệu (giới thiệu)"]
      },
      {
        title: "GPS, chế độ bay & giao tiếp",
        meta: "4 bài học · 1 Deron Lab · 1 Knowledge Check",
        desc: "GPS giúp drone làm waypoint, giữ vị trí, return-to-home; receiver giao tiếp với drone qua các giao thức phổ biến.",
        topics: ["GPS & định vị", "Waypoint · Position Hold · RTH", "SBUS · CRSF · DSMX", "Telemetry"]
      },
      {
        title: "An toàn cơ bản & tổng kết",
        meta: "3 bài học · 1 Deron Lab · 1 Knowledge Check",
        desc: "Hạn chế thực tế của drone, nguyên tắc đặt con người lên hàng đầu, ý thức pháp lý tại Việt Nam, checklist trước khi cấp nguồn/bay.",
        topics: ["Hạn chế của drone", "An toàn bay", "Pháp lý tại Việt Nam (ý thức)", "Đặt con người lên hàng đầu", "Checklist pre-power / pre-flight"]
      }
    ],
    faq: [
      ["Tôi chưa biết gì về drone, học được không?", "Được. Đây là Flight Path nền tảng cấp độ Người mới, bắt đầu từ con số 0 và không yêu cầu kiến thức trước."],
      ["Tôi có cần mua drone để học Flight Path này không?", "Không bắt buộc. Đây là Flight Path kiến thức nền; phần lắp ráp và cấu hình thực tế nằm ở Flight Path “Build Your First UAV”."],
      ["Hoàn thành Flight Path này tôi nhận được gì?", "Bạn nhận Deron Badge. Lưu ý: Deron Badge không phải giấy phép bay."]
    ]
  },
  {
    id: "build-your-first-uav",
    index: "FP 02",
    status: "Sắp ra mắt",
    statusClass: "soon",
    title: "Build Your First UAV",
    subtitle: "Flight Path tự lắp chiếc UAV đầu tiên",
    level: "Người mới -> Trung cấp",
    duration: "~ 10-12 giờ",
    lessons: "~22 bài học",
    modulesCount: "5 module",
    checks: "5 Knowledge Check",
    labs: "5 Deron Lab",
    details: ["Deron Badge", "Không phải giấy phép bay", "Coming Soon", "Tiếng Việt"],
    description:
      "Tự tay lắp chiếc UAV đầu tiên một cách an toàn: chọn linh kiện, chuẩn bị dụng cụ, lắp khung, kết nối ESC-FC-receiver-GPS, cài firmware, test motor và kiểm tra checklist trước khi bay.",
    purpose: "Tự tay lắp chiếc UAV đầu tiên một cách an toàn, từ chọn linh kiện đến checklist trước khi bay.",
    learn: [
      "Đọc yêu cầu nhiệm vụ và chọn frame, motor, propeller, ESC, flight controller phù hợp.",
      "Chuẩn bị dụng cụ, khu vực thao tác và nguyên tắc an toàn pin LiPo.",
      "Lắp khung, đi dây và kết nối ESC-FC-receiver-GPS theo trình tự.",
      "Cài firmware, kiểm tra hướng motor và test motor khi đã tháo cánh.",
      "Hoàn thiện checklist pre-power và pre-flight trước khi bay thử."
    ],
    skills: ["Chọn linh kiện", "Dụng cụ cơ bản", "Lắp khung", "ESC-FC wiring", "Receiver", "GPS", "Firmware setup", "Motor test", "Pre-power checklist", "Pre-flight checklist"],
    modules: [
      { title: "Mục tiêu build & chọn cấu hình", meta: "4 bài học · 1 Knowledge Check", desc: "Xác định mục tiêu UAV đầu tiên, tránh chọn linh kiện theo cảm tính.", topics: ["Mục tiêu nhiệm vụ", "Frame size", "Payload cơ bản", "Ngân sách & rủi ro"] },
      { title: "Linh kiện & dụng cụ", meta: "5 bài học · 1 Deron Lab · 1 Knowledge Check", desc: "Hiểu vai trò từng linh kiện và chuẩn bị dụng cụ thao tác an toàn.", topics: ["Motor", "Propeller", "ESC", "FC", "Receiver", "GPS", "Soldering basics"] },
      { title: "Lắp khung & đi dây", meta: "5 bài học · 2 Deron Lab · 1 Knowledge Check", desc: "Lắp cơ khí, đi dây nguồn/tín hiệu gọn, hạn chế lỗi nhiễu và lỗi kết nối.", topics: ["Frame assembly", "Power wiring", "Signal wiring", "Cable management"] },
      { title: "Firmware & test motor", meta: "5 bài học · 1 Deron Lab · 1 Knowledge Check", desc: "Cấu hình bước đầu, kiểm tra kết nối, test motor khi đã tháo cánh.", topics: ["Firmware setup", "Receiver bind", "Motor direction", "Failsafe intro"] },
      { title: "Checklist & bay thử an toàn", meta: "3 bài học · 1 Deron Lab · 1 Knowledge Check", desc: "Chuẩn bị pre-power/pre-flight để chuyển từ build sang vận hành an toàn.", topics: ["Pre-power", "Pre-flight", "LiPo safety", "First hover"] }
    ],
    faq: [
      ["Có cần biết điện tử trước không?", "Không bắt buộc, nhưng bạn cần đi chậm và tuân thủ checklist an toàn. Flight Path này bắt đầu từ dụng cụ và linh kiện cơ bản."],
      ["Tôi có cần bay thật trong khóa này không?", "Không bắt buộc. Nội dung nhấn mạnh build và kiểm tra an toàn; bay thật chỉ nên thực hiện trong môi trường phù hợp và tuân thủ quy định."],
      ["Flight Path này khác FP01 thế nào?", "FP01 là nền tảng khái niệm. FP02 chuyển sang thực hành lắp chiếc UAV đầu tiên."]
    ]
  },
  {
    id: "fpv-pilot-starter",
    index: "FP 03",
    status: "Dự kiến",
    statusClass: "planned",
    title: "FPV Pilot Starter",
    subtitle: "Flight Path nhập môn bay FPV",
    level: "Người mới",
    duration: "~ 8-10 giờ",
    lessons: "~18 bài học",
    modulesCount: "5 module",
    checks: "5 Knowledge Check",
    labs: "4 Deron Lab",
    details: ["Deron Badge", "Không phải giấy phép bay", "Coming Soon", "Tiếng Việt"],
    description:
      "Làm quen điều khiển và bay FPV an toàn: hiểu throttle, pitch, roll, yaw, khái niệm First Person View, luyện tập trên simulator trước khi ra thực địa.",
    purpose: "Làm quen điều khiển và bay FPV an toàn, bắt đầu trên mô phỏng trước khi ra thực địa.",
    learn: [
      "Hiểu cách throttle, pitch, roll, yaw phối hợp trong điều khiển FPV.",
      "Làm quen góc nhìn FPV và khác biệt giữa bay thường, racing và freestyle.",
      "Luyện hover, turn, landing và line control trên simulator.",
      "Nhận diện lỗi người mới và thói quen luyện tập an toàn.",
      "Chuẩn bị nền tảng để đi tiếp racing/freestyle có kiểm soát."
    ],
    skills: ["Throttle", "Pitch", "Roll", "Yaw", "FPV concepts", "Simulator drills", "Hover", "Turn", "Landing", "FPV safety", "Racing/freestyle foundation"],
    modules: [
      { title: "Bộ điều khiển & chuyển động", meta: "4 bài học · 1 Knowledge Check", desc: "Làm quen các trục điều khiển và phản ứng của drone trong không gian.", topics: ["Throttle", "Pitch", "Roll", "Yaw", "Mode 2"] },
      { title: "Khái niệm FPV", meta: "3 bài học · 1 Knowledge Check", desc: "Hiểu First Person View, camera, latency và tư duy quan sát khi bay.", topics: ["FPV camera", "Latency", "Goggles/screen", "Line of sight"] },
      { title: "Simulator trước thực địa", meta: "5 bài học · 2 Deron Lab · 1 Knowledge Check", desc: "Luyện tập cơ bản trên mô phỏng để giảm rủi ro trước khi bay thật.", topics: ["Simulator setup", "Hover drill", "Turn drill", "Landing drill"] },
      { title: "An toàn FPV", meta: "3 bài học · 1 Deron Lab · 1 Knowledge Check", desc: "An toàn khu vực bay, pin, người xung quanh và giới hạn kỹ năng.", topics: ["Spotter", "No-fly awareness", "Battery safety", "Emergency stop"] },
      { title: "Nền tảng racing/freestyle", meta: "3 bài học · 1 Deron Lab · 1 Knowledge Check", desc: "Tư duy đường bay, phản xạ và mục tiêu luyện tập tiếp theo.", topics: ["Line control", "Gate basics", "Freestyle intro", "Practice plan"] }
    ],
    faq: [
      ["Có cần drone FPV thật không?", "Không bắt buộc ở giai đoạn đầu. Flight Path ưu tiên simulator trước khi bay thật."],
      ["Người mới có bị quá khó không?", "Không. Nội dung bắt đầu từ thao tác điều khiển cơ bản và tăng độ khó từ từ."],
      ["Simulator có phải tính năng đã có chưa?", "Module simulator được đánh dấu Coming Soon trong lộ trình."]
    ]
  },
  {
    id: "firmware-basics",
    index: "FP 04",
    status: "Dự kiến",
    statusClass: "planned",
    title: "Firmware Basics",
    subtitle: "Flight Path nền tảng firmware drone",
    level: "Trung cấp",
    duration: "~ 8-10 giờ",
    lessons: "~17 bài học",
    modulesCount: "5 module",
    checks: "5 Knowledge Check",
    labs: "4 Deron Lab",
    details: ["Deron Badge", "Không phải giấy phép bay", "Coming Soon", "Tiếng Việt"],
    description:
      "Hiểu firmware điều khiển bay và các khái niệm cấu hình cốt lõi của flight controller: Betaflight, ArduPilot, PX4, DShot, CRSF/ELRS, PID và failsafe.",
    purpose: "Hiểu firmware điều khiển bay và các khái niệm cấu hình cốt lõi của flight controller.",
    learn: [
      "Nắm vai trò của flight controller và firmware trong hệ UAV.",
      "Phân biệt Betaflight, ArduPilot và PX4 theo mục tiêu sử dụng.",
      "Hiểu DShot, CRSF/ELRS và các kênh giao tiếp cơ bản.",
      "Đọc các khái niệm PID ở mức nền tảng.",
      "Thiết lập tư duy failsafe và kiểm tra cấu hình an toàn."
    ],
    skills: ["Flight Controller", "Betaflight", "ArduPilot", "PX4", "DShot", "CRSF / ELRS", "PID", "Failsafe logic", "Firmware checklist"],
    modules: [
      { title: "Flight Controller & firmware", meta: "3 bài học · 1 Knowledge Check", desc: "Hiểu flight controller là gì và firmware điều khiển bay làm nhiệm vụ nào.", topics: ["FC", "Firmware", "Sensors", "Outputs"] },
      { title: "Betaflight basics", meta: "4 bài học · 1 Deron Lab · 1 Knowledge Check", desc: "Làm quen giao diện, cấu hình cổng, receiver và motor output ở mức nền tảng.", topics: ["Ports", "Receiver", "Modes", "Motor output"] },
      { title: "ArduPilot & PX4 overview", meta: "4 bài học · 1 Knowledge Check", desc: "Nhìn tổng quan firmware thiên về mission/autonomous và kiến trúc vận hành.", topics: ["ArduPilot", "PX4", "Mission", "Vehicle types"] },
      { title: "Protocols & control", meta: "4 bài học · 2 Deron Lab · 1 Knowledge Check", desc: "DShot, CRSF/ELRS và logic giao tiếp giữa receiver, FC và ESC.", topics: ["DShot", "CRSF", "ELRS", "Telemetry"] },
      { title: "PID & failsafe", meta: "4 bài học · 1 Deron Lab · 1 Knowledge Check", desc: "Khái niệm PID và các bước kiểm tra failsafe trước khi vận hành.", topics: ["PID basics", "Failsafe", "Arming checks", "Safety checklist"] }
    ],
    faq: [
      ["Có cần biết code không?", "Không. Flight Path này tập trung vào hiểu firmware và cấu hình cơ bản, không yêu cầu lập trình."],
      ["Betaflight, ArduPilot, PX4 khác nhau thế nào?", "Mỗi firmware phục vụ mục tiêu khác nhau; nội dung sẽ giúp bạn phân biệt ở mức nền tảng."],
      ["Có được test motor không?", "Chỉ test khi đã tháo cánh và đi theo checklist an toàn."]
    ]
  },
  {
    id: "uav-engineering-foundation",
    index: "FP 05",
    status: "Dự kiến",
    statusClass: "planned",
    title: "UAV Engineering Foundation",
    subtitle: "Flight Path nền tảng kỹ thuật UAV",
    level: "Nâng cao",
    duration: "~ 14-18 giờ",
    lessons: "~24 bài học",
    modulesCount: "6 module",
    checks: "6 Knowledge Check",
    labs: "5 Deron Lab",
    details: ["Deron Badge", "Không phải giấy phép bay", "Coming Soon", "Tiếng Việt"],
    description:
      "Đặt nền tảng kỹ thuật để hiểu sâu cách UAV bay, tiêu thụ năng lượng, cảm biến, điều khiển, embedded systems, simulation, log analysis và safety engineering.",
    purpose: "Đặt nền tảng kỹ thuật để hiểu sâu cách UAV bay, tiêu thụ năng lượng và được điều khiển.",
    learn: [
      "Nắm các khái niệm flight dynamics và lực tác động lên UAV.",
      "Phân tích power, energy và giới hạn pin/payload ở mức nền tảng.",
      "Hiểu cảm biến, điều khiển và embedded systems trong UAV.",
      "Làm quen mô phỏng và phân tích log để cải thiện hệ thống.",
      "Tư duy safety engineering cho thiết kế và vận hành."
    ],
    skills: ["Flight dynamics", "Power & energy", "Sensors", "Control systems", "Embedded systems", "Simulation", "Log analysis", "Safety engineering"],
    modules: [
      { title: "Flight dynamics foundation", meta: "4 bài học · 1 Knowledge Check", desc: "Các lực, moment và chuyển động cơ bản của UAV.", topics: ["Lift", "Drag", "Thrust", "Moment"] },
      { title: "Power & energy", meta: "4 bài học · 1 Deron Lab · 1 Knowledge Check", desc: "Hiểu tiêu thụ năng lượng, pin, payload và thời lượng bay.", topics: ["Battery", "Current draw", "Payload", "Endurance"] },
      { title: "Sensors & estimation", meta: "4 bài học · 1 Deron Lab · 1 Knowledge Check", desc: "Vai trò cảm biến và ước lượng trạng thái bay.", topics: ["IMU", "GPS", "Barometer", "Sensor fusion"] },
      { title: "Control systems", meta: "4 bài học · 1 Deron Lab · 1 Knowledge Check", desc: "Từ feedback loop tới PID và logic điều khiển cơ bản.", topics: ["Feedback", "PID", "Control loop", "Stability"] },
      { title: "Embedded & simulation", meta: "4 bài học · 1 Deron Lab · 1 Knowledge Check", desc: "Tư duy embedded systems và mô phỏng trước thực địa.", topics: ["MCU", "I/O", "Simulation", "Test bench"] },
      { title: "Log analysis & safety engineering", meta: "4 bài học · 1 Deron Lab · 1 Knowledge Check", desc: "Đọc dữ liệu vận hành để cải thiện hệ thống và giảm rủi ro.", topics: ["Logs", "Failure modes", "Safety case", "Review checklist"] }
    ],
    faq: [
      ["Có phải khóa dành cho kỹ sư không?", "Nội dung nâng cao hơn các Flight Path đầu, phù hợp người muốn tiến tới kỹ thuật UAV chuyên sâu."],
      ["Có cần học FP01 trước không?", "Nên học FP01 trước để nắm thuật ngữ và cấu trúc hệ UAV."],
      ["Có nội dung mô phỏng không?", "Có phần chuẩn bị nền tảng mô phỏng, đánh dấu Coming Soon theo lộ trình."]
    ]
  },
  {
    id: "startup-product-lab",
    index: "FP 06",
    status: "Dự kiến",
    statusClass: "planned",
    title: "Startup / Product Lab",
    subtitle: "Flight Path tư duy sản phẩm UAV",
    level: "Liên ngành",
    duration: "~ 8-10 giờ",
    lessons: "~16 bài học",
    modulesCount: "5 module",
    checks: "5 Knowledge Check",
    labs: "5 Deron Lab",
    details: ["Deron Badge", "Không phải giấy phép bay", "Coming Soon", "Tiếng Việt"],
    description:
      "Tư duy biến kiến thức UAV thành sản phẩm: từ ý tưởng, MVP, prototype, user persona, Business Model Canvas, Lean Canvas đến product validation.",
    purpose: "Tư duy biến kiến thức UAV thành sản phẩm: từ ý tưởng đến kiểm chứng thực tế.",
    learn: [
      "Chuyển một vấn đề vận hành thành giả thuyết sản phẩm UAV.",
      "Thiết kế MVP/prototype và xác định ranh giới kiểm chứng.",
      "Viết user persona, BMC và Lean Canvas cho bối cảnh UAV.",
      "Lập kế hoạch product validation có trách nhiệm.",
      "Giữ an toàn, pháp lý và cộng đồng trong tư duy sản phẩm."
    ],
    skills: ["MVP", "Prototype", "User persona", "Business Model Canvas", "Lean Canvas", "Product validation", "UAV product thinking", "Safety-first product design"],
    modules: [
      { title: "Problem discovery", meta: "3 bài học · 1 Deron Lab · 1 Knowledge Check", desc: "Xác định vấn đề thật trước khi nói về drone như một giải pháp.", topics: ["Problem framing", "Stakeholders", "Constraints", "Risk"] },
      { title: "MVP & prototype", meta: "4 bài học · 1 Deron Lab · 1 Knowledge Check", desc: "Tạo phiên bản kiểm chứng nhỏ nhất mà vẫn đo được điều cần học.", topics: ["MVP", "Prototype", "Assumption", "Scope"] },
      { title: "Persona & use case", meta: "3 bài học · 1 Deron Lab · 1 Knowledge Check", desc: "Hiểu người dùng, môi trường vận hành và quy trình hiện tại.", topics: ["Persona", "User journey", "Operations", "Pain points"] },
      { title: "Business model & Lean Canvas", meta: "4 bài học · 1 Deron Lab · 1 Knowledge Check", desc: "Diễn đạt mô hình sản phẩm và giả thuyết kinh doanh rõ ràng.", topics: ["BMC", "Lean Canvas", "Value proposition", "Channels"] },
      { title: "Validation & responsible UAV product", meta: "4 bài học · 1 Deron Lab · 1 Knowledge Check", desc: "Kiểm chứng sản phẩm UAV mà vẫn đặt an toàn, pháp lý và cộng đồng lên trước.", topics: ["Validation", "Metrics", "Safety", "Compliance", "Next steps"] }
    ],
    faq: [
      ["Có cần biết kỹ thuật UAV trước không?", "Nên có nền tảng từ FP01 hoặc kinh nghiệm tương đương để hiểu giới hạn của sản phẩm UAV."],
      ["Flight Path này dành cho ai?", "Dành cho người làm sản phẩm, founder, sinh viên, maker hoặc kỹ sư muốn biến kiến thức UAV thành giải pháp thực tế."],
      ["Có hướng dẫn gọi vốn không?", "Nội dung tập trung vào tư duy sản phẩm và validation, không phải tư vấn gọi vốn."]
    ]
  }
];

const icons = {
  badge: `<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><circle cx="12" cy="9" r="6"/><path d="M9 14l-1 7 4-2 4 2-1-7"/></svg>`,
  check: `<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M5 12l5 5L20 7"/></svg>`,
  play: `<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><polygon points="5 3 19 12 5 21 5 3"/></svg>`,
  lab: `<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M9 3v6L4 19a1 1 0 001 1h14a1 1 0 001-1L15 9V3"/><path d="M7 3h10"/></svg>`,
  quiz: `<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><rect x="4" y="3" width="16" height="18" rx="2"/><path d="M8 8h8M8 12h8"/></svg>`
};

function esc(value) {
  return String(value)
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;");
}

function urlFor(course) {
  return `${academyPath}/paths/${course.id}/`;
}

function absUrlFor(course) {
  return `${siteUrl}${academyPath}/paths/${course.id}`;
}

function renderList(items, tag = "li") {
  return items.map((item) => `<${tag}>${item}</${tag}>`).join("");
}

function renderCourse(course) {
  const recs = courses.filter((item) => item.id !== course.id).slice(0, 3);
  const courseJson = {
    "@context": "https://schema.org",
    "@graph": [
      {
        "@type": "Course",
        name: `${course.title} , ${course.subtitle}`,
        description: course.description,
        provider: { "@type": "EducationalOrganization", name: "Deron Academy", url: `${siteUrl}${academyPath}` },
        inLanguage: "vi-VN",
        educationalLevel: course.level,
        isAccessibleForFree: true,
        teaches: course.skills,
        hasCourseInstance: { "@type": "CourseInstance", courseMode: "online", courseWorkload: `PT${course.duration.replace(/[^\d-]/g, "").split("-").pop() || "8"}H` }
      },
      {
        "@type": "BreadcrumbList",
        itemListElement: [
          { "@type": "ListItem", position: 1, name: "Deron", item: siteUrl },
          { "@type": "ListItem", position: 2, name: "Academy", item: `${siteUrl}${academyPath}` },
          { "@type": "ListItem", position: 3, name: "Flight Paths", item: `${siteUrl}${academyPath}#paths` },
          { "@type": "ListItem", position: 4, name: course.title, item: absUrlFor(course) }
        ]
      }
    ]
  };

  return `<!doctype html>
<html lang="vi">
<head>
<meta charset="utf-8" />
<meta name="viewport" content="width=device-width, initial-scale=1, viewport-fit=cover" />
<link rel="icon" type="image/png" href="${logoPath}" />
<link rel="shortcut icon" href="${logoPath}" />
<title>${esc(course.title)} , ${esc(course.subtitle)} | Deron Academy</title>
<meta name="description" content="${esc(course.description)}" />
<link rel="canonical" href="${absUrlFor(course)}" />
<meta property="og:type" content="website" />
<meta property="og:site_name" content="Deron Academy" />
<meta property="og:locale" content="vi_VN" />
<meta property="og:title" content="${esc(course.title)} , Deron Academy" />
<meta property="og:description" content="${esc(course.description)}" />
<meta property="og:url" content="${absUrlFor(course)}" />
<meta property="og:image" content="${siteUrl}/og-image.jpg" />
<meta property="og:image:alt" content="${esc(course.title)} , Deron Academy" />
<meta name="twitter:card" content="summary_large_image" />
<meta name="twitter:title" content="${esc(course.title)} , Deron Academy" />
<meta name="twitter:description" content="${esc(course.description)}" />
<meta name="twitter:image" content="${siteUrl}/og-image.jpg" />
<link rel="preconnect" href="https://fonts.googleapis.com" />
<link rel="preconnect" href="https://fonts.gstatic.com" crossorigin />
<link href="https://fonts.googleapis.com/css2?family=Be+Vietnam+Pro:wght@300;400;500;600;700;800&family=JetBrains+Mono:wght@400;500;600&display=swap" rel="stylesheet" />
<script type="application/ld+json">${JSON.stringify(courseJson)}</script>
<style>
  :root{--bg:#FBFCFD;--surface:#F4F7FA;--surface-2:#EEF3F8;--ink:#0E1A2B;--ink-soft:#33415A;--muted:#5A6B81;--line:#E2E8F0;--line-strong:#CBD6E4;--navy:#0B2447;--blue:#1560D6;--blue-deep:#0C49AB;--cyan:#0C8CA8;--amber:#9A6B05;--amber-bg:#FCF4DF;--amber-line:#EBD49A;--red:#B5341C;--red-bg:#FBEAE6;--radius:14px;--maxw:1160px;--shadow:0 1px 2px rgba(14,26,43,.04),0 8px 28px -18px rgba(14,26,43,.22);--shadow-lift:0 2px 4px rgba(14,26,43,.05),0 22px 48px -26px rgba(14,26,43,.34);--ff:"Be Vietnam Pro",ui-sans-serif,system-ui,sans-serif;--mono:"JetBrains Mono",ui-monospace,monospace}
  *{box-sizing:border-box}html{scroll-behavior:smooth;-webkit-text-size-adjust:100%}body{margin:0;background:var(--bg);color:var(--ink);font-family:var(--ff);font-size:16px;line-height:1.65;letter-spacing:-.003em;-webkit-font-smoothing:antialiased;overflow-x:hidden}h1,h2,h3,h4{line-height:1.18;letter-spacing:-.02em;margin:0;color:var(--navy);font-weight:700}p{margin:0}a{color:var(--blue-deep);text-decoration:none}a:hover{text-decoration:underline}img,svg{display:block}.wrap{max-width:var(--maxw);margin:0 auto;padding:0 22px}.mono{font-family:var(--mono)}.skip{position:absolute;left:-999px;background:var(--navy);color:#fff;padding:10px 16px;z-index:200}.skip:focus{left:0}:focus-visible{outline:3px solid var(--blue);outline-offset:2px;border-radius:4px}.eyebrow{font-family:var(--mono);font-size:12px;font-weight:600;letter-spacing:.14em;text-transform:uppercase;color:var(--cyan)}
  .btn{display:inline-flex;align-items:center;justify-content:center;gap:9px;font-weight:600;font-size:15.5px;padding:13px 22px;border-radius:11px;border:1.5px solid transparent;cursor:pointer;transition:transform .14s,box-shadow .2s,background .2s,border-color .2s;text-decoration:none;width:100%}.btn:hover{text-decoration:none}.btn-primary{background:var(--navy);color:#fff;box-shadow:var(--shadow)}.btn-primary:hover{background:#0a1d3b;transform:translateY(-2px);box-shadow:var(--shadow-lift)}.btn-ghost{background:#fff;color:var(--navy);border-color:var(--line-strong)}.btn-ghost:hover{border-color:var(--navy)}.btn svg{width:17px;height:17px}
  header.nav{position:sticky;top:0;z-index:100;background:rgba(251,252,253,.85);backdrop-filter:saturate(160%) blur(12px);border-bottom:1px solid var(--line)}.nav-row{display:flex;align-items:center;justify-content:space-between;height:64px}.brand{display:flex;align-items:center;gap:11px;color:var(--navy);font-weight:700}.brand:hover{text-decoration:none}.brand .logo{width:41px;height:41px;object-fit:contain;margin:-5px -5px -9px -5px}.brand > span{display:flex;flex-direction:column;justify-content:center}.brand small{display:block;font-family:var(--mono);font-size:9.5px;font-weight:600;letter-spacing:.16em;text-transform:uppercase;color:var(--cyan);line-height:1}.brand .nm{display:block;font-size:17px;line-height:1.05}nav.links{display:flex;gap:24px;align-items:center}nav.links a{color:var(--ink-soft);font-size:14.5px;font-weight:500}nav.links a:hover{color:var(--navy);text-decoration:none}@media(max-width:900px){nav.links,.nav-cta{display:none}}
  .crumbs{padding:14px 0 0;font-size:13px;color:var(--muted)}.crumbs ol{list-style:none;display:flex;gap:8px;align-items:center;margin:0;padding:0;flex-wrap:wrap}.crumbs a{color:var(--muted)}.crumbs a:hover{color:var(--navy)}.crumbs .sep{color:var(--line-strong)}.crumbs [aria-current]{color:var(--ink-soft);font-weight:500;overflow-wrap:anywhere}
  .hero{position:relative;overflow:hidden;border-bottom:1px solid var(--line);padding-bottom:26px}.hero::before{content:"";position:absolute;inset:0;background-image:linear-gradient(var(--line) 1px,transparent 1px),linear-gradient(90deg,var(--line) 1px,transparent 1px);background-size:42px 42px;mask-image:radial-gradient(ellipse 90% 70% at 30% 0,#000 35%,transparent 80%);opacity:.55}.hero-inner{position:relative;padding:26px 0 8px;max-width:760px}.provider{display:flex;align-items:center;flex-wrap:wrap;gap:10px;margin-bottom:14px;color:var(--ink-soft);font-size:14px}.provider .logo{width:34px;height:34px;object-fit:contain;margin:-5px -5px -9px -5px}.provider b{color:var(--navy)}.hero h1{font-size:clamp(28px,4.6vw,44px);font-weight:800;letter-spacing:-.03em;margin-top:6px;overflow-wrap:anywhere}.partof{margin-top:14px;font-size:15px;color:var(--ink-soft)}.partof a{font-weight:600}.hero .tag{margin-top:10px;font-size:16px;color:var(--ink-soft);max-width:60ch}.meta-row{display:flex;flex-wrap:wrap;gap:10px 26px;margin-top:22px}.meta{display:flex;align-items:flex-start;gap:10px;font-size:13.5px;color:var(--ink-soft);max-width:230px}.meta svg{width:20px;height:20px;color:var(--blue);flex:none;margin-top:1px}.meta b{display:block;color:var(--navy);font-size:14px}.status-pill{display:inline-flex;align-items:center;gap:7px;font-family:var(--mono);font-size:11.5px;font-weight:600;letter-spacing:.05em;text-transform:uppercase;color:var(--cyan);background:#E4F4F8;border:1px solid #BBE3EC;padding:5px 11px;border-radius:999px}.status-pill.soon{color:var(--blue-deep);background:#EAF1FC;border-color:#CADDF7}.status-pill.planned{color:var(--muted);background:var(--surface);border-color:var(--line-strong)}@media(max-width:520px){.crumbs li:last-child{flex-basis:100%;margin-top:3px}.hero-inner{max-width:320px}.layout{max-width:360px}.hero h1{font-size:30px;line-height:1.15;max-width:320px}.partof,.hero .tag{max-width:320px}.meta-row{gap:14px 18px}.status-pill{font-size:10.5px}}
  .layout{display:grid;grid-template-columns:1fr 348px;gap:44px;align-items:start;padding:46px 0}@media(max-width:940px){.layout{grid-template-columns:1fr;gap:8px;padding:30px 0}}.content > section{padding:34px 0;border-bottom:1px solid var(--line)}.content > section:first-child{padding-top:0}.content h2{font-size:clamp(21px,3vw,27px);font-weight:700}.content h2 + p{margin-top:10px;color:var(--ink-soft)}
  .enroll-wrap{position:sticky;top:84px}@media(max-width:940px){.enroll-wrap{position:static;order:-1;margin-bottom:18px}}.enroll{background:#fff;border:1px solid var(--line);border-radius:16px;box-shadow:var(--shadow-lift);padding:22px;overflow:hidden}.enroll .free{font-family:var(--mono);font-size:12px;letter-spacing:.06em;text-transform:uppercase;color:var(--cyan);font-weight:600}.enroll .lead{margin-top:7px;font-weight:700;font-size:18px;color:var(--navy)}.enroll .sub{margin-top:6px;font-size:13.5px;color:var(--muted)}.enroll .btns{margin-top:16px;display:grid;gap:10px}.enroll .incl{margin:18px 0 0;padding:16px 0 0;border-top:1px solid var(--line);list-style:none;display:grid;gap:11px}.enroll .incl li{display:grid;grid-template-columns:20px 1fr;gap:11px;font-size:14px;color:var(--ink-soft)}.enroll .incl li svg{width:18px;height:18px;color:var(--blue);margin-top:2px}.enroll .incl li b{color:var(--navy)}.enroll .foot{margin-top:16px;padding-top:14px;border-top:1px solid var(--line);font-size:12px;color:var(--muted)}
  .learn-grid{display:grid;grid-template-columns:1fr 1fr;gap:14px 30px;margin-top:20px}@media(max-width:620px){.learn-grid{grid-template-columns:1fr}}.learn-item{display:grid;grid-template-columns:22px 1fr;gap:12px;font-size:15px;color:var(--ink-soft)}.learn-item svg{width:20px;height:20px;color:var(--cyan);margin-top:3px;flex:none}.details{display:grid;grid-template-columns:repeat(4,1fr);gap:0;margin-top:18px;border:1px solid var(--line);border-radius:12px;overflow:hidden;background:#fff}@media(max-width:620px){.details{grid-template-columns:1fr 1fr}}.det{padding:16px 18px;border-right:1px solid var(--line)}.det:last-child{border-right:0}@media(max-width:620px){.det:nth-child(2){border-right:0}.det:nth-child(1),.det:nth-child(2){border-bottom:1px solid var(--line)}}.det .di{display:flex;align-items:center;gap:8px;color:var(--blue)}.det .di svg{width:18px;height:18px}.det .dk{font-size:13px;font-weight:600;color:var(--navy)}.det .dv{margin-top:5px;font-size:12.5px;color:var(--muted)}.chips{display:flex;flex-wrap:wrap;gap:9px;margin-top:18px}.chip{font-family:var(--mono);font-size:12.5px;color:var(--ink-soft);background:#fff;border:1px solid var(--line-strong);border-radius:8px;padding:6px 11px}
  .partbox{background:var(--surface);border:1px solid var(--line);border-radius:14px;padding:22px;margin-top:6px}.partbox h3{font-size:17px}.partbox ul{margin:14px 0 0;padding:0;list-style:none;display:grid;gap:10px}.partbox li{display:grid;grid-template-columns:20px 1fr;gap:11px;font-size:14.5px;color:var(--ink-soft)}.partbox li svg{width:18px;height:18px;color:var(--blue);margin-top:2px}
  .mod-head{display:flex;align-items:baseline;justify-content:space-between;gap:14px;flex-wrap:wrap}.mod-head .count{font-size:14px;color:var(--muted);font-family:var(--mono)}.module{border:1px solid var(--line);border-radius:12px;background:#fff;margin-top:14px;overflow:hidden}.module[open]{border-color:var(--line-strong);box-shadow:var(--shadow)}.module summary{list-style:none;cursor:pointer;padding:18px 20px;display:flex;align-items:flex-start;justify-content:space-between;gap:16px}.module summary::-webkit-details-marker{display:none}.module .mtitle{font-weight:700;color:var(--navy);font-size:16.5px}.module .mmeta{margin-top:5px;font-size:13px;color:var(--muted);font-family:var(--mono)}.module .chev{flex:none;transition:transform .25s;color:var(--blue);margin-top:3px}.module[open] .chev{transform:rotate(180deg)}.module .body{padding:0 20px 20px}.module .body p{font-size:14.5px;color:var(--ink-soft)}.module .incl-line{margin-top:13px;display:flex;flex-wrap:wrap;gap:8px 16px;font-size:12.5px;color:var(--ink-soft);font-family:var(--mono)}.module .incl-line span{display:inline-flex;align-items:center;gap:6px}.module .incl-line svg{width:14px;height:14px;color:var(--cyan)}.module .topics{margin:13px 0 0;padding:0;list-style:none;display:flex;flex-wrap:wrap;gap:7px}.module .topics li{font-family:var(--mono);font-size:11.5px;color:var(--ink-soft);background:var(--surface);border:1px solid var(--line);border-radius:7px;padding:4px 8px}
  .safety-banner{display:flex;align-items:flex-start;gap:12px;background:var(--amber-bg);border:1px solid var(--amber-line);border-radius:12px;padding:16px 18px;color:var(--amber);font-size:14.5px;margin-top:18px}.safety-banner svg{width:22px;height:22px;flex:none;margin-top:1px}.safety-banner b{color:#7a5400}.critical{margin-top:14px;display:flex;gap:11px;align-items:flex-start;background:var(--red-bg);border:1px solid #F1C4BB;border-left:4px solid var(--red);border-radius:0 10px 10px 0;padding:14px 16px}.critical svg{width:20px;height:20px;color:var(--red);flex:none;margin-top:1px}.critical p{font-size:13.5px;color:#7A271A}.critical strong{color:var(--red)}.offered{display:flex;align-items:center;gap:16px;margin-top:18px;background:#fff;border:1px solid var(--line);border-radius:14px;padding:20px}.offered .logo{width:48px;height:48px;object-fit:contain;flex:none}.offered h3{font-size:16px}.offered p{margin-top:5px;font-size:14px;color:var(--ink-soft)}
  .qa{border:1px solid var(--line);border-radius:12px;background:#fff;margin-top:12px;overflow:hidden}.qa[open]{border-color:var(--line-strong);box-shadow:var(--shadow)}.qa summary{list-style:none;cursor:pointer;padding:16px 18px;display:flex;align-items:center;justify-content:space-between;gap:14px;font-weight:600;color:var(--navy);font-size:15.5px}.qa summary::-webkit-details-marker{display:none}.qa .chev{flex:none;transition:transform .25s;color:var(--blue)}.qa[open] .chev{transform:rotate(180deg)}.qa .ans{padding:0 18px 18px;color:var(--ink-soft);font-size:14.5px}
  .recs{background:var(--surface);border-top:1px solid var(--line);padding:56px 0}.recs h2{font-size:clamp(21px,3vw,28px)}.rec-grid{display:grid;grid-template-columns:repeat(3,1fr);gap:18px;margin-top:24px}@media(max-width:820px){.rec-grid{grid-template-columns:1fr}}.rec{background:#fff;border:1px solid var(--line);border-radius:14px;padding:20px;transition:transform .2s,box-shadow .2s,border-color .2s;display:block}.rec:hover{transform:translateY(-3px);box-shadow:var(--shadow-lift);border-color:var(--line-strong);text-decoration:none}.rec .idx{font-family:var(--mono);font-size:12px;color:var(--muted)}.rec h3{font-size:17px;margin-top:8px}.rec .lvl{margin-top:5px;font-family:var(--mono);font-size:11px;text-transform:uppercase;letter-spacing:.04em;color:var(--cyan)}.rec p{margin-top:9px;font-size:13.5px;color:var(--ink-soft)}
  .cta-final{background:linear-gradient(135deg,var(--navy),#0d2f5e);color:#fff;border-radius:22px;padding:44px 36px;text-align:center;position:relative;overflow:hidden;margin:56px 0}.cta-final::before{content:"";position:absolute;inset:0;background-image:linear-gradient(rgba(255,255,255,.045) 1px,transparent 1px),linear-gradient(90deg,rgba(255,255,255,.045) 1px,transparent 1px);background-size:36px 36px;mask-image:radial-gradient(ellipse 70% 90% at 50% 0,#000,transparent 75%)}.cta-final h2{color:#fff;font-size:clamp(23px,3.4vw,33px);position:relative}.cta-final p{color:#C9D6E8;margin:13px auto 0;max-width:54ch;position:relative}.cta-final .row{position:relative;margin-top:24px;display:flex;gap:12px;justify-content:center;flex-wrap:wrap}.cta-final .btn{width:auto}.cta-final .btn-primary{background:#fff;color:var(--navy)}.cta-final .btn-primary:hover{background:#EAF1FC}.cta-final .btn-ghost{background:transparent;color:#fff;border-color:rgba(255,255,255,.4)}.cta-final .btn-ghost:hover{border-color:#fff}
  body.auth-modal-open{overflow:hidden}.auth-section[hidden]{display:none}.auth-section{position:fixed;inset:0;z-index:300;display:grid;place-items:center;background:rgba(14,26,43,.42);padding:24px;border:0;overflow:auto}.auth-section .wrap{width:100%;max-width:460px;padding:0}.auth-panel{position:relative;background:#fff;border:1px solid var(--line);border-radius:14px;box-shadow:0 28px 80px -36px rgba(14,26,43,.65);padding:30px}.auth-close{position:absolute;top:16px;right:16px;width:34px;height:34px;border:0;background:transparent;color:var(--ink);border-radius:8px;display:grid;place-items:center;cursor:pointer}.auth-close:hover{background:var(--surface)}.auth-close svg{width:20px;height:20px}.auth-copy .eyebrow{display:none}.auth-copy h2{font-size:25px;line-height:1.12;margin:0;padding-right:34px;color:var(--ink)}.auth-copy p{margin-top:10px;color:var(--ink-soft);font-size:15.5px;line-height:1.55;max-width:34ch}.auth-box{margin-top:22px}.auth-tabs{display:grid;grid-template-columns:1fr 1fr;gap:8px;margin-bottom:16px}.auth-tab{border:1px solid var(--line-strong);background:#fff;color:var(--ink-soft);border-radius:10px;padding:10px 12px;font:600 13px var(--ff);cursor:pointer}.auth-tab[aria-selected="true"]{background:var(--navy);border-color:var(--navy);color:#fff}.auth-form{display:grid;gap:12px}.auth-field{display:grid;gap:6px}.auth-field label{font-size:12px;font-weight:700;color:var(--ink);font-family:var(--mono);letter-spacing:.04em;text-transform:uppercase}.auth-field input{width:100%;border:1px solid var(--line-strong);border-radius:10px;background:#fff;color:var(--ink);font:500 15px var(--ff);padding:12px 13px}.auth-submit{justify-content:center;width:100%;margin-top:4px}.auth-status{min-height:22px;margin-top:12px;font-size:13.5px;color:var(--muted)}.auth-status.ok{color:#087A5A}.auth-status.err{color:var(--red)}.auth-user{display:none;border:1px solid var(--line);border-radius:12px;background:#fff;padding:16px;margin-top:14px}.auth-user strong{display:block;color:var(--navy)}.auth-user p{margin-top:4px;font-size:13.5px;color:var(--muted)}.auth-user .row{display:flex;gap:10px;flex-wrap:wrap;margin-top:14px}.auth-user .btn{padding:10px 14px;font-size:13.5px}@media(max-width:520px){.auth-section{padding:16px;place-items:end center}.auth-panel{padding:26px 20px 22px;border-radius:14px;width:100%}}
  footer{background:var(--bg);padding:44px 0 34px;border-top:1px solid var(--line)}.foot-row{display:flex;justify-content:space-between;gap:20px;flex-wrap:wrap;align-items:center}.foot-row .disc{font-size:12.5px;color:var(--muted);max-width:62ch}.foot-links{display:flex;gap:20px;flex-wrap:wrap}.foot-links a{font-size:14px;color:var(--ink-soft)}
</style>
</head>
<body>
<a class="skip" href="#main">Bỏ qua tới nội dung chính</a>
<header class="nav"><div class="wrap nav-row"><a class="brand" href="${academyPath}/" aria-label="Deron Academy"><img class="logo" src="${logoPath}" alt="" aria-hidden="true" decoding="async" /><span><span class="nm">Deron Academy</span><small>Deron FlightVerse</small></span></a><nav class="links" aria-label="Điều hướng chính"><a href="${academyPath}/#about">Giới thiệu</a><a href="${academyPath}/#paths">Flight Paths</a><a href="${academyPath}/#how">Cách học</a><a href="${academyPath}/#safety">An toàn</a><a href="${academyPath}/#roadmap">FlightVerse</a><a href="${academyPath}/#faq">FAQ</a></nav><a class="btn btn-primary nav-cta js-start-path" style="width:auto" href="#enroll">Bắt đầu học</a></div></header>
<div class="wrap"><nav class="crumbs" aria-label="Đường dẫn"><ol><li><a href="/">Deron</a></li><li class="sep" aria-hidden="true">/</li><li><a href="${academyPath}/">Academy</a></li><li class="sep" aria-hidden="true">/</li><li><a href="${academyPath}/#paths">Flight Paths</a></li><li class="sep" aria-hidden="true">/</li><li><a aria-current="page" href="#">${esc(course.title)}</a></li></ol></nav></div>
<section class="hero" aria-labelledby="h1"><div class="wrap hero-inner"><div class="provider"><img class="logo" src="${logoPath}" alt="" aria-hidden="true" decoding="async" /><span>Biên soạn bởi <b>Deron</b></span><span class="status-pill ${course.statusClass}" style="margin-left:4px">● ${esc(course.status)}</span></div><p class="eyebrow">Flight Path · ${esc(course.index)}</p><h1 id="h1">${esc(course.title)}</h1><p class="partof">Flight Path này thuộc <a href="${academyPath}/">Deron Academy</a> , tầng học tập của hệ sinh thái <strong>Deron FlightVerse</strong>.</p><p class="tag">${esc(course.description)}</p><div class="meta-row"><div class="meta">${icons.play}<span><b>Cấp độ</b>${esc(course.level)}</span></div><div class="meta">${icons.quiz}<span><b>Thời lượng</b>${esc(course.duration)}</span></div><div class="meta">${icons.badge}<span><b>Deron Badge</b>Không phải giấy phép bay</span></div></div></div></section>
<main id="main" class="wrap"><div class="layout"><div class="content">
<section aria-labelledby="learn-h"><h2 id="learn-h">Bạn sẽ học được gì</h2><div class="learn-grid">${course.learn.map((item) => `<div class="learn-item">${icons.check}<span>${esc(item)}</span></div>`).join("")}</div></section>
<section aria-labelledby="det-h"><h2 id="det-h">Chi tiết cần biết</h2><div class="details"><div class="det"><div class="di">${icons.badge}</div><div class="dk">${esc(course.details[0])}</div><div class="dv">${esc(course.details[1])}</div></div><div class="det"><div class="di">${icons.quiz}</div><div class="dk">${esc(course.checks)}</div><div class="dv">Quiz theo module</div></div><div class="det"><div class="di">${icons.lab}</div><div class="dk">${esc(course.labs)}</div><div class="dv">Thực hành có cấu trúc</div></div><div class="det"><div class="di">${icons.play}</div><div class="dk">${esc(course.details[2])}</div><div class="dv">${esc(course.details[3])}</div></div></div></section>
<section aria-labelledby="skill-h"><h2 id="skill-h">Kỹ năng bạn sẽ có</h2><p>Sau Flight Path này, bạn nắm vững các khái niệm và thuật ngữ trọng tâm:</p><div class="chips">${course.skills.map((item) => `<span class="chip">${esc(item)}</span>`).join("")}</div></section>
<section aria-labelledby="part-h"><h2 id="part-h">Flight Path này thuộc Deron Academy</h2><div class="partbox"><h3>Khi bắt đầu Flight Path này, bạn cũng bước vào lộ trình học có cấu trúc của Deron Academy</h3><ul><li>${icons.check}<span>Học theo trình tự hợp lý, không chắp vá.</span></li><li>${icons.check}<span>Phát triển hiểu biết thực tế qua Deron Lab và Knowledge Check.</span></li><li>${icons.check}<span>Deron Badge không phải giấy phép bay.</span></li><li>${icons.check}<span>Sẵn sàng đi tiếp tới các Flight Path khác trong hệ sinh thái học tập.</span></li></ul></div></section>
<section aria-labelledby="mod-h"><div class="mod-head"><h2 id="mod-h">Nội dung Flight Path</h2><span class="count">${esc(course.modulesCount)} · ${esc(course.lessons)}</span></div><p>${esc(course.purpose)}</p>${course.modules.map((mod, idx) => `<details class="module"${idx === 0 ? " open" : ""}><summary><span><span class="mtitle">Module ${idx + 1} · ${esc(mod.title)}</span><span class="mmeta">${esc(mod.meta)}</span></span><span class="chev" aria-hidden="true"><svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5"><path d="M6 9l6 6 6-6"/></svg></span></summary><div class="body"><p>${esc(mod.desc)}</p><ul class="topics">${renderList(mod.topics)}</ul><div class="incl-line"><span>${icons.play}Bài học</span><span>${icons.lab}Deron Lab / Reading</span><span>${icons.quiz}Knowledge Check</span></div></div></details>`).join("")}</section>
<section aria-labelledby="safe-h"><h2 id="safe-h">Lưu ý</h2><div class="critical" role="alert"><svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M12 9v4M12 17h.01"/><path d="M10.3 3.9l-8 14A2 2 0 004 21h16a2 2 0 001.7-3l-8-14a2 2 0 00-3.4 0z"/></svg><p><strong>Lưu ý:</strong> Deron Badge không phải giấy phép bay.</p></div></section>
<section aria-labelledby="off-h"><h2 id="off-h">Người biên soạn</h2><div class="offered"><img class="logo" src="${logoPath}" alt="" aria-hidden="true" loading="lazy" decoding="async" /><div><h3>Deron</h3><p>Biên soạn bởi đội ngũ Deron, dựa trên tài liệu huấn luyện nội bộ về thiết bị bay không người lái. Hệ sinh thái UAV/drone Việt Nam, lấy con người và kỹ thuật làm trung tâm.</p></div></div></section>
<section aria-labelledby="faq-h" style="border-bottom:0"><h2 id="faq-h">Câu hỏi thường gặp về Flight Path này</h2>${course.faq.map(([q, a]) => `<details class="qa"><summary>${esc(q)}<span class="chev" aria-hidden="true"><svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5"><path d="M6 9l6 6 6-6"/></svg></span></summary><div class="ans"><p>${esc(a)}</p></div></details>`).join("")}<details class="qa"><summary>Sau Flight Path này nên học gì tiếp?<span class="chev" aria-hidden="true"><svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5"><path d="M6 9l6 6 6-6"/></svg></span></summary><div class="ans"><p>Tùy mục tiêu: chọn một Flight Path liên quan trong phần gợi ý bên dưới hoặc quay lại danh sách đầy đủ của Deron Academy.</p></div></details></section>
</div><aside class="enroll-wrap" aria-label="Đăng ký Flight Path"><div class="enroll" id="enroll"><p class="free">${esc(course.status)}</p><p class="lead">Bắt đầu Flight Path</p><p class="sub">${esc(course.purpose)} Khi bắt đầu, bạn cũng vào lộ trình học có cấu trúc của Deron Academy.</p><div class="btns"><a class="btn btn-primary js-start-path" href="#modules">Bắt đầu học</a><a class="btn btn-ghost" href="${academyPath}/#paths">Xem các Flight Path khác</a></div><ul class="incl"><li>${icons.play}<span><b>${esc(course.modulesCount)}</b></span></li><li>${icons.quiz}<span><b>${esc(course.lessons)}</b></span></li><li>${icons.lab}<span><b>${esc(course.labs)}</b></span></li><li>${icons.quiz}<span><b>${esc(course.checks)}</b></span></li><li>${icons.badge}<span><b>Deron Badge</b></span></li><li>${icons.check}<span>Lịch học linh hoạt · Tiếng Việt</span></li></ul><p class="foot">Lưu ý: Deron Badge không phải giấy phép bay.</p></div></aside></div></main>
<section class="recs" aria-labelledby="rec-h"><div class="wrap"><h2 id="rec-h">Các Flight Path khác trong Deron Academy</h2><div class="rec-grid">${recs.map((rec) => `<a class="rec" href="${urlFor(rec)}"><span class="idx">${esc(rec.index)} · ${esc(rec.status)}</span><h3>${esc(rec.title)}</h3><p class="lvl">${esc(rec.level)}</p><p>${esc(rec.purpose)}</p></a>`).join("")}</div></div></section>
<div class="wrap"><div class="cta-final"><h2>Sẵn sàng bắt đầu ${esc(course.title)}?</h2><p>Học theo lộ trình rõ ràng, có module, Deron Lab, Knowledge Check và ghi nhận tiến độ nội bộ.</p><div class="row"><a class="btn btn-primary js-start-path" href="#enroll">Bắt đầu Flight Path</a><a class="btn btn-ghost" href="${academyPath}/#paths">Xem tất cả Flight Paths</a></div></div></div>
<section id="academy-auth" class="auth-section" role="dialog" aria-modal="true" aria-labelledby="auth-h" hidden><div class="wrap"><div class="auth-panel"><button class="auth-close" type="button" id="academyAuthClose" aria-label="Đóng đăng nhập"><svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.4" aria-hidden="true"><path d="M18 6L6 18M6 6l12 12"/></svg></button><div class="auth-copy"><p class="eyebrow">Tài khoản học tập</p><h2 id="auth-h">Đăng nhập hoặc tạo tài khoản</h2><p>Dùng tài khoản Deron Academy để ghi nhận tiến độ, Knowledge Check và Deron Badge nội bộ.</p><div class="auth-user" id="academyAuthUser"><strong id="academyAuthEmail">Đã đăng nhập</strong><p>Bạn có thể tiếp tục Flight Path này.</p><div class="row"><button class="btn btn-primary" type="button" id="academyContinue">Tiếp tục học</button><button class="btn btn-ghost" type="button" id="academySignOut">Đăng xuất</button></div></div></div><div class="auth-box" id="academyAuthBox"><div class="auth-tabs" role="tablist" aria-label="Chọn chế độ tài khoản"><button class="auth-tab" type="button" aria-selected="true" data-auth-mode="login">Đăng nhập</button><button class="auth-tab" type="button" aria-selected="false" data-auth-mode="signup">Tạo tài khoản</button></div><form class="auth-form" id="academyAuthForm"><div class="auth-field" id="authNameField" hidden><label for="academyName">Tên hiển thị</label><input id="academyName" name="name" autocomplete="name" /></div><div class="auth-field"><label for="academyEmail">Email</label><input id="academyEmail" name="email" type="email" autocomplete="email" required /></div><div class="auth-field"><label for="academyPassword">Mật khẩu</label><input id="academyPassword" name="password" type="password" autocomplete="current-password" minlength="6" required /></div><button class="btn btn-primary auth-submit" type="submit" id="academyAuthSubmit">Đăng nhập</button><p class="auth-status" id="academyAuthStatus" aria-live="polite"></p></form></div></div></div></section>
<footer><div class="wrap foot-row"><span class="disc">© <span id="yr">2026</span> Deron · Deron Academy. Deron Badge không phải giấy phép bay.</span><div class="foot-links"><a href="${academyPath}/">Academy</a><a href="${academyPath}/#paths">Flight Paths</a><a href="${academyPath}/#faq">FAQ</a><a href="/">deron.vn</a></div></div></footer>
<script>document.getElementById('yr').textContent=new Date().getFullYear();document.querySelectorAll('details.qa, details.module').forEach(function(d){var s=d.querySelector('summary');s.setAttribute('role','button');s.setAttribute('aria-expanded',d.open?'true':'false');d.addEventListener('toggle',function(){s.setAttribute('aria-expanded',d.open?'true':'false')})});</script>
<script src="/runtime-env.js"></script><script type="module">
import{createClient}from"https://cdn.jsdelivr.net/npm/@supabase/supabase-js/+esm";const authSection=document.getElementById('academy-auth'),authBox=document.getElementById('academyAuthBox'),authUser=document.getElementById('academyAuthUser'),authEmail=document.getElementById('academyAuthEmail'),authForm=document.getElementById('academyAuthForm'),authStatus=document.getElementById('academyAuthStatus'),authSubmit=document.getElementById('academyAuthSubmit'),authNameField=document.getElementById('authNameField'),authPassword=document.getElementById('academyPassword'),authClose=document.getElementById('academyAuthClose'),startButtons=document.querySelectorAll('.js-start-path'),authTabs=document.querySelectorAll('[data-auth-mode]');let authMode='login';const env=window.__DERON_ENV__||{},supabase=env.REACT_APP_SUPABASE_URL&&env.REACT_APP_SUPABASE_ANON_KEY?createClient(env.REACT_APP_SUPABASE_URL,env.REACT_APP_SUPABASE_ANON_KEY):null;function setStatus(m,t){authStatus.textContent=m||'';authStatus.classList.toggle('ok',t==='ok');authStatus.classList.toggle('err',t==='err')}function showAuth(m){authSection.hidden=false;document.body.classList.add('auth-modal-open');if(m)setStatus(m,'');history.replaceState(null,'',window.location.pathname+window.location.search+'#academy-auth');setTimeout(()=>document.getElementById('academyEmail')?.focus(),80)}function closeAuth(){authSection.hidden=true;document.body.classList.remove('auth-modal-open');if(window.location.hash==='#academy-auth')history.replaceState(null,'',window.location.pathname+window.location.search)}function continuePath(){closeAuth();document.getElementById('mod-h')?.scrollIntoView({behavior:'smooth',block:'start'})}function setMode(mode){authMode=mode;authTabs.forEach(tab=>tab.setAttribute('aria-selected',tab.dataset.authMode===mode?'true':'false'));authNameField.hidden=mode!=='signup';authPassword.autocomplete=mode==='signup'?'new-password':'current-password';authSubmit.textContent=mode==='signup'?'Tạo tài khoản':'Đăng nhập';setStatus('','')}async function getSession(){if(!supabase)return null;const{data}=await supabase.auth.getSession();return data.session||null}function renderSession(session){if(session?.user){authEmail.textContent=session.user.email||'Đã đăng nhập';authUser.style.display='block';authBox.style.display='none'}else{authUser.style.display='none';authBox.style.display='block'}}startButtons.forEach(btn=>btn.addEventListener('click',async e=>{e.preventDefault();if(!supabase){showAuth('Chưa cấu hình Supabase Auth trong môi trường này.');return}const session=await getSession();if(session)continuePath();else{renderSession(null);showAuth('Vui lòng đăng nhập hoặc tạo tài khoản trước khi bắt đầu học.')}}));authTabs.forEach(tab=>tab.addEventListener('click',()=>setMode(tab.dataset.authMode)));authClose.addEventListener('click',closeAuth);authSection.addEventListener('click',e=>{if(e.target===authSection)closeAuth()});document.addEventListener('keydown',e=>{if(e.key==='Escape'&&!authSection.hidden)closeAuth()});authForm.addEventListener('submit',async e=>{e.preventDefault();if(!supabase){setStatus('Chưa cấu hình Supabase Auth trong môi trường này.','err');return}const form=new FormData(authForm),email=String(form.get('email')||'').trim(),password=String(form.get('password')||''),name=String(form.get('name')||'').trim();if(!email||!password){setStatus('Nhập email và mật khẩu để tiếp tục.','err');return}authSubmit.disabled=true;setStatus(authMode==='signup'?'Đang tạo tài khoản...':'Đang đăng nhập...','');const result=authMode==='signup'?await supabase.auth.signUp({email,password,options:{data:{display_name:name}}}):await supabase.auth.signInWithPassword({email,password});authSubmit.disabled=false;if(result.error){setStatus(result.error.message||'Không thể xử lý tài khoản lúc này.','err');return}const session=result.data.session||await getSession();if(session){renderSession(session);setStatus('Đăng nhập thành công.','ok');setTimeout(continuePath,450)}else{setStatus('Tài khoản đã được tạo. Hãy kiểm tra email để xác nhận trước khi đăng nhập.','ok');setMode('login')}});document.getElementById('academyContinue')?.addEventListener('click',continuePath);document.getElementById('academySignOut')?.addEventListener('click',async()=>{if(supabase)await supabase.auth.signOut();renderSession(null);showAuth('Bạn đã đăng xuất.')});if(supabase){getSession().then(renderSession);supabase.auth.onAuthStateChange((_e,session)=>renderSession(session))}else setStatus('Chưa cấu hình Supabase Auth trong môi trường này.','err');if(window.location.hash==='#academy-auth'){authSection.hidden=false;document.body.classList.add('auth-modal-open');getSession().then(renderSession)}
</script></body></html>`;
}

fs.rmSync(outRoot, { recursive: true, force: true });
fs.mkdirSync(outRoot, { recursive: true });

for (const course of courses) {
  const dir = path.join(outRoot, course.id);
  fs.mkdirSync(dir, { recursive: true });
  fs.writeFileSync(path.join(dir, "index.html"), renderCourse(course), "utf8");
}

console.log(`Generated ${courses.length} academy path pages.`);
