import { Search } from "lucide-react";
import { Geist, Geist_Mono } from "next/font/google";

const geistSans = Geist({
    variable: "--font-geist-sans",
    subsets: ["latin"],
});

const geistMono = Geist_Mono({
    variable: "--font-geist-mono",
    subsets: ["latin"],
});

export default function Navbar() {
    return (
         <nav className="bg-white shadow-md w-full h-20">
            <div className="h-full max-w-8xl px-6 flex items-center justify-between gap-6">

                <div className="flex items-center ml-30">
                    <img src="/logo.png" alt="Logo Bumi_nusa" className="w-20 h-20" />
                    <h1 className={`${geistSans.className} text-2xl font-bold text-[#1A3A1B] `}>
                        BUMI_NUSA
                    </h1>
                </div>

                <div className="hidden md:flex items-center ml-215 gap-10">
                    <a href="/komoditas" className={`${geistSans.className} text-base text-gray-500`}>
                        Komoditas
                    </a>
                    <a href="/supplier"  className={`${geistSans.className} text-base text-gray-500`}>
                        Supplier
                    </a>
                </div>

                <div className="flex items-center w-full max-w-xs">
                    <div className="relative w-full">
                        <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400" />
                        <input
                            type="text"
                            placeholder="Search"
                            className={`${geistSans.className} w-full pl-9 pr-3 py-2 text-sm border border-gray-300 rounded-md bg-white focus:outline-none focus:ring-1 focus:ring-black`}
                        />
                    </div>
                </div>
            </div>
        </nav>
    );
}