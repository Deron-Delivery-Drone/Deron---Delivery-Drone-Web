(function () {
 'use strict';

 if (window.DeronChatbot) return;

 var SUPPORTED_LOCALES = ['vi', 'en', 'zh'];
 var MAX_MESSAGE_LENGTH = 1500;
 var SESSION_ID_KEY = 'deron_chatbot_session_id';
 var SESSION_MESSAGES_KEY = 'deron_chatbot_messages_v1';
 var SESSION_OPEN_KEY = 'deron_chatbot_open';
 var NAVIGATION_MAP_URL = '/assets/chatbot/navigation-map.json';

 var defaultNavigationMap = {
 home: { path: '/', labelKey: 'home' },
 deron_scout: { path: '/deron-scout', labelKey: 'deronScout' },
 deron_scout_sop: { path: '/deron-scout/sop', labelKey: 'deronScoutSop' },
 datcs: { path: '/datcs', labelKey: 'datcs' },
 datcs_install: { path: '/datcs/install', labelKey: 'datcsInstall' },
 academy: { path: '/acedemy/', labelKey: 'academy' },
 contact: { path: '/#contact', labelKey: 'contact' }
 };

 var copy = {
 vi: {
 title: 'Trợ lý Deron',
 subtitle: '',
 open: 'Mở trợ lý Deron',
 close: 'Đóng trợ lý Deron',
 minimize: 'Thu nhỏ trợ lý Deron',
 input: 'Nhập câu hỏi...',
 send: 'Gửi',
 loading: 'Đang trả lời',
 empty: 'Vui lòng nhập câu hỏi.',
 tooLong: 'Tin nhắn quá dài. Vui lòng rút gọn dưới 1500 ký tự.',
 backendUnavailable: 'Hiện chatbot chưa kết nối backend AI. Trợ lý Deron vẫn có thể hỗ trợ bằng thông tin công khai cơ bản hoặc dẫn bạn đến trang phù hợp.',
 unknown: 'Trợ lý Deron chưa có thông tin đã xác nhận cho câu hỏi này. Bạn có thể hỏi về Deron, DATCS, tải DATCS, hướng dẫn sử dụng, khắc phục lỗi hoặc liên hệ chính thức.',
 securityRefusal: 'Trợ lý Deron không thể hỗ trợ truy cập trái phép, tiết lộ khóa hệ thống hoặc bỏ qua quy trình bảo mật. Nếu bạn cần tải DATCS, trợ lý có thể dẫn bạn đến trang tải chính thức của Deron.',
 welcome: 'Xin chào, đây là trợ lý công khai của Deron. Trợ lý có thể hỗ trợ thông tin tổng quan, DATCS, tải DATCS và liên hệ chính thức.',
 quickActions: ['Deron là gì?', 'DATCS là gì?', 'Tải DATCS', 'Hướng dẫn sử dụng', 'Khắc phục lỗi', 'Liên hệ'],
 cta: {
 home: 'Mở trang chủ',
 deronScout: 'Xem Deron Scout',
 deronScoutSop: 'Xem quy trình Deron Scout',
 datcs: 'Xem DATCS',
 datcsInstall: 'Tới trang tải DATCS',
 contact: 'Liên hệ Deron'
 },
 answers: {
 deron_overview: 'Deron là website công khai giới thiệu hệ sinh thái drone Việt Nam của Deron. Sản phẩm đang triển khai là Deron Scout cho tuần tra và giám sát tự động; các lớp mở rộng gồm Deron Delivery, DMA và DATCS.',
 deron_scout: 'Deron Scout là hệ drone tuần tra, giám sát và theo dõi tự động: bay theo tuyến lập lịch, ghi dữ liệu, hỗ trợ phát hiện bất thường, tự quay về trạm sạc và lặp chu kỳ. Đây là sản phẩm đang triển khai hiện tại của Deron.',
 deron_scout_sop: 'Quy trình Deron Scout là tài liệu vận hành chuẩn cho U1 Pro: đặt con người lên hàng đầu, quyết định bay hoặc không bay, kiểm tra trước khi bay, tuần tra, quay về trạm sạc, sạc, xử lý khẩn cấp và ghi nhận sau bay.',
 datcs_overview: 'DATCS là lớp phần mềm được mô tả công khai của Deron để giám sát, theo dõi, xác thực, ghi log và hỗ trợ ra quyết định. DATCS không trực tiếp điều khiển motor drone; các quyền điều khiển phần cứng thuộc những lớp hệ thống được phê duyệt riêng.',
 datcs_download: 'DATCS không phải phần mềm tải công khai. Bạn có thể gửi yêu cầu quyền tải tại trang DATCS install chính thức của Deron.',
 datcs_usage: 'Hướng dẫn sử dụng chi tiết của DATCS sẽ chỉ được cung cấp qua kênh hỗ trợ dành cho người dùng đã được duyệt. Trợ lý Deron có thể dẫn bạn đến trang DATCS hoặc trang tải chính thức.',
 troubleshooting: 'Để bắt đầu xử lý lỗi DATCS, hãy dùng trang tải/yêu cầu quyền chính thức hoặc liên hệ Deron. Trợ lý Deron không hỗ trợ bỏ qua bước bảo mật, chia sẻ token, hoặc truy cập không được cấp quyền.',
 contact: 'Bạn có thể liên hệ Deron qua khu vực liên hệ chính thức trên website. Với DATCS hoặc hợp tác, hãy nêu rõ tổ chức, vai trò và mục đích sử dụng.',
 navigation: 'Trợ lý Deron có thể dẫn bạn đến các trang công khai chính: trang chủ, DATCS, tải DATCS hoặc liên hệ.'
 }
 },
 en: {
 title: 'Deron Assistant',
 subtitle: '',
 open: 'Open Deron assistant',
 close: 'Close Deron assistant',
 minimize: 'Minimize Deron assistant',
 input: 'Type a question...',
 send: 'Send',
 loading: 'Answering',
 empty: 'Please enter a question.',
 tooLong: 'The message is too long. Please keep it under 1500 characters.',
 backendUnavailable: 'The AI backend is not connected yet. Deron Assistant can still help with basic public information or guide readers to the right page.',
 unknown: 'Deron Assistant does not have confirmed public information for that question yet. Readers can ask about Deron, DATCS, DATCS download, user guidance, troubleshooting, or official contact.',
 securityRefusal: 'Deron Assistant cannot help with unauthorized access, secret disclosure, or bypassing security flows. DATCS access should go through Deron\'s official download page.',
 welcome: 'Hello, this is Deron\'s public assistant. It can help with Deron overview, DATCS, DATCS download, and official contact routes.',
 quickActions: ['What is Deron, ', 'What is DATCS, ', 'Download DATCS', 'User Guide', 'Troubleshooting', 'Contact'],
 cta: {
 home: 'Open home',
 deronScout: 'View Deron Scout',
 deronScoutSop: 'View Deron Scout procedure',
 datcs: 'View DATCS',
 datcsInstall: 'Go to DATCS download',
 contact: 'Contact Deron'
 },
 answers: {
 deron_overview: 'Deron\'s public website presents a Vietnamese drone ecosystem built for the Vietnamese people. The current product in deployment is Deron Scout for autonomous patrol and surveillance; extension layers include Deron Delivery, DMA, and DATCS.',
 deron_scout: 'Deron Scout is an autonomous drone patrol, surveillance, and monitoring system: it flies scheduled routes, records data, supports anomaly detection, returns to its charging station, and repeats the patrol cycle.',
 deron_scout_sop: 'The Deron Scout operating procedure is the standard way to operate U1 Pro: people first, a decision to fly or not fly, before-flight checks, patrol, return to charging station, charging, emergency handling, and after-flight records.',
 datcs_overview: 'DATCS is Deron\'s publicly described software layer for supervision, monitoring, validation, logging, and decision support. DATCS does not directly control drone motors; hardware control authority belongs to separately approved system layers.',
 datcs_download: 'DATCS is not a public direct-download product. Download access is requested through Deron’s official DATCS install page.',
 datcs_usage: 'Detailed DATCS user guidance will be provided only through approved support channels. Deron Assistant can point readers to the DATCS page or the official download request page.',
 troubleshooting: 'To start DATCS troubleshooting, use the official download/request page or contact Deron. Deron Assistant cannot help bypass security, share tokens, or access unapproved systems.',
 contact: 'Deron can be contacted through the official website contact area. For DATCS or partnership requests, the message should include organization, role, and intended use.',
 navigation: 'Deron Assistant can guide readers to the main public pages: home, DATCS, DATCS download, or contact.'
 }
 },
 zh: {
 title: 'Deron 助手',
 subtitle: '',
 open: '打开 Deron 助手',
 close: '关闭 Deron 助手',
 minimize: '最小化 Deron 助手',
 input: '输入问题...',
 send: '发送',
 loading: '正在回复',
 empty: '请输入问题。',
 tooLong: '消息过长。请将内容控制在 1500 个字符以内。',
 backendUnavailable: '人工智能后端尚未连接。Deron（德荣）助手仍可提供基础公开信息，或引导读者前往合适页面。',
 unknown: 'Deron（德荣）助手尚无该问题的已确认公开信息。读者可询问 Deron（德荣）、DATCS（空中交通管理系统）、DATCS 下载、使用指南、故障排查或官方联系渠道。',
 securityRefusal: 'Deron（德荣）助手不能协助未经授权的访问、泄露系统密钥或绕过安全流程。DATCS（空中交通管理系统）访问应通过 Deron（德荣）官方下载页面申请。',
 welcome: '这里是 Deron（德荣）公开网站助手，可帮助读者了解 Deron（德荣）、DATCS（空中交通管理系统）、DATCS 下载和官方联系渠道。',
 quickActions: ['Deron 是什么？', 'DATCS 是什么？', '下载 DATCS', '使用指南', '故障排查', '联系'],
 cta: {
 home: '打开首页',
 deronScout: '查看 Deron Scout',
 deronScoutSop: '查看 Deron Scout（德荣侦察）运行流程',
 datcs: '查看 DATCS',
 datcsInstall: '前往 DATCS 下载页',
 contact: '联系 Deron'
 },
 answers: {
 deron_overview: 'Deron（德荣）官网公开介绍其为越南人民建设的越南本土无人机生态。当前正在部署的产品是 Deron Scout（德荣侦察），用于自主巡逻与监控；扩展层包括 Deron Delivery（德荣配送）、DMA（主航电平台）和 DATCS（空中交通管理系统）。',
 deron_scout: 'Deron Scout（德荣侦察）是自主无人机巡逻、监控与跟踪系统：按计划航线飞行、记录数据、辅助发现异常、返回充电站并重复巡逻周期。',
 deron_scout_sop: 'Deron Scout（德荣侦察）运行流程是 U1 Pro 的标准运行方式，包括以人为本的安全原则、决定飞行或不飞行、飞前检查、巡逻任务、返回充电站、充电、应急处理与飞后记录。',
 datcs_overview: 'DATCS 是 Deron 公开描述的软件层，用于监督、监测、验证、记录日志并支持决策。DATCS 不直接控制无人机电机；硬件控制权限属于另行批准的系统层。',
 datcs_download: 'DATCS（空中交通管理系统）不是公开直接下载的软件。下载权限应通过 Deron（德荣）官方 DATCS 安装页面申请。',
 datcs_usage: 'DATCS（空中交通管理系统）的详细使用指南只会通过面向获批用户的支持渠道提供。Deron（德荣）助手可引导读者前往 DATCS 页面或官方下载申请页面。',
 troubleshooting: '如需开始 DATCS（空中交通管理系统）故障排查，请使用官方下载/申请页面或联系 Deron（德荣）。Deron（德荣）助手不能协助绕过安全流程、分享令牌或访问未授权系统。',
 contact: '读者可以通过官网的官方联系区域联系 Deron（德荣）。关于 DATCS（空中交通管理系统）或合作请求，请说明组织、角色和使用目的。',
 navigation: 'Deron（德荣）助手可引导读者前往主要公开页面：首页、DATCS、DATCS 下载或联系。'
 }
 }
 };

 function normalizeLocale(locale) {
 if (!locale) return '';
 var value = String(locale).toLowerCase();
 if (value.indexOf('zh') === 0 || value.indexOf('cn') === 0) return 'zh';
 if (value.indexOf('vi') === 0) return 'vi';
 if (value.indexOf('en') === 0) return 'en';
 return '';
 }

 function getCookie(name) {
 var prefix = name + '=';
 return (document.cookie || '').split(';').map(function (item) {
 return item.trim();
 }).filter(function (item) {
 return item.indexOf(prefix) === 0;
 }).map(function (item) {
 return decodeURIComponent(item.slice(prefix.length));
 })[0] || '';
 }

 function getActiveWebsiteLocale() {
 var active = document.querySelector('.lang-dropdown-item.active[data-lang], .mobile-lang-btn.active[data-lang]');
 if (active) {
 var activeLocale = normalizeLocale(active.getAttribute('data-lang'));
 try {
 var stored = normalizeLocale(localStorage.getItem('deron_lang')) || normalizeLocale(localStorage.getItem('deron-language'));
 if (stored && activeLocale && stored !== activeLocale) return '';
 } catch (_) { }
 return activeLocale;
 }

 var label = document.getElementById('langLabel') || document.getElementById('pgLangLabel');
 if (label) return normalizeLocale(label.textContent);

 return normalizeLocale(window.DERON_LANG || window.currentLang || '');
 }

 function getStoredLocale() {
 try {
 return normalizeLocale(localStorage.getItem('deron_lang')) ||
 normalizeLocale(localStorage.getItem('deron-language')) ||
 normalizeLocale(getCookie('deron_lang')) ||
 normalizeLocale(getCookie('deron-language'));
 } catch (_) {
 return '';
 }
 }

 function inferLocaleFromMessage(message) {
 if (!message) return '';
 if (/[\u4e00-\u9fff]/.test(message)) return 'zh';
 var normalized = removeAccents(message).toLowerCase();
 if (/[ăâđêôơưáàảãạấầẩẫậắằẳẵặéèẻẽẹếềểễệíìỉĩịóòỏõọốồổỗộớờởỡợúùủũụứừửữựýỳỷỹỵ]/i.test(message)) return 'vi';
 if (/\b(xin|toi|toi|ban|lien he|tai|huong dan|khac phuc|loi)\b/.test(normalized)) return 'vi';
 return '';
 }

 function detectLocale(message) {
 return getActiveWebsiteLocale() ||
 getStoredLocale() ||
 normalizeLocale(document.documentElement.getAttribute('lang')) ||
 normalizeLocale(navigator.language) ||
 inferLocaleFromMessage(message) ||
 'en';
 }

 function removeAccents(value) {
 return String(value || '').normalize('NFD').replace(/[\u0300-\u036f]/g, '').replace(/đ/g, 'd').replace(/Đ/g, 'D');
 }

 function includesAny(text, terms) {
 return terms.some(function (term) {
 return text.indexOf(term) !== -1;
 });
 }

 function detectSecurityFlags(message) {
 var normalized = removeAccents(message).toLowerCase();
 var flags = [];
 if (includesAny(normalized, ['api key', 'apikey', 'secret', 'service role', 'service_role', '.env', 'private key', 'mat khau', 'khoa he thong', 'system prompt'])) {
 flags.push('secret_request');
 }
 if (includesAny(normalized, ['bypass', 'hack', 'crack', 'unauthorized', 'trai phep', 'bo qua bao mat', 'vuot bao mat', 'token gia', 'signed url', 'signed_url'])) {
 flags.push('security_bypass');
 }
 return flags;
 }

 function routeIntent(message) {
 var normalized = removeAccents(message).toLowerCase();
 var raw = String(message || '').toLowerCase();
 var securityFlags = detectSecurityFlags(message);
 if (securityFlags.length) {
 return { intent: 'security_refusal', securityFlags: securityFlags };
 }

 if (includesAny(normalized, ['deron scout', 'scout', 'uav tuan tra', 'drone tuan tra', 'giam sat tu dong', 'sop scout', 'sop deron scout']) || includesAny(raw, ['deron scout', '巡逻', '监控'])) {
 return { intent: includesAny(normalized, ['sop']) ? 'deron_scout_sop' : 'deron_scout', securityFlags: [] };
 }

 if (includesAny(normalized, ['download', 'install', 'installer', 'tai datcs', 'tai ve', 'cai dat', 'datcs download']) || includesAny(raw, ['下载 datcs', '下載 datcs', '安装 datcs'])) {
 return { intent: 'datcs_download', securityFlags: [] };
 }
 if ((normalized.indexOf('datcs') !== -1 || raw.indexOf('datcs') !== -1) && includesAny(normalized, ['la gi', 'what is', 'overview', 'thong tin', 'gioi thieu'])) {
 return { intent: 'datcs_overview', securityFlags: [] };
 }
 if (includesAny(raw, ['datcs 是什么']) || includesAny(normalized, ['datcs'])) {
 return { intent: 'datcs_overview', securityFlags: [] };
 }
 if (includesAny(normalized, ['huong dan', 'user guide', 'usage', 'su dung', 'manual']) || includesAny(raw, ['使用指南', '如何使用'])) {
 return { intent: 'datcs_usage', securityFlags: [] };
 }
 if (includesAny(normalized, ['troubleshoot', 'trouble', 'error', 'bug', 'loi', 'khac phuc', 'khong vao duoc']) || includesAny(raw, ['故障', '排查', '错误'])) {
 return { intent: 'troubleshooting', securityFlags: [] };
 }
 if (includesAny(normalized, ['contact', 'support', 'partnership', 'partner', 'lien he', 'hop tac', 'tu van']) || includesAny(raw, ['联系', '合作', '支持'])) {
 return { intent: 'contact', securityFlags: [] };
 }
 if (includesAny(normalized, ['go to', 'open page', 'navigate', 'trang', 'mo trang', 'di den']) || includesAny(raw, ['打开', '页面'])) {
 return { intent: 'navigation', securityFlags: [] };
 }
 if (includesAny(normalized, ['deron la gi', 'what is deron', 'about deron', 'gioi thieu deron']) || includesAny(raw, ['deron 是什么'])) {
 return { intent: 'deron_overview', securityFlags: [] };
 }

 return { intent: 'unknown', securityFlags: [] };
 }

 function ctaForIntent(intent, locale) {
 var ctaCopy = copy[locale].cta;
 if (intent === 'datcs_download' || intent === 'troubleshooting' || intent === 'security_refusal') {
 return [{ label: ctaCopy.datcsInstall, href: getRoute('datcs_install') }];
 }
 if (intent === 'datcs_overview' || intent === 'datcs_usage') {
 return [{ label: ctaCopy.datcs, href: getRoute('datcs') }];
 }
 if (intent === 'deron_scout') {
 return [{ label: ctaCopy.deronScout, href: getRoute('deron_scout') }];
 }
 if (intent === 'deron_scout_sop') {
 return [{ label: ctaCopy.deronScoutSop, href: getRoute('deron_scout_sop') }];
 }
 if (intent === 'contact') {
 return [{ label: ctaCopy.contact, href: getRoute('contact') }];
 }
 if (intent === 'deron_overview' || intent === 'navigation') {
 return [{ label: ctaCopy.home, href: getRoute('home') }];
 }
 return [];
 }

 function getRoute(key) {
 return (window.DeronChatbotNavigation && window.DeronChatbotNavigation[key] && window.DeronChatbotNavigation[key].path) ||
 (defaultNavigationMap[key] && defaultNavigationMap[key].path) ||
 '/';
 }

 function createSessionId() {
 if (window.crypto && window.crypto.randomUUID) return window.crypto.randomUUID();
 return 'chat_' + Date.now().toString(36) + '_' + Math.random().toString(36).slice(2);
 }

 function getSessionId() {
 try {
 var existing = sessionStorage.getItem(SESSION_ID_KEY);
 if (existing) return existing;
 var next = createSessionId();
 sessionStorage.setItem(SESSION_ID_KEY, next);
 return next;
 } catch (_) {
 return createSessionId();
 }
 }

 function loadMessages() {
 try {
 var parsed = JSON.parse(sessionStorage.getItem(SESSION_MESSAGES_KEY) || '[]');
 return Array.isArray(parsed) ? parsed.slice(-30) : [];
 } catch (_) {
 return [];
 }
 }

 function saveMessages(messages) {
 try {
 sessionStorage.setItem(SESSION_MESSAGES_KEY, JSON.stringify(messages.slice(-30)));
 } catch (_) { }
 }

 function logEvent(event) {
 var safe = {
 sessionId: event.sessionId,
 locale: event.locale,
 pagePath: event.pagePath,
 intent: event.intent,
 messageLength: event.messageLength,
 timestamp: event.timestamp || new Date().toISOString(),
 responseSource: event.responseSource,
 securityFlags: event.securityFlags || []
 };
 if (/^(localhost|127\.0\.0\.1)$/i.test(location.hostname)) {
 console.debug('[DeronChatbot]', safe);
 }
 }

 function MockChatProvider() { }

 MockChatProvider.prototype.send = function (payload) {
 var locale = normalizeLocale(payload.locale) || 'en';
 var routed = routeIntent(payload.message);
 var localeCopy = copy[locale] || copy.en;
 var text = routed.intent === 'security_refusal' ? localeCopy.securityRefusal
 : (localeCopy.answers[routed.intent] || localeCopy.unknown);

 return Promise.resolve({
 text: text,
 intent: routed.intent === 'security_refusal' ? 'unknown' : routed.intent,
 ctas: ctaForIntent(routed.intent, locale),
 source: 'mock',
 securityFlags: routed.securityFlags
 });
 };

 function FutureBackendProvider(endpoint) {
 this.endpoint = endpoint;
 }

 FutureBackendProvider.prototype.send = function (payload) {
 if (!this.endpoint) {
 return Promise.reject(new Error('chatbot_backend_unavailable'));
 }
 return fetch(this.endpoint, {
 method: 'POST',
 headers: { 'Content-Type': 'application/json' },
 body: JSON.stringify(payload)
 }).then(function (response) {
 if (!response.ok) throw new Error('chatbot_backend_unavailable');
 return response.json();
 }).then(function (data) {
 return {
 text: String(data.message || data.text || ''),
 intent: data.intent || 'unknown',
 ctas: Array.isArray(data.ctas) ? data.ctas : ctaForIntent(data.intent || 'unknown', payload.locale),
 source: data.source || 'future_gemini',
 securityFlags: Array.isArray(data.securityFlags) ? data.securityFlags : []
 };
 });
 };

 function ChatbotClient(provider) {
 this.provider = provider;
 }

 ChatbotClient.prototype.send = function (message, locale) {
 var payload = {
 message: message,
 sessionId: getSessionId(),
 locale: locale,
 pagePath: location.pathname || '/'
 };
 return this.provider.send(payload);
 };

 function createProvider() {
 var env = window.__DERON_ENV__ || {};
 var mode = String(env.DERON_CHATBOT_MODE || env.REACT_APP_DERON_CHATBOT_MODE || 'mock').toLowerCase();
 var endpoint = env.DERON_CHATBOT_ENDPOINT || env.REACT_APP_DERON_CHATBOT_ENDPOINT || '';
 if (mode === 'edge' || mode === 'supabase') return new FutureBackendProvider(endpoint);
 return new MockChatProvider();
 }

 function createEl(tag, className, text) {
 var el = document.createElement(tag);
 if (className) el.className = className;
 if (text !== undefined) el.textContent = text;
 return el;
 }

 function renderMessage(root, message) {
 var item = createEl('div', 'deron-chatbot__message deron-chatbot__message--' + message.role);
 var bubble = createEl('div', 'deron-chatbot__bubble', message.text);
 item.appendChild(bubble);

 if (message.ctas && message.ctas.length) {
 var row = createEl('div', 'deron-chatbot__cta-row');
 message.ctas.forEach(function (cta) {
 if (!cta || !cta.href) return;
 var button = createEl('button', 'deron-chatbot__cta', cta.label || cta.href);
 button.type = 'button';
 button.addEventListener('click', function () {
 navigateTo(cta.href);
 });
 row.appendChild(button);
 });
 item.appendChild(row);
 }

 root.appendChild(item);
 }

 function navigateTo(href) {
 if (!href) return;
 if (href.charAt(0) === '#') {
 location.hash = href;
 return;
 }
 location.href = href;
 }

 function renderTyping(root, locale) {
 var item = createEl('div', 'deron-chatbot__message deron-chatbot__message--assistant');
 item.setAttribute('data-chatbot-typing', 'true');
 var bubble = createEl('div', 'deron-chatbot__bubble');
 var wrap = createEl('span', 'deron-chatbot__typing');
 wrap.setAttribute('aria-label', copy[locale].loading);
 wrap.appendChild(createEl('span'));
 wrap.appendChild(createEl('span'));
 wrap.appendChild(createEl('span'));
 bubble.appendChild(wrap);
 item.appendChild(bubble);
 root.appendChild(item);
 }

 function removeTyping(root) {
 var typing = root.querySelector('[data-chatbot-typing="true"]');
 if (typing) typing.remove();
 }

 function ChatbotWidget() {
 this.client = new ChatbotClient(createProvider());
 this.messages = loadMessages();
 this.locale = detectLocale();
 this.isOpen = false;
 this.isSending = false;
 this.root = null;
 this.messagesEl = null;
 this.inputEl = null;
 this.quickActionsEl = null;
 }

 ChatbotWidget.prototype.init = function () {
 this.root = createEl('section', 'deron-chatbot');
 this.root.setAttribute('aria-label', copy[this.locale].title);

 var panel = createEl('div', 'deron-chatbot__panel');
 panel.setAttribute('role', 'dialog');
 panel.setAttribute('aria-modal', 'false');
 panel.setAttribute('aria-labelledby', 'deron-chatbot-title');

 var header = createEl('div', 'deron-chatbot__header');
 var headingWrap = createEl('div');
 var title = createEl('div', 'deron-chatbot__title', copy[this.locale].title);
 title.id = 'deron-chatbot-title';
 headingWrap.appendChild(title);
 if (copy[this.locale].subtitle) {
 headingWrap.appendChild(createEl('div', 'deron-chatbot__subtitle', copy[this.locale].subtitle));
 }

 var controls = createEl('div', 'deron-chatbot__controls');
 var minimize = createEl('button', 'deron-chatbot__icon-button', '-');
 minimize.type = 'button';
 minimize.setAttribute('aria-label', copy[this.locale].minimize);
 minimize.addEventListener('click', this.close.bind(this));
 var close = createEl('button', 'deron-chatbot__icon-button', 'x');
 close.type = 'button';
 close.setAttribute('aria-label', copy[this.locale].close);
 close.addEventListener('click', this.close.bind(this));
 controls.appendChild(minimize);
 controls.appendChild(close);
 header.appendChild(headingWrap);
 header.appendChild(controls);

 var body = createEl('div', 'deron-chatbot__body');
 this.messagesEl = createEl('div', 'deron-chatbot__messages');
 this.messagesEl.setAttribute('aria-live', 'polite');
 body.appendChild(this.messagesEl);

 this.quickActionsEl = createEl('div', 'deron-chatbot__quick-actions');

 var composer = createEl('form', 'deron-chatbot__composer');
 this.inputEl = createEl('textarea', 'deron-chatbot__input');
 this.inputEl.rows = 1;
 this.inputEl.maxLength = MAX_MESSAGE_LENGTH;
 this.inputEl.setAttribute('aria-label', copy[this.locale].input);
 this.inputEl.placeholder = copy[this.locale].input;
 this.inputEl.addEventListener('keydown', this.onInputKeydown.bind(this));
 var send = createEl('button', 'deron-chatbot__send', copy[this.locale].send);
 send.type = 'submit';
 composer.appendChild(this.inputEl);
 composer.appendChild(send);
 composer.addEventListener('submit', this.onSubmit.bind(this));

 panel.appendChild(header);
 panel.appendChild(body);
 var footer = createEl('div');
 footer.appendChild(this.quickActionsEl);
 footer.appendChild(composer);
 panel.appendChild(footer);

 var toggle = createEl('button', 'deron-chatbot__toggle');
 toggle.type = 'button';
 toggle.setAttribute('aria-label', copy[this.locale].open);
 var logo = document.createElement('img');
 logo.className = 'deron-chatbot__toggle-logo';
 logo.src = '/public/Deron-logo-light.png';
 logo.alt = '';
 logo.setAttribute('aria-hidden', 'true');
 logo.onerror = function () {
 toggle.textContent = 'D';
 toggle.style.fontWeight = '800';
 toggle.style.fontSize = '20px';
 };
 toggle.appendChild(logo);
 toggle.addEventListener('click', this.toggle.bind(this));

 this.root.appendChild(panel);
 this.root.appendChild(toggle);
 document.body.appendChild(this.root);

 if (!this.messages.length) {
 this.messages.push({
 role: 'assistant',
 text: copy[this.locale].welcome,
 ctas: []
 });
 saveMessages(this.messages);
 }
 this.render();
 this.bindLocaleObservers();

 try {
 if (sessionStorage.getItem(SESSION_OPEN_KEY) === '1') this.open();
 } catch (_) { }
 };

 ChatbotWidget.prototype.bindLocaleObservers = function () {
 var self = this;
 window.addEventListener('storage', function (event) {
 if (event.key === 'deron_lang' || event.key === 'deron-language') self.updateLocale();
 });
 if (window.MutationObserver) {
 var observer = new MutationObserver(function () {
 self.updateLocale();
 });
 observer.observe(document.documentElement, { attributes: true, attributeFilter: ['lang'] });
 document.querySelectorAll('.lang-dropdown-item, .mobile-lang-btn').forEach(function (item) {
 observer.observe(item, { attributes: true, attributeFilter: ['class'] });
 });
 }
 };

 ChatbotWidget.prototype.updateLocale = function () {
 var next = detectLocale();
 if (!next || next === this.locale) return;
 var previousWelcome = copy[this.locale] && copy[this.locale].welcome;
 this.locale = next;
 if (this.messages.length === 1 && this.messages[0].role === 'assistant' && this.messages[0].text === previousWelcome) {
 this.messages[0].text = copy[this.locale].welcome;
 saveMessages(this.messages);
 this.messagesEl.textContent = '';
 this.messages.forEach(renderMessage.bind(null, this.messagesEl));
 }
 this.root.setAttribute('aria-label', copy[this.locale].title);
 this.renderChrome();
 };

 ChatbotWidget.prototype.renderChrome = function () {
 var localeCopy = copy[this.locale];
 var title = this.root.querySelector('.deron-chatbot__title');
 var subtitle = this.root.querySelector('.deron-chatbot__subtitle');
 var toggle = this.root.querySelector('.deron-chatbot__toggle');
 var buttons = this.root.querySelectorAll('.deron-chatbot__icon-button');
 var send = this.root.querySelector('.deron-chatbot__send');
 if (title) title.textContent = localeCopy.title;
 if (subtitle) subtitle.textContent = localeCopy.subtitle;
 if (toggle) toggle.setAttribute('aria-label', localeCopy.open);
 if (buttons[0]) buttons[0].setAttribute('aria-label', localeCopy.minimize);
 if (buttons[1]) buttons[1].setAttribute('aria-label', localeCopy.close);
 if (send) send.textContent = localeCopy.send;
 if (this.inputEl) {
 this.inputEl.placeholder = localeCopy.input;
 this.inputEl.setAttribute('aria-label', localeCopy.input);
 }
 this.renderQuickActions();
 };

 ChatbotWidget.prototype.renderQuickActions = function () {
 var self = this;
 var actions = copy[this.locale].quickActions;
 this.quickActionsEl.textContent = '';
 actions.forEach(function (label) {
 var button = createEl('button', 'deron-chatbot__quick', label);
 button.type = 'button';
 button.addEventListener('click', function () {
 self.sendMessage(label);
 });
 self.quickActionsEl.appendChild(button);
 });
 };

 ChatbotWidget.prototype.render = function () {
 this.messagesEl.textContent = '';
 this.messages.forEach(renderMessage.bind(null, this.messagesEl));
 this.renderChrome();
 this.scrollToBottom();
 };

 ChatbotWidget.prototype.scrollToBottom = function () {
 var body = this.root && this.root.querySelector('.deron-chatbot__body');
 if (body) body.scrollTop = body.scrollHeight;
 };

 ChatbotWidget.prototype.open = function () {
 this.isOpen = true;
 this.root.classList.add('is-open');
 try { sessionStorage.setItem(SESSION_OPEN_KEY, '1'); } catch (_) { }
 this.updateLocale();
 setTimeout(function (input) {
 if (input) input.focus();
 }, 40, this.inputEl);
 };

 ChatbotWidget.prototype.close = function () {
 this.isOpen = false;
 this.root.classList.remove('is-open');
 try { sessionStorage.setItem(SESSION_OPEN_KEY, '0'); } catch (_) { }
 };

 ChatbotWidget.prototype.toggle = function () {
 if (this.isOpen) this.close();
 else this.open();
 };

 ChatbotWidget.prototype.onInputKeydown = function (event) {
 if (event.key === 'Enter' && !event.shiftKey) {
 event.preventDefault();
 this.onSubmit(event);
 }
 if (event.key === 'Escape') {
 this.close();
 }
 };

 ChatbotWidget.prototype.onSubmit = function (event) {
 event.preventDefault();
 if (!this.inputEl || this.isSending) return;
 var message = this.inputEl.value.trim();
 this.inputEl.value = '';
 this.sendMessage(message);
 };

 ChatbotWidget.prototype.addMessage = function (message) {
 this.messages.push(message);
 this.messages = this.messages.slice(-30);
 saveMessages(this.messages);
 renderMessage(this.messagesEl, message);
 this.scrollToBottom();
 };

 ChatbotWidget.prototype.showError = function (text) {
 this.addMessage({ role: 'error', text: text, ctas: [] });
 };

 ChatbotWidget.prototype.sendMessage = function (message) {
 var self = this;
 var clean = String(message || '').trim();
 var locale = detectLocale(clean);
 var localeCopy = copy[locale] || copy.en;
 if (!clean) {
 this.showError(localeCopy.empty);
 return;
 }
 if (clean.length > MAX_MESSAGE_LENGTH) {
 this.showError(localeCopy.tooLong);
 return;
 }

 this.locale = locale;
 this.renderChrome();
 this.addMessage({ role: 'user', text: clean, ctas: [] });
 this.isSending = true;
 renderTyping(this.messagesEl, locale);
 this.scrollToBottom();

 this.client.send(clean, locale).then(function (response) {
 removeTyping(self.messagesEl);
 var text = String(response && response.text ? response.text : localeCopy.unknown);
 self.addMessage({
 role: 'assistant',
 text: text,
 ctas: response.ctas || []
 });
 logEvent({
 sessionId: getSessionId(),
 locale: locale,
 pagePath: location.pathname || '/',
 intent: response.intent || 'unknown',
 messageLength: clean.length,
 responseSource: response.source || 'mock',
 securityFlags: response.securityFlags || []
 });
 }).catch(function () {
 removeTyping(self.messagesEl);
 var routed = routeIntent(clean);
 self.addMessage({
 role: 'assistant',
 text: localeCopy.backendUnavailable,
 ctas: ctaForIntent(routed.intent, locale)
 });
 logEvent({
 sessionId: getSessionId(),
 locale: locale,
 pagePath: location.pathname || '/',
 intent: routed.intent,
 messageLength: clean.length,
 responseSource: 'fallback',
 securityFlags: routed.securityFlags || []
 });
 }).finally(function () {
 self.isSending = false;
 });
 };

 function loadNavigationMap() {
 window.DeronChatbotNavigation = defaultNavigationMap;
 if (typeof fetch !== 'function') return Promise.resolve();
 return fetch(NAVIGATION_MAP_URL, { credentials: 'same-origin' })
 .then(function (response) {
 if (!response.ok) return;
 return response.json();
 })
 .then(function (map) {
 if (map && typeof map === 'object') {
 window.DeronChatbotNavigation = Object.assign({}, defaultNavigationMap, map);
 }
 })
 .catch(function () { });
 }

 function init() {
 loadNavigationMap().finally(function () {
 var widget = new ChatbotWidget();
 widget.init();
 window.DeronChatbot.widget = widget;
 });
 }

 window.DeronChatbot = {
 detectLocale: detectLocale,
 routeIntent: routeIntent,
 createProvider: createProvider,
 MockChatProvider: MockChatProvider,
 FutureBackendProvider: FutureBackendProvider,
 logEvent: logEvent,
 constants: {
 maxMessageLength: MAX_MESSAGE_LENGTH,
 supportedLocales: SUPPORTED_LOCALES.slice()
 }
 };

 if (document.readyState === 'loading') {
 document.addEventListener('DOMContentLoaded', init, { once: true });
 } else {
 init();
 }
})();
