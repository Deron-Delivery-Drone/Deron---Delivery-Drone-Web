export const SUPPORTED_LANGUAGES = ["vi", "en", "zh"];
const STORAGE_KEY = "deron-language";

export const translations = {
  vi: {
    nav: {
      home: "Trang chủ",
      mission: "Sứ mệnh",
      contact: "Liên hệ",
      download: "Tải DACTS",
    },
    heroTitle: "Hạ tầng drone nghiêm túc cho Việt Nam",
    heroBody:
      "Deron xây dựng nền tảng vận hành UAV và hệ thống điều phối DACTS cho các nhiệm vụ logistics, y tế, và ứng phó khẩn cấp.",
    requestTitle: "Yêu cầu cài đặt DACTS",
    requestSubtitle: "Chúng tôi sẽ gửi link tải qua email.",
    success1: "Chúng tôi sẽ gửi link tải qua email.",
    success2: "Liên kết có hiệu lực trong 72 giờ.",
    dacts: {
      title: "DACTS — Hệ thống điều phối và điều hành UAV của Deron",
      subtitle:
        "DACTS là nền tảng vận hành dành cho nhiệm vụ UAV nghiêm túc tại Việt Nam — từ giám sát chuyến bay, quản lý thiết bị, điều phối nhiệm vụ, đến mở rộng cho hạ tầng UTM trong tương lai.",
      highlights: [
        "Giao diện điều hành tập trung",
        "Thiết kế cho vận hành UAV thực tế",
        "Chuẩn bị cho GCS + UTM workflow",
        "Tích hợp phân phối ứng dụng theo nền tảng",
        "Phục vụ logistics, y tế, cứu trợ và nhiệm vụ đặc thù",
      ],
      valueTitle: "Giá trị cốt lõi",
      valueBody:
        "Rút ngắn thời gian ra quyết định tác chiến, tăng độ tin cậy vận hành, và chuẩn hoá quy trình triển khai UAV trong bối cảnh nhiệm vụ thực tế.",
      missionFitTitle: "Phù hợp nhiệm vụ tại Việt Nam",
      missionFitBody:
        "DACTS được thiết kế cho mission profile thực địa: từ vận chuyển y tế, logistics tầm thấp, đến ứng phó khẩn cấp và điều phối đa đội bay.",
      subnav: {
        overview: "Tổng quan",
        features: "Tính năng",
        platforms: "Nền tảng",
        security: "Bảo mật",
        install: "Cài đặt",
      },
      featuresTitle: "Năng lực chính",
      featureCards: [
        {
          title: "Mission control",
          body: "Điều phối luồng nhiệm vụ UAV theo khu vực, mức độ ưu tiên và trạng thái chuyến bay theo thời gian thực.",
        },
        {
          title: "Fleet overview",
          body: "Theo dõi toàn bộ drone, trạm mặt đất và tài nguyên vận hành trong một không gian điều hành thống nhất.",
        },
        {
          title: "Device/session awareness",
          body: "Nhận biết thiết bị truy cập, phiên vận hành và điều kiện môi trường để giảm sai lệch khi triển khai nhiệm vụ.",
        },
        {
          title: "Platform-aware distribution",
          body: "Tự động gợi ý bản cài đặt theo nền tảng, đồng thời cho phép chọn thủ công khi cần phân phối chéo thiết bị.",
        },
        {
          title: "Request-based secure access",
          body: "Quy trình tải có xác thực yêu cầu và ghi nhận thông tin vận hành, phù hợp môi trường triển khai nghiêm túc.",
        },
        {
          title: "Future-ready GCS/UTM architecture",
          body: "Kiến trúc mở rộng cho quy trình GCS hiện tại và tích hợp dần vào hệ sinh thái UTM của Deron.",
        },
      ],
      platformsTitle: "Platform availability",
      detectedLabel: "Nền tảng hệ thống phát hiện",
      selectedLabel: "Nền tảng bạn chọn",
      noneSelected: "Chưa chọn",
      securityTitle: "Security / Distribution",
      securityPoints: [
        "Truy cập theo cơ chế request-based để kiểm soát phân phối theo đối tượng vận hành.",
        "Liên kết tải được gửi qua email sau khi xác nhận yêu cầu.",
        "Liên kết có hiệu lực trong 72 giờ để giảm rủi ro chia sẻ ngoài luồng.",
        "Phân phối theo nền tảng giúp đúng bản cài đặt cho từng thiết bị.",
        "Phù hợp mô hình phân phối nội bộ, pilot có kiểm soát và pre-release.",
      ],
      finalCtaTitle: "Sẵn sàng triển khai DACTS cho hạ tầng UAV của bạn?",
      finalCtaBody:
        "Bắt đầu bằng yêu cầu cài đặt chính thức để Deron gửi đúng bản phân phối và đồng hành theo bối cảnh vận hành thực tế.",
      stickyLabel: "Cài đặt DACTS",
      stickyTitle: "Sẵn sàng nhận bản phân phối phù hợp?",
      stickyBody: "Yêu cầu cài đặt để Deron gửi đúng phiên bản cho nền tảng vận hành của bạn.",
      mobileStickyInstall: "Cài đặt DACTS",
    },
    form: {
      fullName: "Họ và tên",
      email: "Email",
      phone: "Số điện thoại",
      companyName: "Tên công ty",
      jobTitle: "Chức danh / vai trò",
      industry: "Ngành / lĩnh vực",
      country: "Quốc gia",
      useCase: "Thông điệp / nhu cầu (tuỳ chọn)",
      selectedPlatform: "Nền tảng mục tiêu",
      submit: "Gửi yêu cầu tải",
      submitting: "Đang xử lý...",
      recommendation: "Hệ thống đề xuất",
      manual: "Bạn có thể đổi nền tảng nếu tải cho thiết bị khác.",
      close: "Đóng",
    },
    footer: "© 2026 Deron",
  },
  en: {
    nav: { home: "Home", mission: "Mission", contact: "Contact", download: "Download DACTS" },
    heroTitle: "Mission-grade drone infrastructure",
    heroBody:
      "Deron builds UAV operations and DACTS coordination software for logistics, emergency healthcare, and critical response missions.",
    requestTitle: "Request DACTS installation",
    requestSubtitle: "Chúng tôi sẽ gửi link tải qua email.",
    success1: "Chúng tôi sẽ gửi link tải qua email.",
    success2: "Liên kết có hiệu lực trong 72 giờ.",
    dacts: {
      title: "DACTS — Deron UAV Operations Coordination System",
      subtitle:
        "DACTS is an operations platform for mission-critical UAV deployments in Vietnam, covering flight supervision, device management, mission coordination, and future UTM expansion.",
      highlights: [
        "Centralized operations interface",
        "Built for real-world UAV operations",
        "Prepared for GCS + UTM workflows",
        "Platform-aware app distribution",
        "Supports logistics, healthcare, relief, and special missions",
      ],
      valueTitle: "Core value",
      valueBody:
        "Reduce mission decision latency, improve operational reliability, and standardize UAV deployment workflows for production environments.",
      missionFitTitle: "Mission fit for Vietnam",
      missionFitBody:
        "DACTS is tailored for real mission profiles in Vietnam, from emergency healthcare transport and low-altitude logistics to multi-team critical response coordination.",
      subnav: {
        overview: "Overview",
        features: "Features",
        platforms: "Platforms",
        security: "Security",
        install: "Install",
      },
      featuresTitle: "Core capabilities",
      featureCards: [
        {
          title: "Mission control",
          body: "Coordinate UAV missions by geography, priority, and real-time mission status in one control surface.",
        },
        {
          title: "Fleet overview",
          body: "Monitor drones, ground systems, and operations assets through a unified fleet perspective.",
        },
        {
          title: "Device/session awareness",
          body: "Track devices, active sessions, and environment contexts to reduce execution risks.",
        },
        {
          title: "Platform-aware distribution",
          body: "Recommend the correct installer by platform while allowing manual override for cross-device distribution.",
        },
        {
          title: "Request-based secure access",
          body: "Use a validated request workflow for controlled software access in serious deployment environments.",
        },
        {
          title: "Future-ready GCS/UTM architecture",
          body: "Architecture is designed for current GCS operations and future integration into Deron UTM workflows.",
        },
      ],
      platformsTitle: "Platform availability",
      detectedLabel: "Detected platform",
      selectedLabel: "Selected platform",
      noneSelected: "Not selected",
      securityTitle: "Security / Distribution",
      securityPoints: [
        "Access is managed through a request-based process for controlled distribution.",
        "Download links are delivered by email after request validation.",
        "Each link is valid for 72 hours to limit unmanaged forwarding.",
        "Distribution is platform-aware to reduce installer mismatches.",
        "Supports controlled internal and pre-release rollout models.",
      ],
      finalCtaTitle: "Ready to deploy DACTS in your UAV operations stack?",
      finalCtaBody:
        "Submit an installation request so Deron can provide the right build and support your operational context.",
      stickyLabel: "Install DACTS",
      stickyTitle: "Get the right build for your operations",
      stickyBody: "Use the install request flow to receive the correct DACTS distribution for your target platform.",
      mobileStickyInstall: "Install DACTS",
    },
    form: {
      fullName: "Full name",
      email: "Email",
      phone: "Phone",
      companyName: "Company name",
      jobTitle: "Job title / role",
      industry: "Industry / field",
      country: "Country",
      useCase: "Message / use case (optional)",
      selectedPlatform: "Target platform",
      submit: "Request download link",
      submitting: "Submitting...",
      recommendation: "Recommended platform",
      manual: "You can switch platforms if you are downloading for another device.",
      close: "Close",
    },
    footer: "© 2026 Deron",
  },
  zh: {
    nav: { home: "首页", mission: "使命", contact: "联系", download: "下载 DACTS" },
    heroTitle: "任务级无人机基础设施",
    heroBody: "Deron 正在构建用于物流、医疗应急和关键任务响应的 UAV 运营平台与 DACTS 调度系统。",
    requestTitle: "申请安装 DACTS",
    requestSubtitle: "Chúng tôi sẽ gửi link tải qua email.",
    success1: "Chúng tôi sẽ gửi link tải qua email.",
    success2: "Liên kết có hiệu lực trong 72 giờ.",
    dacts: {
      title: "DACTS — Deron 无人机调度与运营系统",
      subtitle:
        "DACTS 面向越南严肃的 UAV 任务运营，覆盖飞行监控、设备管理、任务调度，并为未来 UTM 基础设施扩展做好准备。",
      highlights: [
        "集中式运营控制界面",
        "为真实 UAV 运营而设计",
        "面向 GCS + UTM 工作流准备",
        "按平台分发应用",
        "服务物流、医疗、救援与特种任务",
      ],
      valueTitle: "核心价值",
      valueBody: "缩短任务决策链路、提升运营可靠性，并将 UAV 部署流程标准化到可规模化执行。",
      missionFitTitle: "贴合越南任务场景",
      missionFitBody:
        "DACTS 面向越南现实任务环境设计，可覆盖医疗运输、低空物流、应急响应及多机队协同调度。",
      subnav: {
        overview: "Overview",
        features: "Features",
        platforms: "Platforms",
        security: "Security",
        install: "Install",
      },
      featuresTitle: "核心能力",
      featureCards: [
        {
          title: "Mission control",
          body: "基于区域、优先级和实时状态调度 UAV 任务。",
        },
        {
          title: "Fleet overview",
          body: "统一查看无人机、地面系统和运营资产状态。",
        },
        {
          title: "Device/session awareness",
          body: "感知设备与会话上下文，降低执行偏差。",
        },
        {
          title: "Platform-aware distribution",
          body: "自动推荐平台安装包，并支持手动覆盖。",
        },
        {
          title: "Request-based secure access",
          body: "通过申请验证流程进行受控分发。",
        },
        {
          title: "Future-ready GCS/UTM architecture",
          body: "架构支持现有 GCS 并可扩展到 UTM。",
        },
      ],
      platformsTitle: "平台可用性",
      detectedLabel: "系统检测平台",
      selectedLabel: "当前选择平台",
      noneSelected: "未选择",
      securityTitle: "安全 / 分发",
      securityPoints: [
        "通过请求审核机制实现受控访问。",
        "下载链接将在验证后通过邮件发送。",
        "链接 72 小时内有效。",
        "按平台精准分发，降低安装错误。",
        "支持内部与预发布受控分发。",
      ],
      finalCtaTitle: "准备好部署 DACTS 吗？",
      finalCtaBody: "提交安装请求，Deron 将按你的运营场景提供对应版本。",
      stickyLabel: "安装 DACTS",
      stickyTitle: "获取匹配你场景的版本",
      stickyBody: "通过安装申请流程获取与你的目标平台匹配的 DACTS 分发版本。",
      mobileStickyInstall: "安装 DACTS",
    },
    form: {
      fullName: "姓名",
      email: "邮箱",
      phone: "电话",
      companyName: "公司名称",
      jobTitle: "职位 / 角色",
      industry: "行业 / 领域",
      country: "国家",
      useCase: "留言 / 用例（可选）",
      selectedPlatform: "目标平台",
      submit: "申请下载链接",
      submitting: "提交中...",
      recommendation: "系统推荐平台",
      manual: "如果你要给其他设备下载，可以手动切换平台。",
      close: "关闭",
    },
    footer: "© 2026 Deron",
  },
};

export function detectInitialLanguage() {
  const saved = localStorage.getItem(STORAGE_KEY);
  if (saved && SUPPORTED_LANGUAGES.includes(saved)) return saved;

  const locale = (navigator.language || "en").toLowerCase();
  if (locale.startsWith("vi")) return "vi";
  if (locale.startsWith("zh")) return "zh";
  return "en";
}

export function setLanguagePreference(language) {
  if (SUPPORTED_LANGUAGES.includes(language)) {
    localStorage.setItem(STORAGE_KEY, language);
  }
}
