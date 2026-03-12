import React, { useEffect, useState } from "react";

const applicationsContent = {
  vi: {
    hero: {
      eyebrow: "ỨNG DỤNG",
      titleLine1: "Một bầu trời.",
      titleLine2: "Nhiều khả năng.",
      intro: "Drone không chỉ là một thiết bị bay. Đó là một lớp hạ tầng mới cho vận chuyển, phản ứng khẩn cấp và quản lý không gian tầm thấp.\n\nTại Việt Nam, UAV đã bắt đầu đi vào ứng dụng thực tế trong y tế, logistics, nông nghiệp, kiểm tra hạ tầng, cứu trợ thiên tai và an ninh. Deron được xây dựng để phục vụ những bài toán quan trọng nhất của xã hội — nơi tốc độ, khả năng tiếp cận và độ tin cậy quyết định hiệu quả."
    },
    stats: [
      { value: "60 km/h", label: "Tốc độ hành trình UAV y tế thí điểm" },
      { value: "15 km", label: "Bán kính hoạt động thí điểm ban đầu" },
      { value: "3.000+", label: "Drone nông nghiệp đã hoạt động tại Việt Nam" },
      { value: "1,5 triệu ha", label: "Diện tích nông nghiệp đã được phục vụ bởi UAV" },
      { value: "1 giờ = 3 ngày", label: "Hiệu suất kiểm tra lưới điện bằng UAV so với thủ công" },
      { value: "200+", label: "Lượt vận chuyển cứu trợ bằng drone trong 2 ngày" }
    ],
    cards: [
      {
        title: "Logistics tầm thấp",
        body: "Một tuyến vận chuyển mới đang hình thành. Từ kho trung chuyển đến điểm giao cuối. Qua đô thị, vùng xa, khu công nghiệp và các tuyến nước ngắn.\n\nTP.HCM đã bắt đầu sandbox và bay thử UAV giao hàng trong điều kiện thực tế. Deron tập trung vào đoạn khó nhất của chuỗi cung ứng: last-mile logistics.",
        bullets: ["Giao hàng chặng ngắn", "Kết nối kho trung chuyển", "Giao nhận điểm cuối", "Mở rộng sang đảo và vùng nước"]
      },
      {
        title: "Y tế khẩn cấp",
        body: "Khi từng phút đều quan trọng. Drone có thể rút ngắn thời gian vận chuyển thuốc, mẫu xét nghiệm, vật tư và thiết bị y tế giữa bệnh viện, trung tâm y tế và trạm y tế vùng xa.\n\nBệnh viện Đức Giang là cơ sở đầu tiên tại Việt Nam thí điểm UAV vận chuyển vật tư y tế, với tốc độ hành trình khoảng 60 km/h, bán kính hoạt động 15 km và mục tiêu nâng dần tầm bay lên khoảng 20 km, tải trọng khoảng 10 kg.",
        bullets: ["Thuốc cấp cứu", "Mẫu xét nghiệm", "Vật tư y tế", "Container y tế nhẹ"]
      },
      {
        title: "Cứu trợ thiên tai",
        body: "Khi đường bộ bị chia cắt, bầu trời trở thành tuyến tiếp cận đầu tiên. Drone có thể đưa nước uống, thuốc, nhu yếu phẩm và dữ liệu hiện trường vào những khu vực bị cô lập.\n\nTrong mưa lũ, drone đã được sử dụng để vận chuyển hàng cứu trợ và dẫn đường cho thuyền cứu hộ; chỉ trong hai ngày 8–9/10, đã có hơn 200 lượt vận chuyển và 30 lượt dẫn đường bằng drone.",
        bullets: ["Nhu yếu phẩm khẩn cấp", "Thuốc và nước sạch", "Trinh sát hiện trường", "Dẫn đường cứu hộ"]
      },
      {
        title: "Nông nghiệp thông minh",
        body: "Drone đang thay đổi cách Việt Nam canh tác. Từ phun thuốc chính xác đến giám sát sức khỏe cây trồng và số hóa cánh đồng.\n\nHiện Việt Nam đã có hơn 3.000 drone nông nghiệp hoạt động, phục vụ khoảng 1,5 triệu ha. Một UAV có thể xử lý khoảng 67 ha/ngày, trong khi lao động thủ công thường chỉ khoảng 1 ha/ngày.",
        bullets: ["Phun chính xác", "Giám sát sâu bệnh", "Bản đồ cánh đồng", "Tăng năng suất"]
      },
      {
        title: "Hạ tầng & năng lượng",
        body: "Kiểm tra những hệ thống không thể dừng lại. Từ lưới điện truyền tải đến công trình hạ tầng lớn, drone cho phép kiểm tra nhanh hơn, an toàn hơn và chính xác hơn.\n\nTrong ngành điện, 1 giờ kiểm tra bằng UAV có thể tương đương 3 ngày kiểm tra thủ công.",
        bullets: ["Đường dây điện", "Trạm biến áp", "Công trình năng lượng", "Giảm rủi ro cho kỹ sư"]
      },
      {
        title: "Xây dựng & bản đồ 3D",
        body: "Biến công trường thành dữ liệu. Drone cho phép khảo sát địa hình, tạo mô hình 3D, theo dõi tiến độ và đối chiếu thi công với thiết kế.\n\nĐây là lớp công nghệ giúp dự án minh bạch hơn, nhanh hơn và kiểm soát tốt hơn.",
        bullets: ["Survey địa hình", "Mô hình 3D", "Theo dõi tiến độ", "Kiểm soát sai lệch"]
      },
      {
        title: "Môi trường & tài nguyên",
        body: "Nhìn thấy hệ sinh thái từ trên cao. Drone có thể hỗ trợ giám sát rừng, mặt nước, vùng nuôi trồng và các khu vực nhạy cảm về môi trường.\n\nMột góc nhìn mới cho dữ liệu môi trường.",
        bullets: ["Giám sát rừng", "Theo dõi mặt nước", "Quản lý tài nguyên", "Quan sát diện rộng"]
      },
      {
        title: "An ninh & tuần tra",
        body: "Một góc nhìn mới cho an ninh hiện đại. Drone có thể hỗ trợ tuần tra, giám sát khu vực nhạy cảm và tăng tốc độ phản ứng tình huống.\n\nTP.HCM đã tổ chức khảo sát và điều khiển thử nghiệm UAV cho mục tiêu hỗ trợ phòng ngừa tội phạm, với định hướng giảm rủi ro và tiết kiệm nguồn lực cho lực lượng chức năng.",
        bullets: ["Tuần tra", "Giám sát điểm nóng", "Quan sát thời gian thực", "Hỗ trợ phản ứng nhanh"]
      }
    ],
    scenarios: {
      eyebrow: "KỊCH BẢN THỰC TẾ",
      title: "Những bài toán Việt Nam đang thật sự cần giải.",
      intro: "Deron không được xây dựng cho những tình huống giả định xa rời thực tế. Nó được thiết kế cho những bối cảnh mà Việt Nam đã và đang đối mặt: vận chuyển y tế khẩn cấp, giao hàng bằng UAV tại đô thị, cứu trợ khi lũ chia cắt, và triển khai hạ tầng không gian tầm thấp trong điều kiện thực tế.",
      tabs: [
        {
          label: "Y tế khẩn cấp",
          badge: "TÌNH HUỐNG THỰC TẾ",
          title: "Vật tư y tế cần đến nhanh hơn.",
          body: "Tại Hà Nội, Bệnh viện Đức Giang đã chính thức thí điểm ứng dụng UAV vận chuyển vật tư y tế giữa các cơ sở điều trị. Thiết bị bay có tốc độ hành trình tới 60 km/h, bán kính hoạt động khoảng 15 km, tích hợp camera giám sát theo thời gian thực và được định hướng nâng dần lên tầm bay 20 km với tải trọng phù hợp vận chuyển y tế khoảng 10 kg.",
          solves: "Deron hướng tới mô hình kết nối bệnh viện – trung tâm y tế – trạm y tế, để thuốc, mẫu xét nghiệm và vật tư quan trọng không còn phụ thuộc hoàn toàn vào giao thông mặt đất."
        },
        {
          label: "Logistics đô thị",
          badge: "SANDBOX THỰC TẾ",
          title: "TP.HCM đã bắt đầu mở đường cho giao hàng bằng drone.",
          body: "Tại TP.HCM, chương trình thử nghiệm UAV giao hàng được triển khai với sự phối hợp giữa Sở Khoa học và Công nghệ, Ban quản lý Khu công nghệ cao và doanh nghiệp công nghệ trong nước. Thành phố tiếp tục mở rộng thử nghiệm với chặng bay dài hơn và các kịch bản vận hành phức tạp hơn như mưa, gió mạnh, mất tín hiệu điều khiển và sự cố kỹ thuật.",
          solves: "Deron tập trung vào logistics tầm thấp có kiểm soát: giao hàng chặng ngắn, kết nối kho trung chuyển và xây nền cho hạ tầng vận chuyển trên không trong đô thị."
        },
        {
          label: "Cứu trợ thiên tai",
          badge: "MƯA LŨ THỰC ĐỊA",
          title: "Khi drone trở thành đôi cánh cứu sinh.",
          body: "Trong mưa lũ, drone đã được dùng để vận chuyển nhu yếu phẩm và xác định tọa độ an toàn để lực lượng tại chỗ tiếp cận điểm ứng cứu. Chỉ trong hai ngày 8 và 9-10, đã có hơn 200 lượt vận chuyển và 30 lượt dẫn đường bằng drone; tải trọng tối đa khoảng 50 kg, tầm bay 5 km, độ cao 100 m và sai số khoảng 10 cm.",
          solves: "Deron được định vị như lớp tiếp cận đầu tiên khi cầu đường đứt gãy: trinh sát nhanh, dẫn đường, đưa nhu yếu phẩm và vật tư khẩn cấp vào nơi khó tiếp cận nhất."
        },
        {
          label: "Nông nghiệp & hạ tầng",
          badge: "HIỆU QUẢ ĐÃ ĐƯỢC CHỨNG MINH",
          title: "Khi dữ liệu từ trên cao tạo ra chênh lệch thật.",
          body: "Việt Nam đã có hơn 3.000 drone nông nghiệp phục vụ khoảng 1,5 triệu ha. Trong khi đó, ở ngành điện, 1 giờ kiểm tra bằng UAV có thể tương đương 3 ngày kiểm tra thủ công. Đây không còn là trình diễn công nghệ — mà là năng suất thật.",
          solves: "Dù Deron lấy logistics, y tế và cứu trợ làm trọng tâm, cùng một nền tảng hạ tầng bay vẫn có thể mở rộng sang nông nghiệp số, giám sát hạ tầng và các tác vụ công ích quy mô lớn."
        }
      ]
    },
    closing: {
      title: "Bầu trời đang trở thành hạ tầng mới.",
      body: "Drone đang mở ra những cách tiếp cận mới cho vận chuyển, y tế, cứu trợ, hạ tầng và dữ liệu. Deron đang xây dựng hệ thống đó cho Việt Nam.",
      primaryCta: "Khám phá sứ mệnh",
      secondaryCta: "Dành cho nhà đầu tư"
    }
  },

  en: {
    hero: {
      eyebrow: "APPLICATIONS",
      titleLine1: "One Sky.",
      titleLine2: "Many Possibilities.",
      intro: "A drone is not just an aircraft. It is a new layer of infrastructure for transport, emergency response, and low-altitude operations.\n\nIn Vietnam, UAVs are already entering real-world use in healthcare, logistics, agriculture, infrastructure inspection, disaster response, and security. Deron is being built for the missions that matter most — where speed, accessibility, and reliability define the outcome."
    },
    stats: [
      { value: "60 km/h", label: "Cruise speed in Vietnam’s medical drone pilot" },
      { value: "15 km", label: "Initial operating radius" },
      { value: "3,000+", label: "Agricultural drones already deployed in Vietnam" },
      { value: "1.5 million hectares", label: "Farmland already served by UAVs" },
      { value: "1 hour = 3 days", label: "UAV inspection efficiency vs. manual power-line checks" },
      { value: "200+", label: "Relief delivery flights in 2 days" }
    ],
    cards: [
      {
        title: "Low-altitude logistics",
        body: "A new delivery route is taking shape. From hub to final destination. Across cities, remote areas, industrial zones, and short water routes.\n\nHo Chi Minh City has already begun sandbox testing and real-world drone delivery trials. Deron focuses on the hardest part of the supply chain: the last mile.",
        bullets: ["Short-range delivery", "Hub connection", "Final-mile handoff", "Expansion to islands and waterways"]
      },
      {
        title: "Emergency healthcare",
        body: "When every minute matters. Drones can shorten the delivery time for medicine, lab samples, medical supplies, and lightweight emergency equipment between hospitals, medical centers, and remote clinics.\n\nDuc Giang General Hospital became the first hospital in Vietnam to pilot UAV medical transport, with around 60 km/h cruise speed, a 15 km operating radius, and a future target of around 20 km and about 10 kg of suitable medical payload.",
        bullets: ["Emergency medicine", "Lab samples", "Medical supplies", "Lightweight medical payloads"]
      },
      {
        title: "Disaster response",
        body: "When roads are cut off, the sky becomes the first access route. Drones can bring water, medicine, emergency supplies, and field intelligence into isolated areas.\n\nDuring recent flooding, drones were used for relief delivery and rescue guidance, with more than 200 transport missions and 30 guidance missions completed in just two days.",
        bullets: ["Emergency supplies", "Medicine and clean water", "Aerial reconnaissance", "Rescue guidance"]
      },
      {
        title: "Smart agriculture",
        body: "Drones are changing how Vietnam farms. From precision spraying to crop-health monitoring and field digitization.\n\nVietnam already has more than 3,000 agricultural drones serving around 1.5 million hectares. A single UAV can handle roughly 67 hectares per day, while manual labor often covers only around 1 hectare.",
        bullets: ["Precision spraying", "Pest monitoring", "Field mapping", "Higher productivity"]
      },
      {
        title: "Infrastructure & energy",
        body: "Inspect what cannot stop. From transmission lines to major infrastructure systems, drones make inspection faster, safer, and more accurate.\n\nIn the power sector, one hour of UAV inspection can equal three days of manual inspection.",
        bullets: ["Power lines", "Substations", "Energy assets", "Lower risk for engineers"]
      },
      {
        title: "Construction & 3D mapping",
        body: "Turn job sites into data. Drones enable terrain surveys, 3D models, progress tracking, and design-to-build comparison.\n\nThis is a technology layer that makes projects clearer, faster, and easier to control.",
        bullets: ["Terrain survey", "3D models", "Progress tracking", "Deviation control"]
      },
      {
        title: "Environment & natural resources",
        body: "See ecosystems from above. Drones can help monitor forests, waterways, aquaculture zones, and environmentally sensitive areas.\n\nA new perspective for environmental intelligence.",
        bullets: ["Forest monitoring", "Water observation", "Resource management", "Wide-area visibility"]
      },
      {
        title: "Security & patrol",
        body: "A new perspective for modern security. Drones can support patrol operations, sensitive-area monitoring, and faster situational response.\n\nHo Chi Minh City has already tested UAV operations for crime prevention and operational support.",
        bullets: ["Patrol", "Hotspot monitoring", "Real-time visibility", "Faster response"]
      }
    ],
    scenarios: {
      eyebrow: "REAL-WORLD SCENARIOS",
      title: "Built for problems Vietnam already faces.",
      intro: "Deron is not designed for abstract futuristic demos. It is designed for conditions already visible in Vietnam: urgent medical transport, urban drone delivery, flood relief, and low-altitude operational infrastructure.",
      tabs: [
        {
          label: "Emergency healthcare",
          badge: "REAL-WORLD CASE",
          title: "Medical payloads need to move faster.",
          body: "In Hanoi, Duc Giang General Hospital officially launched a medical UAV pilot to transport medical supplies between treatment facilities. The aircraft operates at up to 60 km/h, with an initial radius of around 15 km and a planned expansion toward 20 km and roughly 10 kg of suitable medical payload.",
          solves: "Deron aims to connect hospitals, medical centers, and local clinics so critical supplies no longer depend entirely on ground transport."
        },
        {
          label: "Urban logistics",
          badge: "LIVE SANDBOX",
          title: "Ho Chi Minh City has already opened the door to drone delivery.",
          body: "Ho Chi Minh City has launched drone delivery trials with support from the Department of Science and Technology, the Saigon Hi-Tech Park, and Vietnamese technology companies. The program is expanding into more complex operating conditions such as rain, strong winds, signal loss, and technical failures.",
          solves: "Deron focuses on controlled low-altitude logistics: short-range delivery, hub connection, and the foundation of future urban air logistics."
        },
        {
          label: "Disaster response",
          badge: "FLOOD RESPONSE",
          title: "When drones become lifesaving wings.",
          body: "During severe floods, drones were used to carry emergency supplies and identify safe coordinates for rescue teams. In just two days, more than 200 transport trips and 30 guidance missions were completed.",
          solves: "Deron is positioned as the first-access layer when roads fail: rapid scouting, route guidance, and emergency supply delivery into the hardest-to-reach zones."
        },
        {
          label: "Agriculture & infrastructure",
          badge: "PROVEN PRODUCTIVITY",
          title: "When aerial data creates real operational advantage.",
          body: "Vietnam already operates more than 3,000 agricultural drones across roughly 1.5 million hectares. In the power sector, one hour of UAV inspection can equal three days of manual inspection.",
          solves: "While Deron is centered on logistics, healthcare, and disaster response, the same low-altitude infrastructure layer can expand into digital agriculture, infrastructure monitoring, and public-interest operations."
        }
      ]
    },
    closing: {
      title: "The sky is becoming new infrastructure.",
      body: "Drones are opening new ways to move goods, deliver care, respond to crises, inspect infrastructure, and generate field intelligence. Deron is building that system for Vietnam.",
      primaryCta: "Explore the mission",
      secondaryCta: "For investors"
    }
  },

  zh: {
    hero: {
      eyebrow: "应用场景",
      titleLine1: "一片天空。",
      titleLine2: "无限可能。",
      intro: "无人机不仅仅是一种飞行器。它正在成为运输、应急响应与低空运营的新型基础设施。\n\n在越南，无人机已经开始进入医疗、物流、农业、基础设施巡检、灾害救援和安防等真实应用场景。Deron 正在为最重要的任务而打造——在这些任务中，速度、可达性与可靠性决定结果。"
    },
    stats: [
      { value: "60 km/h", label: "越南医疗无人机试点巡航速度" },
      { value: "15 km", label: "初始作业半径" },
      { value: "3,000+", label: "越南已投入使用的农业无人机" },
      { value: "150万公顷", label: "已由无人机服务的农业面积" },
      { value: "1小时 = 3天", label: "电力巡检效率对比人工" },
      { value: "200+", label: "两天内完成的救援运输任务" }
    ],
    cards: [
      {
        title: "低空物流",
        body: "一条新的运输路线正在形成。从中转中心到最终交付点，跨越城市、偏远地区、产业园区和短距离水域。\n\n胡志明市已经开始进行无人机配送的沙盒测试和真实场景试飞。Deron 专注于供应链中最困难的一段：最后一公里。",
        bullets: ["短途配送", "中转中心连接", "末端交付", "岛屿与水域扩展"]
      },
      {
        title: "紧急医疗",
        body: "当每一分钟都至关重要。无人机可以缩短药品、检验样本、医疗物资和轻型应急设备在医院、医疗中心与偏远基层医疗点之间的运输时间。\n\n德江综合医院成为越南首家试点医疗无人机运输的医院，巡航速度约 60 km/h，作业半径 15 km，后续目标约 20 km 航程和约 10 kg 医疗载荷。",
        bullets: ["急救药品", "检验样本", "医疗物资", "轻型医疗载荷"]
      },
      {
        title: "灾害救援",
        body: "当道路中断，天空就成为第一条到达路线。无人机可将饮用水、药品、应急物资和现场数据送入被隔离区域。\n\n在近期洪灾中，无人机被用于救援物资运输和救援引导，仅两天就完成了 200 多次运输任务和 30 次引导任务。",
        bullets: ["紧急物资", "药品与净水", "空中侦察", "救援引导"]
      },
      {
        title: "智慧农业",
        body: "无人机正在改变越南农业。从精准喷洒到作物健康监测，再到农田数字化。\n\n越南已经拥有 3,000 多架农业无人机，服务约 150 万公顷农地。单架 UAV 每天可处理约 67 公顷，而人工通常只有约 1 公顷。",
        bullets: ["精准喷洒", "病虫害监测", "农田测绘", "提升产能"]
      },
      {
        title: "基础设施与能源",
        body: "检查那些不能停下来的系统。从输电线路到大型基础设施，无人机让巡检更快、更安全、更精准。\n\n在电力行业，1 小时的无人机巡检效率可相当于 3 天人工巡检。",
        bullets: ["输电线路", "变电站", "能源设施", "降低工程风险"]
      },
      {
        title: "建筑与三维测绘",
        body: "让工地变成数据。无人机可用于地形测量、三维建模、进度跟踪和施工偏差对比。\n\n这是一层让项目更清晰、更快速、更易于控制的技术能力。",
        bullets: ["地形测量", "3D 模型", "进度跟踪", "偏差控制"]
      },
      {
        title: "环境与自然资源",
        body: "从高空看见生态系统。无人机可协助监测森林、水域、养殖区和环境敏感区域。\n\n这是环境数据的新视角。",
        bullets: ["森林监测", "水域观察", "资源管理", "大范围可视化"]
      },
      {
        title: "安防与巡逻",
        body: "现代安防的新视角。无人机可以支持巡逻、敏感区域监控和更快速的态势响应。\n\n胡志明市已经进行了用于犯罪预防和行动支持的无人机测试。",
        bullets: ["巡逻", "热点区域监控", "实时画面", "快速响应"]
      }
    ],
    scenarios: {
      eyebrow: "真实场景",
      title: "为越南已经面对的问题而设计。",
      intro: "Deron 不是为抽象的未来展示而打造。它是为越南已经出现的真实需求而设计：紧急医疗运输、城市无人机配送、洪灾救援，以及低空基础设施运营。",
      tabs: [
        {
          label: "紧急医疗",
          badge: "真实案例",
          title: "医疗物资需要更快抵达。",
          body: "在河内，德江综合医院已经正式启动医疗无人机试点，用于在医疗机构之间运输医疗物资。该飞行器巡航速度可达 60 km/h，初始作业半径约 15 km，并计划提升至约 20 km 航程与约 10 kg 的医疗载荷能力。",
          solves: "Deron 致力于连接医院、医疗中心与基层医疗点，让关键医疗物资不再完全依赖地面交通。"
        },
        {
          label: "城市物流",
          badge: "实时沙盒",
          title: "胡志明市已经为无人机配送打开大门。",
          body: "胡志明市已启动无人机配送试验，由科技厅、高科技园区和本土科技企业共同参与。试验正在扩展到更复杂的运行条件，包括降雨、强风、信号丢失与技术故障。",
          solves: "Deron 专注于可控的低空物流：短程配送、中转连接，以及未来城市空中物流基础设施。"
        },
        {
          label: "灾害救援",
          badge: "洪灾实战",
          title: "当无人机成为救命的翅膀。",
          body: "在洪灾中，无人机被用于运送救援物资并为救援队标定安全坐标。仅两天内，就完成了 200 多次运输任务和 30 次引导任务。",
          solves: "当道路失效时，Deron 可以成为第一层到达能力：快速侦察、引导路线，并把紧急物资送到最难到达的地区。"
        },
        {
          label: "农业与基础设施",
          badge: "效率已被验证",
          title: "当空中数据带来真实效率差异。",
          body: "越南已经拥有 3,000 多架农业无人机，覆盖约 150 万公顷农地。在电力行业，1 小时的无人机巡检效率可相当于 3 天人工巡检。",
          solves: "虽然 Deron 以物流、医疗与救援为核心，但同一套低空基础设施同样可以扩展到数字农业、基础设施监测与公共服务任务。"
        }
      ]
    },
    closing: {
      title: "天空正在成为新的基础设施。",
      body: "无人机正在为运输、医疗、救援、基础设施与现场数据创造新的方式。Deron 正在为越南建设这套系统。",
      primaryCta: "探索我们的使命",
      secondaryCta: "投资者入口"
    }
  }
};

const cardImages = [
  "https://images.unsplash.com/photo-1543163521-1bf539c55dd2?auto=format&fit=crop&w=1400&q=80",
  "https://images.unsplash.com/photo-1582719478250-c89cae4dc85b?auto=format&fit=crop&w=1400&q=80",
  "https://images.unsplash.com/photo-1475776408506-9a5371e7a068?auto=format&fit=crop&w=1400&q=80",
  "https://images.unsplash.com/photo-1598515214211-89d3c737e9fd?auto=format&fit=crop&w=1400&q=80",
  "https://images.unsplash.com/photo-1473341304170-971dccb5ac1e?auto=format&fit=crop&w=1400&q=80",
  "https://images.unsplash.com/photo-1473968512647-3e447244af8f?auto=format&fit=crop&w=1400&q=80",
  "https://images.unsplash.com/photo-1446776653964-20c1d3a81b06?auto=format&fit=crop&w=1400&q=80",
  "https://images.unsplash.com/photo-1451187580459-43490279c0fa?auto=format&fit=crop&w=1400&q=80"
];

const scenarioImages = [
  "https://images.unsplash.com/photo-1576091160550-2173dba999ef?auto=format&fit=crop&w=1800&q=80",
  "https://images.unsplash.com/photo-1519003722824-194d4455a60c?auto=format&fit=crop&w=1800&q=80",
  "https://images.unsplash.com/photo-1527489377706-5bf97e608852?auto=format&fit=crop&w=1800&q=80",
  "https://images.unsplash.com/photo-1500382017468-9049fed747ef?auto=format&fit=crop&w=1800&q=80"
];

function splitParagraphs(text) {
  return text.split("\n\n");
}

export default function ApplicationsSection({ language }) {
  const content = applicationsContent[language] || applicationsContent.vi;
  const [activeTab, setActiveTab] = useState(0);

  useEffect(() => {
    setActiveTab(0);
  }, [language]);

  useEffect(() => {
    const nodes = document.querySelectorAll("[data-fade-up]");

    if (typeof window === "undefined" || typeof window.IntersectionObserver === "undefined") {
      nodes.forEach((node) => node.classList.add("is-visible"));
      return undefined;
    }

    const observer = new window.IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add("is-visible");
            observer.unobserve(entry.target);
          }
        });
      },
      { threshold: 0.12 }
    );

    nodes.forEach((node) => observer.observe(node));

    return () => observer.disconnect();
  }, [language]);

  const tab = content.scenarios.tabs[activeTab];

  return (
    <section id="applications" className="bg-[#060B14] text-[#F5F7FB] py-24 md:py-32">
      {/* content based on verified Vietnam use cases */}
      <style>{`
        .fade-up { opacity: 0; transform: translateY(28px); transition: opacity 700ms ease, transform 700ms ease; }
        .fade-up.is-visible { opacity: 1; transform: translateY(0); }
      `}</style>

      <div className="max-w-7xl mx-auto px-6 lg:px-10 space-y-10 md:space-y-14">
        <header data-fade-up className="fade-up space-y-8">
          <p className="text-xs tracking-[0.3em] uppercase text-[#E11D2E]">{content.hero.eyebrow}</p>
          <h2 className="text-5xl md:text-7xl lg:text-8xl font-semibold leading-[0.95] tracking-tight max-w-5xl">
            <span className="block">{content.hero.titleLine1}</span>
            <span className="block text-[rgba(245,247,251,0.82)]">{content.hero.titleLine2}</span>
          </h2>
          <div className="max-w-4xl space-y-5 text-base md:text-xl leading-relaxed text-[rgba(245,247,251,0.72)]">
            {splitParagraphs(content.hero.intro).map((paragraph, idx) => (
              <p key={idx}>{paragraph}</p>
            ))}
          </div>
        </header>

        <section data-fade-up className="fade-up grid grid-cols-1 md:grid-cols-3 xl:grid-cols-6 gap-3">
          {content.stats.map((stat, idx) => (
            <article key={idx} className="rounded-2xl border border-[rgba(255,255,255,0.1)] bg-[#0B1220] px-5 py-6">
              <p className="text-2xl md:text-3xl font-semibold mb-3">{stat.value}</p>
              <p className="text-sm leading-snug text-[rgba(245,247,251,0.72)]">{stat.label}</p>
            </article>
          ))}
        </section>

        <section data-fade-up className="fade-up space-y-5">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-5">
            {content.cards.map((card, idx) => {
              const featured = idx < 3;
              return (
                <article
                  key={card.title}
                  className={`group overflow-hidden rounded-3xl border border-[rgba(255,255,255,0.1)] bg-[#0B1220] transition duration-300 md:hover:-translate-y-1 md:hover:border-[rgba(225,29,46,0.45)] ${featured ? "lg:min-h-[420px]" : ""}`}
                >
                  <img
                    src={cardImages[idx]}
                    alt={card.title}
                    loading="lazy"
                    className={`w-full object-cover ${featured ? "h-44" : "h-32"}`}
                  />
                  <div className="p-6 md:p-7 space-y-4">
                    <h3 className="text-2xl font-semibold tracking-tight">{card.title}</h3>
                    <div className="space-y-4 text-[rgba(245,247,251,0.72)] leading-relaxed">
                      {splitParagraphs(card.body).map((paragraph, pIdx) => (
                        <p key={pIdx}>{paragraph}</p>
                      ))}
                    </div>
                    <ul className="grid grid-cols-1 sm:grid-cols-2 gap-x-4 gap-y-2 pt-1">
                      {card.bullets.map((bullet) => (
                        <li key={bullet} className="text-sm text-[#F5F7FB] before:content-['•'] before:text-[#E11D2E] before:mr-2">
                          {bullet}
                        </li>
                      ))}
                    </ul>
                  </div>
                </article>
              );
            })}
          </div>
        </section>

        <section data-fade-up className="fade-up space-y-6">
          <p className="text-xs tracking-[0.3em] uppercase text-[#E11D2E]">{content.scenarios.eyebrow}</p>
          <h3 className="text-3xl md:text-5xl font-semibold tracking-tight max-w-4xl">{content.scenarios.title}</h3>
          <p className="text-[rgba(245,247,251,0.72)] leading-relaxed max-w-4xl">{content.scenarios.intro}</p>

          <div
            role="tablist"
            aria-label={content.scenarios.eyebrow}
            className="flex gap-2 overflow-x-auto pb-2"
          >
            {content.scenarios.tabs.map((item, idx) => (
              <button
                key={item.label}
                id={`scenario-tab-${idx}`}
                role="tab"
                aria-selected={activeTab === idx}
                aria-controls={`scenario-panel-${idx}`}
                onClick={() => setActiveTab(idx)}
                className={`whitespace-nowrap rounded-full border px-4 py-2 text-sm transition ${
                  activeTab === idx
                    ? "bg-[#E11D2E] border-[#E11D2E] text-white"
                    : "bg-transparent border-[rgba(255,255,255,0.2)] text-[rgba(245,247,251,0.8)]"
                }`}
              >
                {item.label}
              </button>
            ))}
          </div>

          <article
            id={`scenario-panel-${activeTab}`}
            role="tabpanel"
            aria-labelledby={`scenario-tab-${activeTab}`}
            className="rounded-3xl border border-[rgba(255,255,255,0.1)] bg-[#0B1220] overflow-hidden"
          >
            <img src={scenarioImages[activeTab]} alt={tab.label} loading="lazy" className="w-full h-56 md:h-80 object-cover" />
            <div className="p-6 md:p-10 space-y-5">
              <p className="inline-flex text-xs uppercase tracking-[0.26em] text-[#E11D2E] border border-[rgba(225,29,46,0.5)] rounded-full px-3 py-1">
                {tab.badge}
              </p>
              <h4 className="text-2xl md:text-4xl font-semibold tracking-tight">{tab.title}</h4>
              <p className="leading-relaxed text-[rgba(245,247,251,0.72)]">{tab.body}</p>
              <div className="rounded-2xl border border-[rgba(225,29,46,0.5)] bg-[rgba(225,29,46,0.08)] p-5">
                <p className="text-xs uppercase tracking-[0.3em] text-[#E11D2E] mb-2">Deron solves</p>
                <p className="leading-relaxed">{tab.solves}</p>
              </div>
            </div>
          </article>
        </section>

        <section data-fade-up className="fade-up rounded-3xl border border-[rgba(255,255,255,0.1)] bg-[#0B1220] p-6 md:p-10">
          <h3 className="text-3xl md:text-5xl font-semibold tracking-tight max-w-4xl">{content.closing.title}</h3>
          <p className="mt-5 max-w-3xl text-[rgba(245,247,251,0.72)] leading-relaxed">{content.closing.body}</p>
          <div className="mt-8 flex flex-col sm:flex-row gap-3">
            <button className="inline-flex justify-center items-center rounded-full px-6 py-3 bg-[#E11D2E] text-white font-medium transition hover:opacity-90">
              {content.closing.primaryCta}
            </button>
            <button className="inline-flex justify-center items-center rounded-full px-6 py-3 border border-[rgba(255,255,255,0.2)] text-[#F5F7FB] font-medium transition hover:border-[rgba(255,255,255,0.5)]">
              {content.closing.secondaryCta}
            </button>
          </div>
        </section>
      </div>
    </section>
  );
}
