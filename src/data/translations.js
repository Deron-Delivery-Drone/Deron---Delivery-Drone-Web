// src/data/translations.js
const translations = {
  vi: {
    languageName: "Việt Nam",
    nav: {
      home: "Trang Chủ",
      about: "Về Deron",
      news: "Tin Tức",
      investor: "Nhà Đầu Tư",
      contact: "Liên Hệ",
    },
    hero: {
      badge: "Tương lai logistics Việt Nam",
      title: "Chiến Dịch Điện Biên Phủ Trong Lĩnh Vực Logistics",
      subtitle:
        "Không chỉ giao hàng. Chúng tôi trao gửi hy vọng, sự sống và tri thức.",
      cta: "Khám phá Deron",
      metrics: [
        { value: "$42B", label: "Thị trường logistics VN 2025" },
        { value: "40-60%", label: "Nhanh hơn giao hàng truyền thống" },
        { value: "30-50%", label: "Giảm chi phí vận hành" },
      ],
    },
    about: {
      sectionLabel: "Về Deron",
      storyTitle: "Câu chuyện của chúng tôi",
      storyContent:
        "Ra đời từ niềm tin rằng bầu trời Việt Nam có thể phục vụ con người tốt hơn, Deron được thành lập bởi Nguyễn Phúc Huy — một người trẻ Việt Nam khát khao thay đổi hạ tầng logistics lạc hậu bằng công nghệ drone tự hành.",
      philosophyTitle: "Triết lý",
      philosophyContent:
        "Chúng tôi không nhập khẩu công nghệ rồi chắp vá. Chúng tôi xây dựng từ đầu — cho địa hình Việt Nam, thời tiết Việt Nam, con người Việt Nam. Mỗi sản phẩm là một lời cam kết: Made in Vietnam, Made for Vietnam.",
      products: [
        {
          name: "UAV Coaxial Octocopter",
          desc: "Tải trọng 7-15kg, tối ưu cho địa hình đô thị và vùng sâu vùng xa Việt Nam.",
        },
        {
          name: "AI Định tuyến Thông minh",
          desc: "Dẫn đường thích ứng thời tiết, địa hình và giao thông theo thời gian thực.",
        },
        {
          name: "Nền tảng Đa nhiệm vụ",
          desc: "Cấp cứu y tế, giao hàng thương mại, cứu trợ thiên tai — tất cả trong một.",
        },
      ],
    },
    news: {
      sectionLabel: "Tin Tức & Cập Nhật",
      title: "Tin tức từ Deron",
      loading: "Đang tải tin tức...",
      error: "Không tải được tin tức",
      empty: "Hiện chưa có bài viết nào được xuất bản.",
      open: "Xem chi tiết",
      tabs: {
        press: "Báo chí",
        expert: "Chuyên gia",
        updates: "Cập nhật",
      },
    },
    investor: {
      sectionLabel: "Nhà Đầu Tư",
      title: "Cơ hội Đầu tư",
      marketTitle: "Thị trường",
      marketDesc:
        "Logistics Việt Nam chiếm 16-20% GDP — gần gấp đôi các nước phát triển. Thị trường drone thương mại toàn cầu dự kiến đạt $54.6B vào 2030. Deron nắm bắt cơ hội tại giao điểm hai xu hướng này.",
      marketStats: [
        { value: "$42B", label: "Thị trường logistics VN" },
        { value: "16-20%", label: "Chi phí logistics/GDP" },
        { value: "$54.6B", label: "Drone thương mại 2030" },
      ],
      edgeTitle: "Lợi thế cạnh tranh",
      edges: [
        {
          title: "Thiết kế cho Việt Nam",
          desc: "Không phải công nghệ nhập khẩu chắp vá — xây dựng từ đầu cho địa hình, thời tiết và đô thị Việt Nam.",
        },
        {
          title: "Đội ngũ bản địa",
          desc: "Hiểu sâu thị trường, văn hóa kinh doanh và quy định pháp lý Việt Nam.",
        },
        {
          title: "Nền tảng đa nhiệm",
          desc: "Một nền tảng phục vụ y tế, thương mại, cứu trợ và khảo sát — đa dạng doanh thu.",
        },
      ],
      revenueTitle: "Mô hình doanh thu",
      revenueStreams: [
        { name: "Phí giao hàng mỗi chuyến", icon: "package" },
        { name: "Hợp đồng doanh nghiệp (SLA)", icon: "handshake" },
        { name: "Dịch vụ cứu trợ & y tế (B2G)", icon: "heart" },
        { name: "Dữ liệu bản đồ & khảo sát", icon: "map" },
      ],
      fundingTitle: "Giai đoạn gọi vốn",
      phases: [
        {
          name: "Pre-Seed (Hiện tại)",
          amount: "$150K - $300K",
          goals: [
            "Hoàn thiện nguyên mẫu UAV",
            "Xây dựng hệ thống điều phối",
            "Xin phép bay thử nghiệm",
          ],
        },
        {
          name: "Seed",
          amount: "$1M - $3M",
          goals: [
            "Ra mắt dịch vụ thương mại",
            "Mở trung tâm vận hành",
            "Mở rộng đội ngũ kỹ thuật",
          ],
        },
        {
          name: "Series A",
          amount: "$5M - $15M",
          goals: [
            "Triển khai toàn quốc",
            "Nội địa hóa phần cứng",
            "Mở rộng khu vực Đông Nam Á",
          ],
        },
      ],
      ctaTitle: "Tham gia cùng Deron",
      ctaDesc:
        "Không phải ai cũng có cơ hội đi đầu. Với Deron, bạn không chỉ đầu tư vào một startup — mà là góp phần mở cánh cửa cho một kỷ nguyên mới.",
      ctaButton: "Liên hệ đầu tư",
    },
    contact: {
      sectionLabel: "Liên Hệ",
      title: "Kết nối với Deron",
      investorFormTitle: "Nhà đầu tư",
      investorFormDesc: "Bạn muốn tìm hiểu cơ hội đầu tư?",
      partnerFormTitle: "Đối tác",
      partnerFormDesc: "Bạn muốn hợp tác kinh doanh hoặc công nghệ?",
      form: {
        name: "Họ tên",
        email: "Email",
        company: "Công ty / Tổ chức",
        message: "Lời nhắn",
        investorPlaceholder: "Cho chúng tôi biết về mối quan tâm đầu tư của bạn...",
        partnerPlaceholder: "Mô tả cơ hội hợp tác bạn quan tâm...",
        submit: "Gửi",
        sending: "Đang gửi...",
        success: "Cảm ơn! Chúng tôi sẽ phản hồi sớm nhất.",
        error: "Có lỗi xảy ra. Vui lòng thử lại.",
      },
      founderName: "Nguyễn Phúc Huy (Harry / 阿辉)",
      founderRole: "Founder & CEO",
      email: "ceo.deron@gmail.com",
      phone: "+84 363 045 747",
      website: "deron.vn",
    },
    footer: {
      copyright: "© 2025 Deron. Delivering Vietnam's future.",
      location: "Ho Chi Minh City, Vietnam",
    },
  },

  en: {
    languageName: "English",
    nav: {
      home: "Home",
      about: "About",
      news: "News",
      investor: "Investors",
      contact: "Contact",
    },
    hero: {
      badge: "Vietnam's Future of Logistics",
      title: "The Điện Biên Phủ of Logistics",
      subtitle:
        "We don't just deliver goods. We deliver hope, life, and knowledge.",
      cta: "Discover Deron",
      metrics: [
        { value: "$42B", label: "Vietnam logistics market 2025" },
        { value: "40-60%", label: "Faster than traditional delivery" },
        { value: "30-50%", label: "Operational cost reduction" },
      ],
    },
    about: {
      sectionLabel: "About Deron",
      storyTitle: "Our Story",
      storyContent:
        "Born from the belief that Vietnam's skies can serve its people better, Deron was founded by Nguyễn Phúc Huy — a young Vietnamese entrepreneur determined to transform outdated logistics infrastructure with autonomous drone technology.",
      philosophyTitle: "Our Philosophy",
      philosophyContent:
        "We don't import and adapt. We build from scratch — for Vietnamese terrain, Vietnamese weather, Vietnamese people. Every product is a commitment: Made in Vietnam, Made for Vietnam.",
      products: [
        {
          name: "Coaxial Octocopter UAV",
          desc: "7-15kg payload capacity, optimized for Vietnam's urban terrain and remote areas.",
        },
        {
          name: "AI-Powered Smart Routing",
          desc: "Adaptive navigation that understands weather, terrain, and traffic in real time.",
        },
        {
          name: "Multi-Mission Platform",
          desc: "Medical response, commercial delivery, disaster relief — all from one platform.",
        },
      ],
    },
    news: {
      sectionLabel: "News & Updates",
      title: "News from Deron",
      loading: "Loading news...",
      error: "Unable to load news",
      empty: "No published articles yet.",
      open: "Read more",
      tabs: {
        press: "Press",
        expert: "Expert",
        updates: "Updates",
      },
    },
    investor: {
      sectionLabel: "Investors",
      title: "Investment Opportunity",
      marketTitle: "The Market",
      marketDesc:
        "Vietnam's logistics costs 16-20% of GDP — nearly double that of developed nations. The global commercial drone market is projected to reach $54.6B by 2030. Deron captures opportunity at the intersection of these two megatrends.",
      marketStats: [
        { value: "$42B", label: "Vietnam logistics market" },
        { value: "16-20%", label: "Logistics cost / GDP" },
        { value: "$54.6B", label: "Commercial drones 2030" },
      ],
      edgeTitle: "Competitive Edge",
      edges: [
        {
          title: "Built for Vietnam",
          desc: "Not imported tech adapted — engineered from scratch for Vietnamese terrain, weather, and cities.",
        },
        {
          title: "Local Team",
          desc: "Deep understanding of the market, business culture, and regulatory landscape.",
        },
        {
          title: "Multi-Mission Platform",
          desc: "One platform serving medical, commercial, relief, and survey needs — diversified revenue.",
        },
      ],
      revenueTitle: "Revenue Model",
      revenueStreams: [
        { name: "Per-delivery fees", icon: "package" },
        { name: "Enterprise SLA contracts", icon: "handshake" },
        { name: "Relief & medical services (B2G)", icon: "heart" },
        { name: "Mapping & survey data", icon: "map" },
      ],
      fundingTitle: "Funding Stages",
      phases: [
        {
          name: "Pre-Seed (Current)",
          amount: "$150K - $300K",
          goals: [
            "Complete UAV prototype",
            "Build dispatch system",
            "Obtain test flight permits",
          ],
        },
        {
          name: "Seed",
          amount: "$1M - $3M",
          goals: [
            "Launch commercial service",
            "Open operational hubs",
            "Scale engineering team",
          ],
        },
        {
          name: "Series A",
          amount: "$5M - $15M",
          goals: [
            "National deployment",
            "Hardware localization",
            "Southeast Asia expansion",
          ],
        },
      ],
      ctaTitle: "Join Deron",
      ctaDesc:
        "Not everyone gets the chance to be first. With Deron, you're not just investing in a startup — you're helping open the door to a new era.",
      ctaButton: "Contact for Investment",
    },
    contact: {
      sectionLabel: "Contact",
      title: "Connect with Deron",
      investorFormTitle: "Investor",
      investorFormDesc: "Interested in investment opportunities?",
      partnerFormTitle: "Partner",
      partnerFormDesc: "Looking for business or tech collaboration?",
      form: {
        name: "Full Name",
        email: "Email",
        company: "Company / Organization",
        message: "Message",
        investorPlaceholder: "Tell us about your investment interest...",
        partnerPlaceholder: "Describe the partnership opportunity you're interested in...",
        submit: "Send",
        sending: "Sending...",
        success: "Thank you! We'll get back to you shortly.",
        error: "Something went wrong. Please try again.",
      },
      founderName: "Nguyễn Phúc Huy (Harry / 阿辉)",
      founderRole: "Founder & CEO",
      email: "ceo.deron@gmail.com",
      phone: "+84 363 045 747",
      website: "deron.vn",
    },
    footer: {
      copyright: "© 2025 Deron. Delivering Vietnam's future.",
      location: "Ho Chi Minh City, Vietnam",
    },
  },

  zh: {
    languageName: "中文",
    nav: {
      home: "首页",
      about: "关于",
      news: "新闻",
      investor: "投资者",
      contact: "联系",
    },
    hero: {
      badge: "越南物流的未来",
      title: "物流的奠边府时刻",
      subtitle: "我们递送的不只是货物，更是希望、生命与知识。",
      cta: "探索 Deron",
      metrics: [
        { value: "$42B", label: "越南物流市场 2025" },
        { value: "40-60%", label: "比传统配送更快" },
        { value: "30-50%", label: "运营成本降低" },
      ],
    },
    about: {
      sectionLabel: "关于 Deron",
      storyTitle: "我们的故事",
      storyContent:
        "Deron 诞生于一个信念：越南的天空可以更好地服务人民。创始人阮福辉（Nguyễn Phúc Huy）是一位年轻的越南创业者，决心用自主无人机技术改变落后的物流基础设施。",
      philosophyTitle: "我们的理念",
      philosophyContent:
        "我们不做引进再改造。我们从零开始构建——为越南的地形、越南的天气、越南的人民。每一款产品都是承诺：越南制造，为越南而造。",
      products: [
        {
          name: "同轴八旋翼无人机",
          desc: "7-15kg 载荷，针对越南城市地形和偏远地区优化。",
        },
        {
          name: "AI 智能路线规划",
          desc: "实时感知天气、地形与交通的自适应导航系统。",
        },
        {
          name: "多场景平台",
          desc: "医疗急救、商业配送、灾害救援——一站式解决方案。",
        },
      ],
    },
    news: {
      sectionLabel: "新闻与更新",
      title: "Deron 新闻",
      loading: "加载新闻中...",
      error: "无法获取新闻",
      empty: "尚未有发布的文章。",
      open: "查看详情",
      tabs: {
        press: "媒体报道",
        expert: "专家观点",
        updates: "最新动态",
      },
    },
    investor: {
      sectionLabel: "投资者",
      title: "投资机会",
      marketTitle: "市场概况",
      marketDesc:
        "越南物流成本占 GDP 的 16-20%——几乎是发达国家的两倍。全球商用无人机市场预计到 2030 年将达到 $54.6B。Deron 在这两大趋势的交汇点上把握机遇。",
      marketStats: [
        { value: "$42B", label: "越南物流市场" },
        { value: "16-20%", label: "物流成本占 GDP" },
        { value: "$54.6B", label: "商用无人机 2030" },
      ],
      edgeTitle: "竞争优势",
      edges: [
        {
          title: "为越南而生",
          desc: "不是进口技术的改装——从零为越南地形、天气和城市设计。",
        },
        {
          title: "本地团队",
          desc: "深入了解市场、商业文化和监管环境。",
        },
        {
          title: "多场景平台",
          desc: "一个平台服务医疗、商业、救援和勘测——多元化收入来源。",
        },
      ],
      revenueTitle: "收入模式",
      revenueStreams: [
        { name: "每次配送费", icon: "package" },
        { name: "企业 SLA 合同", icon: "handshake" },
        { name: "救援与医疗服务 (B2G)", icon: "heart" },
        { name: "测绘与勘测数据", icon: "map" },
      ],
      fundingTitle: "融资阶段",
      phases: [
        {
          name: "种子前轮（当前）",
          amount: "$150K - $300K",
          goals: ["完成无人机原型", "构建调度系统", "获取试飞许可"],
        },
        {
          name: "种子轮",
          amount: "$1M - $3M",
          goals: ["启动商业服务", "开设运营中心", "扩大工程团队"],
        },
        {
          name: "A 轮",
          amount: "$5M - $15M",
          goals: ["全国部署", "硬件本地化", "东南亚扩展"],
        },
      ],
      ctaTitle: "加入 Deron",
      ctaDesc:
        "不是每个人都有机会做第一个。与 Deron 一起，你不仅是在投资一家初创公司——而是在帮助开启一个新的时代。",
      ctaButton: "联系投资",
    },
    contact: {
      sectionLabel: "联系",
      title: "联系 Deron",
      investorFormTitle: "投资者",
      investorFormDesc: "对投资机会感兴趣？",
      partnerFormTitle: "合作伙伴",
      partnerFormDesc: "寻求商业或技术合作？",
      form: {
        name: "姓名",
        email: "邮箱",
        company: "公司 / 组织",
        message: "留言",
        investorPlaceholder: "请告诉我们您的投资兴趣...",
        partnerPlaceholder: "描述您感兴趣的合作机会...",
        submit: "发送",
        sending: "发送中...",
        success: "感谢！我们会尽快回复。",
        error: "出了点问题，请重试。",
      },
      founderName: "Nguyễn Phúc Huy (Harry / 阿辉)",
      founderRole: "创始人 & CEO",
      email: "ceo.deron@gmail.com",
      phone: "+84 363 045 747",
      website: "deron.vn",
    },
    footer: {
      copyright: "© 2025 Deron. Delivering Vietnam's future.",
      location: "胡志明市, 越南",
    },
  },
};

export default translations;
