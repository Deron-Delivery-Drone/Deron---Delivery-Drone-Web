export const translations = {
  en: {
    title: 'Deron Autonomous Command & Traffic System',
    cta: 'Download DACTS Desktop',
    login: 'Login',
    signup: 'Sign up',
    forgot: 'Forgot password',
    windows: 'Windows',
    macos: 'macOS',
    linux: 'Linux',
    comingSoon: 'Coming soon'
  },
  vi: {
    title: 'Hệ thống điều hành Deron DACTS',
    cta: 'Tải ứng dụng DACTS Desktop',
    login: 'Đăng nhập',
    signup: 'Đăng ký',
    forgot: 'Quên mật khẩu',
    windows: 'Windows',
    macos: 'macOS',
    linux: 'Linux',
    comingSoon: 'Sắp ra mắt'
  },
  zh: {
    title: 'Deron DACTS 指挥与空域系统',
    cta: '下载 DACTS 桌面版',
    login: '登录',
    signup: '注册',
    forgot: '忘记密码',
    windows: 'Windows',
    macos: 'macOS',
    linux: 'Linux',
    comingSoon: '即将推出'
  }
} as const;

export type Lang = keyof typeof translations;
