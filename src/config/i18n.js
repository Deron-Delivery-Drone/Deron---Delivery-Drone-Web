export const SUPPORTED_LANGUAGES = ["vi", "en", "zh"];
const STORAGE_KEY = "deron-language";

export const translations = {
  vi: {
    nav: { home: "Trang chủ", mission: "Sứ mệnh", contact: "Liên hệ", download: "Tải DACTS" },
    heroTitle: "Hạ tầng drone nghiêm túc cho Việt Nam",
    heroBody: "Deron xây dựng nền tảng vận hành UAV và hệ thống điều phối DACTS cho các nhiệm vụ logistics, y tế, và ứng phó khẩn cấp.",
    requestTitle: "Yêu cầu liên kết tải DACTS",
    requestSubtitle: "Chúng tôi sẽ gửi liên kết tải tạm thời qua email sau khi xác nhận thông tin.",
    form: {
      fullName: "Họ và tên",
      email: "Email",
      phone: "Số điện thoại",
      companyName: "Tên công ty",
      industry: "Ngành",
      purposeOfUse: "Mục đích sử dụng",
      roleCategory: "Vai trò",
      selectedPlatform: "Nền tảng mục tiêu",
      submit: "Gửi yêu cầu tải",
      submitting: "Đang xử lý...",
      recommendation: "Hệ thống đề xuất",
      manual: "Bạn có thể đổi nền tảng nếu tải cho thiết bị khác.",
    },
    footer: "© 2026 Deron",
  },
  en: {
    nav: { home: "Home", mission: "Mission", contact: "Contact", download: "Download DACTS" },
    heroTitle: "Mission-grade drone infrastructure",
    heroBody: "Deron builds UAV operations and DACTS coordination software for logistics, emergency healthcare, and critical response missions.",
    requestTitle: "Request a DACTS download link",
    requestSubtitle: "We will send a temporary download link by email after validating your request.",
    form: {
      fullName: "Full name",
      email: "Email",
      phone: "Phone",
      companyName: "Company name",
      industry: "Industry",
      purposeOfUse: "Purpose of use",
      roleCategory: "Role category",
      selectedPlatform: "Target platform",
      submit: "Request download link",
      submitting: "Submitting...",
      recommendation: "Recommended platform",
      manual: "You can switch platforms if you are downloading for another device.",
    },
    footer: "© 2026 Deron",
  },
  zh: {
    nav: { home: "首页", mission: "使命", contact: "联系", download: "下载 DACTS" },
    heroTitle: "任务级无人机基础设施",
    heroBody: "Deron 正在构建用于物流、医疗应急和关键任务响应的 UAV 运营平台与 DACTS 调度系统。",
    requestTitle: "申请 DACTS 下载链接",
    requestSubtitle: "提交信息后，我们会通过邮件发送临时下载链接。",
    form: {
      fullName: "姓名",
      email: "邮箱",
      phone: "电话",
      companyName: "公司名称",
      industry: "行业",
      purposeOfUse: "使用目的",
      roleCategory: "角色类别",
      selectedPlatform: "目标平台",
      submit: "申请下载链接",
      submitting: "提交中...",
      recommendation: "系统推荐平台",
      manual: "如果你要给其他设备下载，可以手动切换平台。",
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
