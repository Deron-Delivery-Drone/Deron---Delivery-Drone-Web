// firebase.js
// Hiện tại: dùng localStorage để lưu nội dung & setting.
// Sau này có Firebase thì chỉ cần thay các hàm phía dưới.

const STORAGE_KEYS = {
  published: "deron-published-content",
  draft: "deron-draft-content",
  settings: "deron-settings",
};

// Helper async giả lập
const storage = {
  async get(key) {
    if (typeof window === "undefined") return null;
    const raw = window.localStorage.getItem(key);
    if (!raw) return null;
    try {
      return JSON.parse(raw);
    } catch {
      return null;
    }
  },
  async set(key, value) {
    if (typeof window === "undefined") return;
    window.localStorage.setItem(key, JSON.stringify(value));
  },
};

/* ===== Public APIs dùng trong App.js ===== */

export async function loadPublishedContent() {
  return storage.get(STORAGE_KEYS.published);
}

export async function savePublishedContent(content) {
  return storage.set(STORAGE_KEYS.published, content);
}

export async function loadDraftContent() {
  return storage.get(STORAGE_KEYS.draft);
}

export async function saveDraftContent(content) {
  return storage.set(STORAGE_KEYS.draft, content);
}

export async function loadSettings() {
  return storage.get(STORAGE_KEYS.settings);
}

export async function saveSettings(settings) {
  return storage.set(STORAGE_KEYS.settings, settings);
}

/* ===== (Optional) export thêm nếu AdminPanel cần lưu danh sách user ===== */

export { storage };
