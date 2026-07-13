"use client";

import React, { useState } from "react";
import { MENU_ITEMS } from "@/lib/dashboard-constants";
import {
  ChevronLeft,
  ChevronRight,
  LogOut,
  HelpCircle,
  Shield,
  Zap,
} from "lucide-react";

export function Sidebar() {
  const [collapsed, setCollapsed] = useState(false);
  const [activeItem, setActiveItem] = useState("Dashboard");

  return (
    <aside
      className={`fixed left-0 top-0 h-screen bg-[#0F172A] flex flex-col z-40 transition-all duration-300 ease-in-out ${
        collapsed ? "w-20" : "w-[260px]"
      }`}
    >
      {/* Brand */}
      <div className="flex items-center justify-between px-5 h-[72px] border-b border-white/10">
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-[#3B82F6] to-[#1D4ED8] flex items-center justify-center text-white font-bold text-sm shadow-lg shadow-blue-500/30">
            <Zap size={20} />
          </div>
          {!collapsed && (
            <div>
              <div className="font-bold text-white tracking-wide text-sm">
                BUMI NUSA
              </div>
              <div className="text-[10px] text-blue-400 font-medium">
                Enterprise Platform
              </div>
            </div>
          )}
        </div>
        <button
          onClick={() => setCollapsed(!collapsed)}
          className="p-1.5 rounded-lg hover:bg-white/10 transition-all hidden lg:flex text-gray-400 hover:text-white"
        >
          {collapsed ? <ChevronRight size={16} /> : <ChevronLeft size={16} />}
        </button>
      </div>

      {/* Menu Sections */}
      <nav className="flex-1 overflow-y-auto py-4 px-3 scrollbar-hide">
        {/* Main Menu */}
        {!collapsed && (
          <div className="px-3 mb-2 text-[10px] font-semibold text-gray-500 uppercase tracking-widest">
            Menu Utama
          </div>
        )}

        {MENU_ITEMS.slice(0, 4).map((item) => (
          <div
            key={item.label}
            onClick={() => setActiveItem(item.label)}
            className={`flex items-center gap-3 px-3 py-2.5 rounded-lg text-sm font-medium transition-all duration-200 cursor-pointer mb-1 ${
              activeItem === item.label
                ? "bg-[#3B82F6] text-white shadow-lg shadow-blue-500/30"
                : "text-gray-400 hover:bg-white/10 hover:text-white"
            }`}
          >
            <item.icon size={18} strokeWidth={2} />
            {!collapsed && <span>{item.label}</span>}
          </div>
        ))}

        {/* Management Section */}
        {!collapsed && (
          <div className="px-3 mb-2 mt-6 text-[10px] font-semibold text-gray-500 uppercase tracking-widest">
            Manajemen
          </div>
        )}

        {MENU_ITEMS.slice(4).map((item) => (
          <div
            key={item.label}
            onClick={() => setActiveItem(item.label)}
            className={`flex items-center gap-3 px-3 py-2.5 rounded-lg text-sm font-medium transition-all duration-200 cursor-pointer mb-1 ${
              activeItem === item.label
                ? "bg-[#3B82F6] text-white shadow-lg shadow-blue-500/30"
                : "text-gray-400 hover:bg-white/10 hover:text-white"
            }`}
          >
            <item.icon size={18} strokeWidth={2} />
            {!collapsed && <span>{item.label}</span>}
          </div>
        ))}
      </nav>

      {/* Bottom Section */}
      <div className="p-3 border-t border-white/10">
        {/* Help & Support */}
        {!collapsed ? (
          <div className="bg-gradient-to-br from-blue-500/20 to-blue-600/20 rounded-xl p-4 mb-3">
            <div className="flex items-center gap-3 mb-3">
              <div className="w-8 h-8 rounded-lg bg-blue-500/30 flex items-center justify-center">
                <HelpCircle size={16} className="text-blue-400" />
              </div>
              <div>
                <div className="text-xs font-semibold text-white">
                  Butuh Bantuan?
                </div>
                <div className="text-[10px] text-gray-400">
                  Hubungi support kami
                </div>
              </div>
            </div>
            <button className="w-full py-2 bg-blue-500 hover:bg-blue-600 text-white text-xs font-medium rounded-lg transition-colors">
              Hubungi Support
            </button>
          </div>
        ) : (
          <div className="flex justify-center mb-3">
            <div className="w-10 h-10 rounded-xl bg-blue-500/20 flex items-center justify-center hover:bg-blue-500/30 cursor-pointer transition-all">
              <HelpCircle size={18} className="text-blue-400" />
            </div>
          </div>
        )}

        {/* User Profile */}
        {!collapsed ? (
          <div className="flex items-center gap-3 px-3 py-3 rounded-xl hover:bg-white/10 cursor-pointer transition-all">
            <div className="w-9 h-9 rounded-full bg-gradient-to-br from-emerald-400 to-emerald-600 flex items-center justify-center text-white font-semibold text-xs">
              AD
            </div>
            <div className="flex-1 min-w-0">
              <div className="text-sm font-semibold text-white truncate">
                Admin Utama
              </div>
              <div className="flex items-center gap-1 text-xs text-gray-400">
                <Shield size={10} />
                <span>Super Admin</span>
              </div>
            </div>
            <LogOut size={16} className="text-gray-400 hover:text-white transition-colors" />
          </div>
        ) : (
          <div className="flex justify-center">
            <div className="w-10 h-10 rounded-full bg-gradient-to-br from-emerald-400 to-emerald-600 flex items-center justify-center text-white font-semibold text-xs cursor-pointer hover:scale-110 transition-transform">
              AD
            </div>
          </div>
        )}
      </div>
    </aside>
  );
}
