"use client";

import React, { useState } from "react";
import {
  Search,
  Bell,
  ChevronDown,
  Menu,
  X,
  Settings,
  User,
  LogOut,
  Moon,
  Sun,
  MessageSquare,
  Calendar,
  Maximize2,
  Minimize2,
} from "lucide-react";

export function Topbar() {
  const [searchFocused, setSearchFocused] = useState(false);
  const [searchValue, setSearchValue] = useState("");
  const [showNotifications, setShowNotifications] = useState(false);
  const [showUserMenu, setShowUserMenu] = useState(false);
  const [isDarkMode, setIsDarkMode] = useState(false);
  const [isFullscreen, setIsFullscreen] = useState(false);
  const [notificationCount] = useState(5);

  const notifications = [
    {
      id: 1,
      title: "Supplier baru mendaftar",
      desc: "PT Agro Nusantara menunggu verifikasi",
      time: "5 menit lalu",
      read: false,
      type: "info",
    },
    {
      id: 2,
      title: "Produk berhasil diverifikasi",
      desc: "Beras Organik Premium telah disetujui",
      time: "1 jam lalu",
      read: false,
      type: "success",
    },
    {
      id: 3,
      title: "Laporan mingguan tersedia",
      desc: "Laporan periode 7-13 Juli 2026",
      time: "2 jam lalu",
      read: true,
      type: "info",
    },
    {
      id: 4,
      title: "Stok produk rendah",
      desc: "Cabai Merah Segar tersisa 10 unit",
      time: "3 jam lalu",
      read: true,
      type: "warning",
    },
    {
      id: 5,
      title: "Pembayaran diterima",
      desc: "Invoice #INV-2026-001 telah dibayar",
      time: "5 jam lalu",
      read: true,
      type: "success",
    },
  ];

  const getNotificationColor = (type: string) => {
    switch (type) {
      case "success":
        return "bg-emerald-500";
      case "warning":
        return "bg-yellow-500";
      case "error":
        return "bg-red-500";
      default:
        return "bg-blue-500";
    }
  };

  const toggleFullscreen = () => {
    if (!document.fullscreenElement) {
      document.documentElement.requestFullscreen();
      setIsFullscreen(true);
    } else {
      document.exitFullscreen();
      setIsFullscreen(false);
    }
  };

  return (
    <header className="sticky top-0 z-30 bg-white border-b border-gray-200 h-[72px]">
      <div className="flex items-center justify-between h-full px-6">
        {/* Left side */}
        <div className="flex items-center gap-4">
          <button className="p-2 rounded-lg hover:bg-gray-100 transition-all lg:hidden">
            <Menu size={20} className="text-gray-600" />
          </button>

          {/* Breadcrumb */}
          <div className="hidden md:flex items-center gap-2 text-sm">
            <span className="text-gray-400">Beranda</span>
            <span className="text-gray-300">/</span>
            <span className="font-medium text-gray-900">Dashboard</span>
          </div>

          {/* Search */}
          <div
            className={`relative transition-all duration-300 ${
              searchFocused ? "w-96" : "w-72"
            }`}
          >
            <Search
              size={16}
              className={`absolute left-3.5 top-1/2 -translate-y-1/2 transition-colors ${
                searchFocused ? "text-blue-500" : "text-gray-400"
              }`}
            />
            <input
              type="text"
              placeholder="Cari supplier, produk, kategori..."
              value={searchValue}
              onChange={(e) => setSearchValue(e.target.value)}
              onFocus={() => setSearchFocused(true)}
              onBlur={() => setSearchFocused(false)}
              className={`w-full pl-10 pr-10 py-2.5 bg-gray-50 border rounded-xl text-sm text-gray-700 placeholder-gray-400 transition-all focus:outline-none ${
                searchFocused
                  ? "border-blue-500 ring-4 ring-blue-500/10 bg-white"
                  : "border-gray-200 hover:border-gray-300"
              }`}
            />
            {searchValue && (
              <button
                onClick={() => setSearchValue("")}
                className="absolute right-3 top-1/2 -translate-y-1/2 p-1 rounded-full hover:bg-gray-100"
              >
                <X size={14} className="text-gray-400" />
              </button>
            )}
          </div>
        </div>

        {/* Right side */}
        <div className="flex items-center gap-2">
          {/* Quick Actions */}
          <div className="hidden lg:flex items-center gap-1 mr-2">
            <button className="p-2.5 rounded-lg hover:bg-gray-100 transition-all text-gray-500 hover:text-gray-700">
              <Calendar size={18} />
            </button>
            <button className="p-2.5 rounded-lg hover:bg-gray-100 transition-all text-gray-500 hover:text-gray-700 relative">
              <MessageSquare size={18} />
              <span className="absolute top-2 right-2 w-2 h-2 bg-blue-500 rounded-full" />
            </button>
            <button
              onClick={toggleFullscreen}
              className="p-2.5 rounded-lg hover:bg-gray-100 transition-all text-gray-500 hover:text-gray-700"
            >
              {isFullscreen ? (
                <Minimize2 size={18} />
              ) : (
                <Maximize2 size={18} />
              )}
            </button>
          </div>

          <div className="w-px h-8 bg-gray-200 mx-2 hidden lg:block" />

          {/* Dark Mode */}
          <button
            onClick={() => setIsDarkMode(!isDarkMode)}
            className="p-2.5 rounded-lg hover:bg-gray-100 transition-all text-gray-500 hover:text-gray-700"
          >
            {isDarkMode ? (
              <Sun size={18} className="text-yellow-500" />
            ) : (
              <Moon size={18} />
            )}
          </button>

          {/* Notifications */}
          <div className="relative">
            <button
              onClick={() => {
                setShowNotifications(!showNotifications);
                setShowUserMenu(false);
              }}
              className="p-2.5 rounded-lg hover:bg-gray-100 transition-all text-gray-500 hover:text-gray-700 relative"
            >
              <Bell size={18} />
              {notificationCount > 0 && (
                <span className="absolute top-1.5 right-1.5 w-5 h-5 bg-red-500 rounded-full text-[10px] text-white font-bold flex items-center justify-center">
                  {notificationCount}
                </span>
              )}
            </button>

            {/* Notification Dropdown */}
            {showNotifications && (
              <div className="absolute right-0 top-14 w-[400px] bg-white rounded-2xl shadow-2xl border border-gray-200 overflow-hidden">
                <div className="p-4 border-b border-gray-100">
                  <div className="flex items-center justify-between">
                    <h3 className="font-semibold text-gray-900">Notifikasi</h3>
                    <div className="flex items-center gap-2">
                      <button className="text-xs text-blue-600 hover:text-blue-700 font-medium px-2 py-1 hover:bg-blue-50 rounded-lg transition-colors">
                        Tandai Dibaca
                      </button>
                      <button className="p-1 rounded-lg hover:bg-gray-100">
                        <Settings size={14} className="text-gray-400" />
                      </button>
                    </div>
                  </div>
                </div>
                <div className="max-h-80 overflow-y-auto">
                  {notifications.map((notif) => (
                    <div
                      key={notif.id}
                      className={`p-4 hover:bg-gray-50 cursor-pointer transition-colors border-b border-gray-50 ${
                        !notif.read ? "bg-blue-50/50" : ""
                      }`}
                    >
                      <div className="flex items-start gap-3">
                        <div
                          className={`w-2 h-2 rounded-full mt-2 flex-shrink-0 ${getNotificationColor(
                            notif.type
                          )}`}
                        />
                        <div className="flex-1">
                          <p className="text-sm font-medium text-gray-900">
                            {notif.title}
                          </p>
                          <p className="text-xs text-gray-500 mt-0.5">
                            {notif.desc}
                          </p>
                          <p className="text-xs text-gray-400 mt-1">
                            {notif.time}
                          </p>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
                <div className="p-3 border-t border-gray-100 bg-gray-50/50">
                  <button className="w-full py-2.5 text-sm text-blue-600 hover:text-blue-700 font-medium hover:bg-blue-50 rounded-xl transition-colors">
                    Lihat Semua Notifikasi
                  </button>
                </div>
              </div>
            )}
          </div>

          <div className="w-px h-8 bg-gray-200 mx-2" />

          {/* User Menu */}
          <div className="relative">
            <div
              onClick={() => {
                setShowUserMenu(!showUserMenu);
                setShowNotifications(false);
              }}
              className="flex items-center gap-3 pl-2 pr-3 py-2 rounded-xl hover:bg-gray-100 cursor-pointer transition-all"
            >
              <div className="w-9 h-9 rounded-full bg-gradient-to-br from-[#3B82F6] to-[#1D4ED8] flex items-center justify-center text-white font-semibold text-xs shadow-md">
                AD
              </div>
              <div className="hidden sm:block">
                <div className="text-sm font-semibold text-gray-900">
                  Admin Utama
                </div>
                <div className="text-xs text-gray-500">Super Admin</div>
              </div>
              <ChevronDown
                size={16}
                className={`text-gray-400 transition-transform ${
                  showUserMenu ? "rotate-180" : ""
                }`}
              />
            </div>

            {/* User Dropdown */}
            {showUserMenu && (
              <div className="absolute right-0 top-14 w-64 bg-white rounded-2xl shadow-2xl border border-gray-200 overflow-hidden">
                <div className="p-4 border-b border-gray-100">
                  <div className="flex items-center gap-3">
                    <div className="w-12 h-12 rounded-full bg-gradient-to-br from-[#3B82F6] to-[#1D4ED8] flex items-center justify-center text-white font-bold">
                      AD
                    </div>
                    <div>
                      <p className="font-semibold text-gray-900">Admin Utama</p>
                      <p className="text-xs text-gray-500">
                        admin@buminusa.com
                      </p>
                    </div>
                  </div>
                </div>
                <div className="p-2">
                  {[
                    { icon: User, label: "Profil Saya", desc: "Kelola informasi profil" },
                    { icon: Settings, label: "Pengaturan", desc: "Preferensi akun" },
                  ].map((item) => (
                    <button
                      key={item.label}
                      className="w-full flex items-center gap-3 px-3 py-3 text-left hover:bg-gray-50 rounded-xl transition-colors"
                    >
                      <div className="w-9 h-9 rounded-lg bg-gray-100 flex items-center justify-center">
                        <item.icon size={16} className="text-gray-600" />
                      </div>
                      <div>
                        <div className="text-sm font-medium text-gray-900">
                          {item.label}
                        </div>
                        <div className="text-xs text-gray-500">{item.desc}</div>
                      </div>
                    </button>
                  ))}
                </div>
                <div className="p-2 border-t border-gray-100">
                  <button className="w-full flex items-center gap-3 px-3 py-3 text-left hover:bg-red-50 rounded-xl transition-colors group">
                    <div className="w-9 h-9 rounded-lg bg-red-100 flex items-center justify-center group-hover:bg-red-200 transition-colors">
                      <LogOut size={16} className="text-red-600" />
                    </div>
                    <div>
                      <div className="text-sm font-medium text-red-600">
                        Keluar
                      </div>
                      <div className="text-xs text-gray-500">
                        Keluar dari akun
                      </div>
                    </div>
                  </button>
                </div>
              </div>
            )}
          </div>
        </div>
      </div>

      {/* Backdrop */}
      {(showNotifications || showUserMenu) && (
        <div
          className="fixed inset-0 z-[-1]"
          onClick={() => {
            setShowNotifications(false);
            setShowUserMenu(false);
          }}
        />
      )}
    </header>
  );
}
