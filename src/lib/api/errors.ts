import { UnauthorizedError } from "./api";

const MESSAGE_MAP: Record<string, string> = {
  "Please fill all the fields": "Lengkapi semua kolom yang wajib diisi",
  "Invalid email or password": "Email atau password salah",
  "email Already exists": "Email sudah terdaftar",
  "Email already registered": "Email sudah terdaftar",
  "User not found": "Pengguna tidak ditemukan",
  "Token verifikasi tidak ditemukan": "Token verifikasi tidak ditemukan",
  "Token verifikasi tidak valid atau sudah kedaluwarsa": "Token verifikasi tidak valid atau sudah kedaluwarsa",
  "Internal server error": "Terjadi kesalahan pada server. Silakan coba lagi",
  "Not authorized": "Anda tidak memiliki akses untuk melakukan tindakan ini",
  "Forbidden": "Anda tidak memiliki izin untuk mengakses sumber daya ini",
  "Failed to fetch profile": "Gagal memuat profil",
  "Failed to update profile": "Gagal memperbarui profil",
  "An error occurred": "Terjadi kesalahan. Silakan coba lagi",
};

const GENERIC_MESSAGE = "Terjadi kesalahan. Silakan coba lagi.";

function mapByStatus(status: number): string {
  switch (status) {
    case 400:
      return "Permintaan tidak valid. Periksa kembali data Anda";
    case 401:
      return "Sesi Anda telah berakhir. Silakan masuk kembali";
    case 403:
      return "Anda tidak memiliki izin untuk melakukan tindakan ini";
    case 404:
      return "Data tidak ditemukan";
    case 429:
      return "Terlalu banyak permintaan. Silakan coba lagi beberapa saat";
    default:
      if (status >= 500) return "Terjadi kesalahan pada server. Silakan coba lagi";
      return GENERIC_MESSAGE;
  }
}

export function getErrorMessage(error: unknown, fallback = GENERIC_MESSAGE): string {
  if (error instanceof UnauthorizedError) {
    return "Sesi Anda telah berakhir. Silakan masuk kembali";
  }

  if (error instanceof Error) {
    const message = error.message;

    if (message.startsWith("Request failed with status ")) {
      const status = Number(message.replace("Request failed with status ", "").trim());
      return Number.isFinite(status) ? mapByStatus(status) : GENERIC_MESSAGE;
    }

    if (message in MESSAGE_MAP) {
      return MESSAGE_MAP[message];
    }

    const isEnglishOnly = /^[a-z0-9\s.,'!?-]*$/i.test(message);
    return isEnglishOnly && message.length > 0 ? fallback : message;
  }

  return fallback;
}