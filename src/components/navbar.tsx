"use client";

import Image from "next/image";
import Link from "next/link";
import {
  Search,
  ChevronDown,
  ShoppingCart,
  Menu,
  Flag,
  Pin,
  LogOut,
  User,
} from "lucide-react";
import { AnimatePresence, motion } from "framer-motion";

import { useEffect, useState, useRef } from "react";
import { useRouter } from "next/navigation";
import {
  AUTH_EVENT_NAME,
  clearAuthToken,
  getAuthToken,
  getUserRoleFromToken,
  logoutUser,
} from "@/lib/auth";
import avatar from "./avatar";
import Avatar from "./avatar";

const categories = [
  "Rempah-rempah",
  "Hasil Bumi",
  "Perkebunan",
  "Hortikultura",
  "Perikanan",
  "Peternakan",
  "Kopi",
  "Kakao",
  "Jagung",
  "Padi",
];

type AuthUser = {
  name: string;
  email: string;
  avatar: string;
  isSupplier?: boolean;
};

const DEFAULT_AVATAR = "/avatar.png";

function decodeJwtPayload(token: string) {
  try {
    const payload = token.split(".")[1];

    if (!payload) {
      return null;
    }

    const normalized = payload.replace(/-/g, "+").replace(/_/g, "/");
    const padded = normalized.padEnd(
      normalized.length + ((4 - (normalized.length % 4)) % 4),
      "=",
    );
    const decoded = window.atob(padded);

    return JSON.parse(decoded) as {
      email?: string;
      name?: string;
      role?: { name_role?: string } | string;
    };
  } catch {
    return null;
  }
}

export default function Navbar() {
  const router = useRouter();
  const [user, setUser] = useState<AuthUser | null>(null);
  const [showProfileMenu, setShowProfileMenu] = useState(false);
  const [isOpen, setIsOpen] = useState(false);
  const [showCategory, setShowCategory] = useState(false);
  const [activeCategory, setActiveCategory] = useState(categories[0]);
  const [isLoggingOut, setIsLoggingOut] = useState(false);

  useEffect(() => {
    const syncUser = () => {
      const token = getAuthToken();

      if (!token) {
        setUser(null);
        return;
      }

      const payload = decodeJwtPayload(token);
      const email = payload?.email ?? "";
      const name = payload?.name ?? email.split("@")[0] ?? "Pengguna";
      const roleName =
        getUserRoleFromToken(token) ??
        (typeof payload?.role === "string"
          ? payload.role
          : payload?.role?.name_role);
      const isSupplier = roleName?.toLowerCase() === "supplier";

      setUser({
        name,
        email,
        avatar: DEFAULT_AVATAR,
        isSupplier,
      });
    };

    syncUser();

    window.addEventListener("storage", syncUser);
    window.addEventListener(AUTH_EVENT_NAME, syncUser);

    return () => {
      window.removeEventListener("storage", syncUser);
      window.removeEventListener(AUTH_EVENT_NAME, syncUser);
    };
  }, []);

  const handleLogout = async () => {
    setIsLoggingOut(true);

    try {
      await logoutUser();
    } catch (error) {
      console.error("Logout failed", error);
    } finally {
      clearAuthToken();
      setUser(null);
      setShowProfileMenu(false);
      setIsOpen(false);
      setIsLoggingOut(false);
      router.push("/login");
    }
  };

  const menuRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    function handleClickOutside(e: MouseEvent) {
      if (menuRef.current && !menuRef.current.contains(e.target as Node)) {
        setShowProfileMenu(false);
      }
    }
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  return (
    <header className="sticky top-0 z-50 w-full border-b border-gray-200 bg-white">
      <div className="hidden h-9 border-b border-gray-200 bg-yellow-400 md:block">
        <div className="mx-auto flex h-full max-w-7xl items-center justify-between px-6">
          <div className="flex items-center gap-2 text-sm">
            <Flag className="h-4 w-4 text-gray-600" />
            <span className="font-semibold">ID</span>
            <ChevronDown className="h-4 w-4 -rotate-90" />
          </div>

          <div className="hidden items-center gap-8 text-sm text-gray-600 lg:flex">
            <Link href="#">Tentang Bumi Nusa</Link>
            <Link href="#">Mulai Berjualan</Link>
            <Link href="#">Bantuan</Link>
          </div>
        </div>
      </div>

      <div className="h-14">
        <div className="mx-auto flex h-full max-w-7xl items-center gap-3 px-4 md:px-6">
          <Link href="/home" className="flex shrink-0 items-center gap-3">
            <Image src="/logo.png" alt="BUMI NUSA" width={50} height={50} />
            <span className="hidden text-2xl font-bold text-green-600 sm:block">
              BUMI NUSA
            </span>
          </Link>

          <div
            className="relative hidden lg:block"
            onMouseEnter={() => setShowCategory(true)}
            onMouseLeave={() => setShowCategory(false)}
            onClick={() => setShowCategory((prev) => !prev)}
          >
            <button className="rounded-lg px-4 py-2 text-[15px] transition hover:bg-gray-100">
              Komoditas
            </button>
          </div>

          <div className="min-w-0 flex-1">
            <div className="relative">
              <Search
                className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400"
                size={20}
              />

              <input
                type="text"
                placeholder="Cari komoditas..."
                className="h-10 w-full rounded-xl border border-gray-300 pl-10 pr-3 text-sm outline-none focus:border-green-600"
              />
            </div>
          </div>

          <button className="rounded-lg p-2 hover:bg-gray-100">
            <ShoppingCart size={20} />
          </button>

          <div className="h-8 w-px bg-gray-300" />

          <div className="hidden items-center md:flex">
            {!user ? (
              <div className="flex items-center gap-3">
                <Link
                  href="/login"
                  className="rounded-lg border border-green-600 px-6 py-2 font-semibold text-green-600 transition-colors hover:bg-green-50"
                >
                  Masuk
                </Link>

                <Link
                  href="/register"
                  className="rounded-lg bg-green-600 px-6 py-2 font-semibold text-white transition-colors hover:bg-green-700"
                >
                  Daftar
                </Link>
              </div>
            ) : (
              <div className="relative" ref={menuRef}>
                <button
                  onClick={() => setShowProfileMenu((prev) => !prev)}
                  className="flex items-center gap-3 rounded-lg px-2 py-2 transition-colors hover:bg-gray-100"
                >
                  <Avatar name={user.name} size={40} />
                  <span className="font-medium">{user.name}</span>
                  <ChevronDown
                    size={18}
                    className={`transition-transform duration-200 ${
                      showProfileMenu ? "rotate-180" : ""
                    }`}
                  />
                </button>

                <AnimatePresence>
                  {showProfileMenu && (
                    <motion.div
                      initial={{ opacity: 0, y: -8, scale: 0.98 }}
                      animate={{ opacity: 1, y: 0, scale: 1 }}
                      exit={{ opacity: 0, y: -8, scale: 0.98 }}
                      transition={{ duration: 0.15, ease: "easeOut" }}
                      className="absolute right-0 z-50 mt-2 w-64 origin-top-right overflow-hidden rounded-xl border border-gray-200 bg-white shadow-xl"
                    >
                      <div className="flex items-center gap-3 border-b border-gray-100 px-5 py-4">
                        <Avatar name={user.name} size={44} />
                        <div className="min-w-0">
                          <p className="truncate font-semibold text-gray-900">
                            {user.name}
                          </p>
                          {user.email && (
                            <p className="truncate text-sm text-gray-500">
                              {user.email}
                            </p>
                          )}
                        </div>
                      </div>

                      <div className="py-1">
                        <Link
                          href={
                            user?.isSupplier ? "/suplier/profile" : "/profile"
                          }
                          onClick={() => setShowProfileMenu(false)}
                          className="flex items-center gap-3 px-5 py-3 text-gray-700 transition-colors hover:bg-gray-50"
                        >
                          <User size={18} />
                          Profil Saya
                        </Link>

                        <button
                          onClick={handleLogout}
                          disabled={isLoggingOut}
                          className="flex w-full items-center gap-3 px-5 py-3 text-left text-red-600 transition-colors hover:bg-red-50 disabled:opacity-50"
                        >
                          <LogOut size={18} />
                          {isLoggingOut ? "Keluar..." : "Logout"}
                        </button>
                      </div>
                    </motion.div>
                  )}
                </AnimatePresence>
              </div>
            )}
          </div>

          <button
            onClick={() => setIsOpen((prev) => !prev)}
            className="rounded-lg p-2 hover:bg-gray-100 md:hidden"
          >
            <Menu size={22} />
          </button>
        </div>
      </div>

      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, y: -15 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -15 }}
            transition={{ duration: 0.2, ease: "easeOut" }}
            className="absolute left-0 right-0 top-full z-50 border-b border-gray-100 bg-white shadow-lg md:hidden"
          >
            <div className="flex flex-col space-y-2 px-4 py-4">
              <Link
                href="/komoditas"
                onClick={() => setIsOpen(false)}
                className="rounded-xl px-4 py-3 text-sm font-medium text-gray-700 transition-colors hover:bg-gray-50 hover:text-green-600"
              >
                Komoditas
              </Link>

              <div className="my-1 h-px bg-gray-100" />

              {!user ? (
                <div className="flex flex-col space-y-2 pt-1">
                  <Link
                    href="/login"
                    onClick={() => setIsOpen(false)}
                    className="rounded-xl border border-green-600 px-4 py-2.5 text-center text-sm font-semibold text-green-600 hover:bg-green-50 active:bg-green-100"
                  >
                    Masuk
                  </Link>

                  <Link
                    href="/register"
                    onClick={() => setIsOpen(false)}
                    className="rounded-xl bg-green-600 px-4 py-2.5 text-center text-sm font-semibold text-white shadow-sm shadow-green-200 hover:bg-green-700 active:bg-green-800"
                  >
                    Daftar
                  </Link>
                </div>
              ) : (
                <div className="flex flex-col space-y-2 pt-1">
                  <div className="rounded-xl bg-gray-50 px-4 py-3 text-sm">
                    <p className="font-semibold text-gray-800">{user.name}</p>
                    <p className="text-gray-500">{user.email}</p>
                  </div>

                  <Link
                    href={user?.isSupplier ? "/suplier/profile" : "/profile"}
                    onClick={() => setIsOpen(false)}
                    className="flex items-center gap-3 rounded-xl px-4 py-3 text-sm font-medium text-gray-700 hover:bg-gray-50 hover:text-green-600"
                  >
                    <User size={18} />
                    Profil Saya
                  </Link>

                  <button
                    onClick={handleLogout}
                    disabled={isLoggingOut}
                    className="flex w-full items-center gap-3 rounded-xl px-4 py-3 text-left text-sm font-medium text-red-600 hover:bg-red-50"
                  >
                    <LogOut size={18} />
                    {isLoggingOut ? "Keluar..." : "Logout"}
                  </button>
                </div>
              )}
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      <AnimatePresence>
        {showCategory && (
          <motion.div
            initial={{ opacity: 0, y: -8 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -8 }}
            transition={{ duration: 0.15 }}
            onMouseEnter={() => setShowCategory(true)}
            onMouseLeave={() => setShowCategory(false)}
            className="absolute left-0 right-0 top-full z-50 border-t border-gray-200 bg-white shadow-xl"
          >
            <div className="mx-auto flex max-w-7xl">
              <div className="w-72 border-r border-gray-200 py-5">
                {categories.map((category) => (
                  <button
                    key={category}
                    onMouseEnter={() => setActiveCategory(category)}
                    className={`block w-full px-6 py-3 text-left text-sm transition ${
                      activeCategory === category
                        ? "bg-gray-100 font-semibold"
                        : "hover:bg-gray-50"
                    }`}
                  >
                    {category}
                  </button>
                ))}
              </div>

              <div className="flex-1 p-8">
                <h2 className="text-3xl font-bold">{activeCategory}</h2>
                <p className="mt-3 text-gray-500">
                  Berbagai komoditas rempah berkualitas dari seluruh Indonesia.
                </p>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </header>
  );
}
