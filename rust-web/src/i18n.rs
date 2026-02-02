#![allow(dead_code)]
/// Translations — exact copy of the translations object from App.js
/// Zero content change: every string is byte-identical to the original.

pub struct Translations {
    pub nav: Nav,
    pub hero: Hero,
    pub mission: Mission,
    pub technology: Technology,
    pub roadmap: Roadmap,
    pub news: News,
    pub contact: Contact,
}

pub struct Nav {
    pub home: &'static str,
    pub mission: &'static str,
    pub technology: &'static str,
    pub roadmap: &'static str,
    pub news: &'static str,
    pub contact: &'static str,
}

impl Nav {
    pub fn get(&self, key: &str) -> &'static str {
        match key {
            "home" => self.home,
            "mission" => self.mission,
            "technology" => self.technology,
            "roadmap" => self.roadmap,
            "news" => self.news,
            "contact" => self.contact,
            _ => "",
        }
    }
}

pub struct Hero {
    pub badge: &'static str,
    pub title: &'static str,
    pub subtitle: &'static str,
    pub cta: &'static str,
}

pub struct Stat {
    pub value: &'static str,
    pub label: &'static str,
}

pub struct Mission {
    pub title: &'static str,
    pub description: &'static str,
    pub stats: [Stat; 3],
}

pub struct TechItem {
    pub title: &'static str,
    pub description: &'static str,
}

pub struct Technology {
    pub title: &'static str,
    pub items: [TechItem; 3],
}

pub struct Phase {
    pub name: &'static str,
    pub period: &'static str,
    pub goals: Vec<&'static str>,
}

pub struct Roadmap {
    pub title: &'static str,
    pub phases: [Phase; 3],
}

pub struct News {
    pub title: &'static str,
    pub loading: &'static str,
    pub error: &'static str,
    pub empty: &'static str,
    pub open: &'static str,
}

pub struct Contact {
    pub headline: &'static str,
    pub cta: &'static str,
    pub founder: &'static str,
    pub email: &'static str,
    pub phone: &'static str,
    pub button: &'static str,
}

pub fn translations_vi() -> Translations {
    Translations {
        nav: Nav {
            home: "Trang chủ",
            mission: "Sứ mệnh",
            technology: "Công nghệ",
            roadmap: "Lộ trình",
            news: "Tin tức",
            contact: "Liên hệ",
        },
        hero: Hero {
            badge: "Tương lai logistics của Việt Nam",
            title: "Chiến Dịch Điện Biên Phủ Trong Lĩnh Vực Logistics",
            subtitle: "Không chỉ giao hàng. Chúng tôi trao gửi hy vọng, sự sống và tri thức.",
            cta: "Tham gia cùng Deron",
        },
        mission: Mission {
            title: "Cách mạng hóa giao hàng chặng cuối",
            description: "Deron khát vọng xây dựng hạ tầng vận tải hiện đại bằng cách khai thác bầu trời, phục vụ cấp cứu y tế, cứu trợ nhân đạo và giao nhận thương mại.",
            stats: [
                Stat { value: "40-60%", label: "Nhanh hơn" },
                Stat { value: "30-50%", label: "Giảm chi phí" },
                Stat { value: "95%", label: "Phủ sóng đô thị" },
            ],
        },
        technology: Technology {
            title: "Sinh ra cho Việt Nam",
            items: [
                TechItem {
                    title: "Hệ thống UAV tiên tiến",
                    description: "Máy bay coaxial octocopter tải 7-15kg, tối ưu cho địa hình và đô thị Việt Nam.",
                },
                TechItem {
                    title: "Định tuyến bằng AI",
                    description: "Dẫn đường thông minh thích ứng thời tiết, địa hình và giao thông theo thời gian thực.",
                },
                TechItem {
                    title: "Nền tảng đa nhiệm vụ",
                    description: "Cấp cứu y tế, giao hàng thương mại, cứu trợ thiên tai, khảo sát bản đồ - tất cả trong một nền tảng.",
                },
            ],
        },
        roadmap: Roadmap {
            title: "Chiến lược 3 giai đoạn",
            phases: [
                Phase {
                    name: "Giai đoạn 1: Mở đường Trường Sơn",
                    period: "0-12 tháng",
                    goals: vec!["Phát triển nguyên mẫu UAV", "Xây mô hình điều phối", "Xin phép bay", "Tìm nhà đầu tư thiên thần"],
                },
                Phase {
                    name: "Giai đoạn 2: Trận Điện Biên",
                    period: "12-24 tháng",
                    goals: vec!["Mở các trung tâm vận hành", "Mở rộng dịch vụ đa nhiệm", "Gọi vốn Seed", "Ký SLA thương mại"],
                },
                Phase {
                    name: "Giai đoạn 3: Xây lại hạ tầng logistics",
                    period: "24-60 tháng",
                    goals: vec!["Triển khai toàn quốc", "Nội địa hóa phần cứng", "Mở rộng khu vực", "Tích hợp thành nền tảng quốc gia"],
                },
            ],
        },
        news: News {
            title: "Tin tức & Cập nhật từ Deron",
            loading: "Đang tải tin tức...",
            error: "Không tải được tin tức",
            empty: "Hiện chưa có bài viết nào được xuất bản.",
            open: "Xem chi tiết",
        },
        contact: Contact {
            headline: "Cùng xây dựng tương lai",
            cta: "Tham gia cách mạng logistics Việt Nam",
            founder: "Nguyễn Phúc Huy (Harry / 阿辉)",
            email: "ceo.deron@gmail.com",
            phone: "+84 363 045 747",
            button: "Liên hệ ngay",
        },
    }
}

pub fn translations_en() -> Translations {
    Translations {
        nav: Nav {
            home: "Home",
            mission: "Mission",
            technology: "Technology",
            roadmap: "Roadmap",
            news: "News",
            contact: "Contact",
        },
        hero: Hero {
            badge: "Vietnam's Future of Logistics",
            title: "The Điện Biên Phủ of Logistics",
            subtitle: "We don't just deliver goods. We deliver hope, life, and knowledge.",
            cta: "Join Our Mission",
        },
        mission: Mission {
            title: "Revolutionizing Last-Mile Delivery",
            description: "Deron aims to build modern transportation infrastructure by using airspace for medical, humanitarian, and commercial delivery.",
            stats: [
                Stat { value: "40-60%", label: "Faster Delivery" },
                Stat { value: "30-50%", label: "Cost Reduction" },
                Stat { value: "95%", label: "Urban Coverage" },
            ],
        },
        technology: Technology {
            title: "Built for Vietnam",
            items: [
                TechItem {
                    title: "Advanced UAV System",
                    description: "Coaxial octocopter with 7-15kg payload capacity optimized for Vietnam.",
                },
                TechItem {
                    title: "AI-Powered Routing",
                    description: "Adaptive navigation that understands weather, terrain, and traffic in real time.",
                },
                TechItem {
                    title: "Multi-Mission Platform",
                    description: "Medical response, commercial delivery, disaster relief, and mapping from one platform.",
                },
            ],
        },
        roadmap: Roadmap {
            title: "Three-Phase Strategy",
            phases: [
                Phase {
                    name: "Phase 1: Opening the Trường Sơn Road",
                    period: "0-12 months",
                    goals: vec!["Develop UAV prototype", "Build traffic control model", "Obtain flight permits", "Find Angel Partners"],
                },
                Phase {
                    name: "Phase 2: The Điện Biên Battle",
                    period: "12-24 months",
                    goals: vec!["Launch operational hubs", "Expand multi-mission services", "Secure Seed funding", "Sign commercial SLAs"],
                },
                Phase {
                    name: "Phase 3: Rebuilding Vietnam's Logistics",
                    period: "24-60 months",
                    goals: vec!["National deployment", "Hardware localization", "Regional expansion", "Integrated national platform"],
                },
            ],
        },
        news: News {
            title: "News & Updates from Deron",
            loading: "Loading news...",
            error: "Unable to load news",
            empty: "No published articles yet.",
            open: "Open story",
        },
        contact: Contact {
            headline: "Let's Build the Future Together",
            cta: "Join us in revolutionizing Vietnam's logistics infrastructure",
            founder: "Nguyễn Phúc Huy (Harry / 阿辉)",
            email: "ceo.deron@gmail.com",
            phone: "+84 363 045 747",
            button: "Get in Touch",
        },
    }
}

pub fn translations_zh() -> Translations {
    Translations {
        nav: Nav {
            home: "首页",
            mission: "使命",
            technology: "技术",
            roadmap: "路线图",
            news: "新闻",
            contact: "联系",
        },
        hero: Hero {
            badge: "越南物流的未来",
            title: "物流的奠边府时刻",
            subtitle: "我们递送的不只是货物，更是希望、生命与知识。",
            cta: "加入 Deron",
        },
        mission: Mission {
            title: "革新末端配送",
            description: "Deron 通过利用空域打造现代交通基础设施，服务医疗救援、人道救助与商业配送。",
            stats: [
                Stat { value: "40-60%", label: "配送更快" },
                Stat { value: "30-50%", label: "成本降低" },
                Stat { value: "95%", label: "覆盖城市" },
            ],
        },
        technology: Technology {
            title: "为越南而生",
            items: [
                TechItem {
                    title: "先进无人机系统",
                    description: "7-15kg 载荷的同轴八旋翼，针对越南地形与城市优化。",
                },
                TechItem {
                    title: "AI 智能路线",
                    description: "实时理解天气、地形与交通的智能导航。",
                },
                TechItem {
                    title: "多场景平台",
                    description: "医疗急救、商业配送、灾害救援、测绘勘探，一站式平台。",
                },
            ],
        },
        roadmap: Roadmap {
            title: "三阶段战略",
            phases: [
                Phase {
                    name: "阶段一：开启长山路",
                    period: "0-12 个月",
                    goals: vec!["开发 UAV 原型", "建设调度模型", "获取飞行许可", "寻找天使投资"],
                },
                Phase {
                    name: "阶段二：奠边之战",
                    period: "12-24 个月",
                    goals: vec!["启动运营中心", "扩展多场景服务", "完成种子轮融资", "签订商业 SLA"],
                },
                Phase {
                    name: "阶段三：重塑物流基础设施",
                    period: "24-60 个月",
                    goals: vec!["全国落地", "硬件本地化", "区域拓展", "打造国家级平台"],
                },
            ],
        },
        news: News {
            title: "Deron 新闻与更新",
            loading: "加载新闻中...",
            error: "无法获取新闻",
            empty: "尚未有发布的文章。",
            open: "查看详情",
        },
        contact: Contact {
            headline: "一起构建未来",
            cta: "加入我们，共同革新越南物流基础设施",
            founder: "Nguyễn Phúc Huy (Harry / 阿辉)",
            email: "ceo.deron@gmail.com",
            phone: "+84 363 045 747",
            button: "立即联系",
        },
    }
}
