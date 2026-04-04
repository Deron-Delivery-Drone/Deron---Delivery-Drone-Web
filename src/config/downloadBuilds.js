const byPlatform = {
  windows: process.env.REACT_APP_DOWNLOAD_WINDOWS_URL,
  macos: process.env.REACT_APP_DOWNLOAD_MAC_URL,
  linux: process.env.REACT_APP_DOWNLOAD_LINUX_URL,
  ipad: process.env.REACT_APP_DOWNLOAD_IPAD_URL,
  iphone: process.env.REACT_APP_DOWNLOAD_IPHONE_URL,
  android_phone: process.env.REACT_APP_DOWNLOAD_ANDROID_PHONE_URL,
  android_tablet: process.env.REACT_APP_DOWNLOAD_ANDROID_TABLET_URL,
};

export const DOWNLOAD_BUILDS = Object.entries(byPlatform).reduce((acc, [platform, url]) => {
  acc[platform] = {
    url: url || null,
    available: Boolean(url),
  };
  return acc;
}, {});
