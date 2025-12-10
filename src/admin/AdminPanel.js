// admin/AdminPanel.js
import React, { useEffect, useState } from "react";
import { Settings, Save, LogOut, Users, User, X } from "lucide-react";
import { storage } from "../firebase";

/*
  Props:
    - draftContent, setDraftContent
    - onPublish()
    - currentUser
    - onLogout()
    - language, setLanguage
    - darkMode, toggleDarkMode
*/

export default function AdminPanel({
  draftContent,
  setDraftContent,
  onPublish,
  currentUser,
  onLogout,
  language,
  setLanguage,
  darkMode,
  toggleDarkMode,
}) {
  const [activeTab, setActiveTab] = useState("hero");
  const [showUsers, setShowUsers] = useState(false);
  const [users, setUsers] = useState([]);
  const [newUserEmail, setNewUserEmail] = useState("");

  // load danh sách user (demo) từ localStorage
  useEffect(() => {
    async function loadUsers() {
      try {
        const result = await storage.get("deron-users");
        if (result) setUsers(result);
      } catch {
        setUsers([]);
      }
    }
    loadUsers();
  }, []);

  const addUser = async () => {
    if (!newUserEmail || !newUserEmail.includes("@")) return;

    const newUser = {
      email: newUserEmail.trim(),
      role: "editor",
      addedBy: currentUser?.email || "admin",
      addedAt: new Date().toISOString(),
    };

    const updated = [...users, newUser];
    await storage.set("deron-users", updated);
    setUsers(updated);
    setNewUserEmail("");
  };

  const removeUser = async (email) => {
    const updated = users.filter((u) => u.email !== email);
    await storage.set("deron-users", updated);
    setUsers(updated);
  };

  const handleChange = (section, field, value, subfield = null) => {
    setDraftContent((prev) => {
      const updated = { ...prev };
      if (subfield) {
        updated[section] = {
          ...updated[section],
          [field]: {
            ...updated[section][field],
            [subfield]: value,
          },
        };
      } else {
        updated[section] = {
          ...updated[section],
          [field]: value,
        };
      }
      return updated;
    });
  };

  const handleStatelessChange = (section, value) => {
    // dự phòng nếu muốn thêm block khác
    setDraftContent((prev) => ({ ...prev, [section]: value }));
  };

  const tabButtonClass = (tab) =>
    `py-3 px-3 border-b-2 transition-colors text-sm ${
      activeTab === tab
        ? "border-red-600 text-red-600 font-semibold"
        : "border-transparent text-gray-600 hover:text-gray-900"
    }`;

  return (
    <div className="fixed inset-0 bg-white z-50 overflow-y-auto">
      {/* Header */}
      <div className="bg-gray-900 text-white px-6 py-4">
        <div className="max-w-7xl mx-auto flex justify-between items-center">
          <div className="flex items-center space-x-4">
            <Settings className="h-6 w-6" />
            <h1 className="text-xl font-bold">Deron Admin Control Center</h1>
          </div>

          <div className="flex items-center space-x-3 text-sm">
            {/* Language quick switch */}
            <div className="hidden md:flex items-center space-x-1 mr-4">
              {["vi", "en", "zh"].map((code) => (
                <button
                  key={code}
                  onClick={() => setLanguage(code)}
                  className={`px-2 py-1 rounded text-xs ${
                    language === code ? "bg-white text-gray-900" : "bg-gray-700"
                  }`}
                >
                  {code.toUpperCase()}
                </button>
              ))}
            </div>

            {/* Dark mode */}
            <button
              onClick={toggleDarkMode}
              className="px-3 py-1 bg-gray-800 rounded text-xs"
            >
              {darkMode ? "Dark" : "Light"}
            </button>

            {/* Users */}
            <button
              onClick={() => setShowUsers(true)}
              className="flex items-center space-x-2 px-3 py-2 bg-gray-800 hover:bg-gray-700 rounded"
            >
              <Users className="h-4 w-4" />
              <span>Users</span>
            </button>

            {/* Save / Publish */}
            <button
              onClick={onPublish}
              className="flex items-center space-x-2 px-4 py-2 bg-red-600 hover:bg-red-700 rounded"
            >
              <Save className="h-4 w-4" />
              <span>Save & Publish</span>
            </button>

            {/* Current user */}
            <div className="flex items-center space-x-2">
              <User className="h-4 w-4" />
              <span>{currentUser?.email}</span>
            </div>

            {/* Logout */}
            <button onClick={onLogout} className="p-2 hover:bg-gray-800 rounded">
              <LogOut className="h-5 w-5" />
            </button>
          </div>
        </div>
      </div>

      {/* User Management Modal */}
      {showUsers && (
        <div className="fixed inset-0 bg-black/40 flex items-center justify-center z-50">
          <div className="bg-white rounded-lg p-6 max-w-2xl w-full mx-4 max-h-[80vh] overflow-y-auto">
            <div className="flex justify-between items-center mb-6">
              <h2 className="text-2xl font-bold">User Management (demo)</h2>
              <button onClick={() => setShowUsers(false)}>
                <X className="h-6 w-6" />
              </button>
            </div>

            <div className="mb-6">
              <label className="block text-sm font-medium mb-2">
                Add new user (email)
              </label>
              <div className="flex space-x-2">
                <input
                  type="email"
                  value={newUserEmail}
                  onChange={(e) => setNewUserEmail(e.target.value)}
                  placeholder="user@example.com"
                  className="flex-1 px-3 py-2 border border-gray-300 rounded focus:outline-none focus:border-red-600"
                />
                <button
                  onClick={addUser}
                  className="px-4 py-2 bg-red-600 text-white rounded hover:bg-red-700"
                >
                  Add
                </button>
              </div>
              <p className="text-xs text-gray-500 mt-2">
                Demo only: lưu trong localStorage trên trình duyệt này.
              </p>
            </div>

            <div>
              <h3 className="font-medium mb-3">Current Users</h3>
              <div className="space-y-2">
                {users.length === 0 ? (
                  <p className="text-sm text-gray-500">No additional users yet.</p>
                ) : (
                  users.map((u, i) => (
                    <div
                      key={i}
                      className="flex justify-between items-center p-3 bg-gray-50 rounded"
                    >
                      <div>
                        <div className="font-medium">{u.email}</div>
                        <div className="text-xs text-gray-500">
                          Added by {u.addedBy} on{" "}
                          {new Date(u.addedAt).toLocaleDateString()}
                        </div>
                      </div>
                      <button
                        onClick={() => removeUser(u.email)}
                        className="text-red-600 hover:text-red-800 text-sm"
                      >
                        Remove
                      </button>
                    </div>
                  ))
                )}
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Tabs */}
      <div className="border-b">
        <div className="max-w-7xl mx-auto px-6">
          <div className="flex space-x-4">
            <button className={tabButtonClass("hero")} onClick={() => setActiveTab("hero")}>
              Hero
            </button>
            <button
              className={tabButtonClass("mission")}
              onClick={() => setActiveTab("mission")}
            >
              Mission
            </button>
            <button
              className={tabButtonClass("contact")}
              onClick={() => setActiveTab("contact")}
            >
              Contact
            </button>
          </div>
        </div>
      </div>

      {/* Content Editor */}
      <div className="max-w-7xl mx-auto px-6 py-8">
        {/* HERO */}
        {activeTab === "hero" && (
          <div className="space-y-6">
            <h2 className="text-2xl font-bold mb-4">Hero Section</h2>

            <div>
              <label className="block text-sm font-medium mb-2">Badge</label>
              <input
                type="text"
                value={draftContent.hero.badge}
                onChange={(e) => handleChange("hero", "badge", e.target.value)}
                className="w-full px-4 py-2 border border-gray-300 rounded focus:outline-none focus:border-red-600"
              />
            </div>

            <div>
              <label className="block text-sm font-medium mb-2">Title</label>
              <textarea
                rows={2}
                value={draftContent.hero.title}
                onChange={(e) => handleChange("hero", "title", e.target.value)}
                className="w-full px-4 py-2 border border-gray-300 rounded focus:outline-none focus:border-red-600"
              />
            </div>

            <div>
              <label className="block text-sm font-medium mb-2">Subtitle</label>
              <textarea
                rows={4}
                value={draftContent.hero.subtitle}
                onChange={(e) => handleChange("hero", "subtitle", e.target.value)}
                className="w-full px-4 py-2 border border-gray-300 rounded focus:outline-none focus:border-red-600"
              />
            </div>
          </div>
        )}

        {/* MISSION */}
        {activeTab === "mission" && (
          <div className="space-y-8">
            <h2 className="text-2xl font-bold">Mission Section</h2>

            <div className="space-y-4">
              <h3 className="text-lg font-semibold">The Challenge</h3>
              <div>
                <label className="block text-sm font-medium mb-2">Title</label>
                <input
                  type="text"
                  value={draftContent.mission.challenge.title}
                  onChange={(e) =>
                    handleChange("mission", "challenge", e.target.value, "title")
                  }
                  className="w-full px-4 py-2 border border-gray-300 rounded focus:outline-none focus:border-red-600"
                />
              </div>
              <div>
                <label className="block text-sm font-medium mb-2">Content</label>
                <textarea
                  rows={8}
                  value={draftContent.mission.challenge.content}
                  onChange={(e) =>
                    handleChange("mission", "challenge", e.target.value, "content")
                  }
                  className="w-full px-4 py-2 border border-gray-300 rounded focus:outline-none focus:border-red-600"
                />
              </div>
            </div>

            <div className="space-y-4">
              <h3 className="text-lg font-semibold">Our Solution</h3>
              <div>
                <label className="block text-sm font-medium mb-2">Title</label>
                <input
                  type="text"
                  value={draftContent.mission.solution.title}
                  onChange={(e) =>
                    handleChange("mission", "solution", e.target.value, "title")
                  }
                  className="w-full px-4 py-2 border border-gray-300 rounded focus:outline-none focus:border-red-600"
                />
              </div>
              <div>
                <label className="block text-sm font-medium mb-2">Content</label>
                <textarea
                  rows={8}
                  value={draftContent.mission.solution.content}
                  onChange={(e) =>
                    handleChange("mission", "solution", e.target.value, "content")
                  }
                  className="w-full px-4 py-2 border border-gray-300 rounded focus:outline-none focus:border-red-600"
                />
              </div>
            </div>
          </div>
        )}

        {/* CONTACT */}
        {activeTab === "contact" && (
          <div className="space-y-6">
            <h2 className="text-2xl font-bold">Contact</h2>

            <div>
              <label className="block text-sm font-medium mb-2">Email</label>
              <input
                type="email"
                value={draftContent.contact.email}
                onChange={(e) =>
                  handleChange("contact", "email", e.target.value)
                }
                className="w-full px-4 py-2 border border-gray-300 rounded focus:outline-none focus:border-red-600"
              />
            </div>

            <div>
              <label className="block text-sm font-medium mb-2">
                Founder Name
              </label>
              <input
                type="text"
                value={draftContent.contact.founder}
                onChange={(e) =>
                  handleChange("contact", "founder", e.target.value)
                }
                className="w-full px-4 py-2 border border-gray-300 rounded focus:outline-none focus:border-red-600"
              />
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
