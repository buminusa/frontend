import { UnauthorizedError } from "./api";

const MESSAGE_MAP: Record<string, string> = {
  "Please fill all the fields": "Lengkapi semua kolom yang wajib diisi",
  "Invalid email or password": "Email atau password salah",
  "email Already exists": "Email sudah terdaftar",
  "Email already registered": "Email sudah terdaftar",
  "User not found": "Pengguna tidak ditemukan",
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

// Menangkap status HTTP yang tertanam di pesan error, misalnya
// "Request failed with status 500" (src/lib/api/api.ts) atau
// "Request gagal (500)" (src/lib/api/api.ts).
function parseStatusFromMessage(message: string): number | null {
  if (message.startsWith("Request failed with status ")) {
    const status = Number(message.slice("Request failed with status ".length).trim());
    return Number.isFinite(status) ? status : null;
  }

  if (message.startsWith("Request gagal (")) {
    const status = Number(message.slice("Request gagal (".length, -1));
    return Number.isFinite(status) ? status : null;
  }

  return null;
}

export function getErrorMessage(error: unknown, fallback = GENERIC_MESSAGE): string {
  if (error instanceof UnauthorizedError) {
    return "Sesi Anda telah berakhir. Silakan masuk kembali";
  }

  // Gagal jaringan (fetch) melempar TypeError dengan pesan teknis seperti
  // "Failed to fetch" — jangan tampilkan mentah ke pengguna.
  if (error instanceof TypeError) {
    return fallback;
  }

  if (error instanceof Error) {
    const message = error.message.trim();

    if (!message) return fallback;

    const status = parseStatusFromMessage(message);
    if (status !== null) return mapByStatus(status);

    if (message in MESSAGE_MAP) {
      return MESSAGE_MAP[message];
    }

    // Pesan error dari backend ditampilkan apa adanya agar informasi tidak
    // hilang (backend sebagian besar sudah berbahasa Indonesia).
    return message;
  }

  return fallback;
}