"use client"

import { X } from "lucide-react"

interface TermsModalProps {
  open: boolean
  onClose: () => void
}

export default function TermsModal({
  open,
  onClose,
}: TermsModalProps) {
  if (!open) return null

  return (
    <div
      className="fixed inset-0 z-[100] flex items-center justify-center bg-black/50 px-4 py-6 backdrop-blur-sm"
      onMouseDown={(e) => {
        if (e.target === e.currentTarget) {
          onClose()
        }
      }}
    >
      <div className="relative flex max-h-[90vh] w-full max-w-3xl flex-col overflow-hidden rounded-2xl bg-white shadow-2xl">

        {/* Header */}
        <div className="flex items-center justify-between border-b border-gray-200 px-6 py-4">
          <div>
            <p className="text-xs font-semibold uppercase tracking-[0.18em] text-green-600">
              BumiNusa.id
            </p>

            <h2 className="mt-1 text-xl font-bold text-gray-900">
              Syarat & Ketentuan
            </h2>
          </div>

          <button
            type="button"
            onClick={onClose}
            className="flex h-9 w-9 items-center justify-center rounded-full text-gray-500 transition hover:bg-gray-100 hover:text-gray-900"
            aria-label="Tutup"
          >
            <X size={20} />
          </button>
        </div>

        {/* Content */}
        <div className="overflow-y-auto px-6 py-6 text-sm leading-7 text-gray-600">

          <section className="mb-8">
            <h3 className="mb-3 text-base font-bold text-gray-900">
              PEMBUKA
            </h3>

            <p className="mb-3">
              Selamat datang di BumiNusa.id (“Platform”, “Kami”).
              Syarat dan Ketentuan Umum ini (“S&K”) mengatur hubungan
              hukum antara BumiNusa.id dengan setiap pihak yang mendaftar,
              mengakses, dan/atau menggunakan Platform, baik sebagai
              Supplier maupun Buyer.
            </p>

            <p className="mb-3">
              BumiNusa.id adalah platform digital yang mempertemukan
              (agregasi dan pencocokan) Supplier dan Buyer komoditas
              ekspor, impor, dan lokal.
            </p>

            <p>
              Dengan membuat akun, mencentang kotak persetujuan, dan/atau
              menggunakan Platform, Pengguna dianggap telah membaca,
              memahami, dan menyetujui untuk terikat pada seluruh isi S&K
              ini, Kebijakan Privasi, dan ketentuan lain yang menjadi satu
              kesatuan dengannya.
            </p>
          </section>

          <TermsSection
            title="PASAL 1 – DEFINISI"
            items={[
              `"Platform" atau "BumiNusa.id" adalah situs web, aplikasi, dan seluruh layanan turunannya yang dikelola oleh PT [Adi Prakarsa Korporindo], yang berfungsi sebagai sarana pertemuan (aggregator) antara Supplier dan Buyer komoditas.`,
              `"Pengguna" adalah setiap orang perseorangan atau badan usaha yang telah melakukan registrasi dan memiliki Akun pada Platform, baik berstatus sebagai Supplier maupun Buyer.`,
              `"Supplier" adalah Pengguna yang menawarkan, memasarkan, dan/atau menjual komoditas melalui Platform.`,
              `"Buyer" adalah Pengguna yang mencari, menghubungi, dan/atau membeli komoditas yang ditawarkan Supplier melalui Platform.`,
              `"Komoditas" adalah barang/produk ekspor, impor, maupun lokal yang ditawarkan Supplier melalui Platform.`,
              `"Akun" adalah akun terdaftar milik Pengguna pada Platform yang digunakan untuk mengakses fitur Platform.`,
              `"Transaksi" adalah kesepakatan jual beli Komoditas antara Supplier dan Buyer yang seluruhnya dilakukan dan diselesaikan secara langsung oleh dan antara Supplier dan Buyer di luar sistem Platform.`,
              `"Fee" atau "Komisi Layanan" adalah imbalan yang wajib dibayarkan Supplier dan/atau Buyer kepada Bumi Nusa atas jasa mempertemukan yang menghasilkan Transaksi.`,
              `"Konten" adalah seluruh informasi, data, teks, gambar, foto, sertifikat, dan dokumen lain yang diunggah dan/atau ditampilkan oleh Pengguna pada Platform.`,
              `"Kuantitas Minimum" adalah jumlah paling sedikit 100 (seratus) kilogram untuk setiap jenis Komoditas.`,
            ]}
          />

          <TermsSection
            title="PASAL 2 – RUANG LINGKUP LAYANAN PLATFORM"
            items={[
              "BumiNusa.id menyediakan sarana bagi Supplier untuk menampilkan penawaran Komoditas dan bagi Buyer untuk mencari, menyaring, dan menghubungi Supplier.",
              "Peran BumiNusa.id terbatas sebagai penyelenggara sarana informasi dan penghubung (matchmaking). BumiNusa.id bukan pihak dalam Transaksi, bukan penjual maupun pembeli Komoditas, dan bukan penyelenggara jasa sistem pembayaran.",
              "Seluruh proses negosiasi, penentuan harga akhir, kualitas, kuantitas, pembayaran, pengiriman, perizinan ekspor/impor, dan penyerahan Komoditas menjadi tanggung jawab Supplier dan Buyer.",
              "BumiNusa.id dapat menampilkan Komoditas, mengelompokkan kategori, memberikan label verifikasi dasar, dan menyediakan fitur pendukung lainnya.",
            ]}
          />

          <TermsSection
            title="PASAL 3 – PENDAFTARAN DAN AKUN PENGGUNA"
            items={[
              "Calon Pengguna wajib melakukan registrasi, memilih peran sebagai Supplier dan/atau Buyer, serta melengkapi data yang benar, akurat, terkini, dan lengkap.",
              "Supplier dapat diminta memberikan dokumen seperti identitas penanggung jawab, NIB, NPWP, izin usaha/izin edar, serta dokumen legalitas ekspor.",
              "Buyer dapat diminta memberikan identitas penanggung jawab, NPWP, dan dokumen legalitas impor.",
              "BumiNusa.id berhak melakukan verifikasi atas data dan dokumen yang diberikan.",
              "Pengguna wajib menjaga kerahasiaan kredensial Akun dan bertanggung jawab atas seluruh aktivitas melalui Akun tersebut.",
              "Satu Pengguna atau badan usaha hanya diperkenankan memiliki satu Akun aktif kecuali disetujui lain secara tertulis.",
              "Pengguna wajib memperbarui data Akun apabila terjadi perubahan.",
            ]}
          />

          <TermsSection
            title="PASAL 4 – KEWAJIBAN DAN TANGGUNG JAWAB SUPPLIER"
            items={[
              "Supplier menjamin bahwa Komoditas yang ditawarkan adalah miliknya secara sah dan/atau Supplier memiliki hak dan kewenangan penuh untuk menawarkan serta menjualnya.",
              "Supplier wajib mencantumkan deskripsi Komoditas secara benar, jelas, dan tidak menyesatkan.",
              "Supplier bertanggung jawab atas kepatuhan terhadap peraturan perundang-undangan yang berlaku.",
              "Supplier wajib merespons pertanyaan dan permintaan penawaran dari Buyer secara wajar dan itikad baik.",
              "Supplier dilarang mengunggah Konten yang melanggar hukum, hak pihak ketiga, bersifat menipu, atau menawarkan Komoditas yang dilarang/dibatasi.",
              "Supplier wajib memastikan ketersediaan stok Komoditas paling sedikit 100 kilogram untuk setiap jenis Komoditas.",
            ]}
          />

          <TermsSection
            title="PASAL 5 – KEWAJIBAN DAN TANGGUNG JAWAB BUYER"
            items={[
              "Buyer wajib melakukan komunikasi dan negosiasi dengan itikad baik.",
              "Buyer bertanggung jawab melakukan verifikasi dan uji tuntas secara mandiri atas Supplier dan Komoditas.",
              "Buyer bertanggung jawab atas kepatuhan terhadap peraturan impor, bea masuk, karantina, dan perizinan lainnya.",
              "Buyer wajib melaksanakan pembayaran kepada Supplier sesuai kesepakatan langsung antara kedua pihak.",
              "Buyer dilarang menyalahgunakan data kontak dan informasi Supplier.",
              "Setiap pembelian melalui pertemuan pada Platform tunduk pada kuantitas minimum 100 kilogram, kecuali disepakati lain secara tertulis.",
            ]}
          />

          <TermsSection
            title="PASAL 6 – MEKANISME PERTEMUAN TRANSAKSI DAN KOMUNIKASI"
            items={[
              "Platform menyediakan fitur katalog, pencarian, permintaan penawaran, dan komunikasi untuk memfasilitasi pertemuan awal.",
              "Negosiasi lanjutan, kontrak jual beli, pembayaran, Incoterms, jadwal dan metode pengiriman dilakukan secara langsung oleh Supplier dan Buyer.",
              "BumiNusa.id tidak menjadi pihak dalam kontrak atau perjanjian jual beli.",
              "Atas permintaan tertulis para pihak, BumiNusa.id dapat memfasilitasi komunikasi atau mediasi non-mengikat.",
            ]}
          />

          <TermsSection
            title="PASAL 7 – BIAYA LAYANAN, KOMISI, DAN FEE"
            items={[
              "BumiNusa.id berhak menerima Fee/Komisi Layanan dari Supplier dan/atau Buyer atas Transaksi yang terjadi sebagai hasil pertemuan melalui Platform.",
              "Besaran, skema, pihak yang dibebankan, serta tata cara pembayaran Fee diatur dalam Kebijakan Biaya Layanan BumiNusa.id.",
              "Pengguna wajib melaporkan secara jujur setiap realisasi Transaksi yang berasal dari pertemuan melalui Platform.",
              "Fee bersifat tidak dapat dikembalikan (non-refundable), kecuali ditentukan lain secara tertulis.",
              "Pajak yang timbul sehubungan dengan pembayaran Fee menjadi tanggung jawab masing-masing pihak sesuai peraturan yang berlaku.",
            ]}
          />

          <TermsSection
            title="PASAL 8 – LARANGAN TRANSAKSI DI LUAR PLATFORM"
            items={[
              "Supplier dan Buyer yang dipertemukan melalui Platform dilarang dengan sengaja mengalihkan atau melanjutkan Transaksi di luar Platform untuk menghindari pembayaran Fee selama 12 bulan sejak perkenalan pertama.",
              "Pelanggaran dapat dikenakan peringatan, penangguhan, penghentian Akun, serta penagihan Fee dan ganti rugi yang wajar.",
              "BumiNusa.id berhak meminta klarifikasi dan bukti pendukung terkait dugaan pelanggaran.",
            ]}
          />

          <TermsSection
            title="PASAL 9 – VERIFIKASI DAN KEABSAHAN DATA"
            items={[
              "BumiNusa.id dapat melakukan verifikasi dasar atas data dan dokumen Pengguna.",
              "Verifikasi tidak menjamin bahwa seluruh data, Konten, kualitas, atau legalitas Komoditas sepenuhnya benar dan akurat.",
              "Pengguna tetap bertanggung jawab dan disarankan melakukan uji tuntas tambahan secara mandiri.",
            ]}
          />

          <TermsSection
            title="PASAL 10 – KERAHASIAAN DAN PERLINDUNGAN DATA PRIBADI"
            items={[
              "BumiNusa.id mengumpulkan dan memproses data Pengguna sesuai Kebijakan Privasi dan peraturan perundang-undangan yang berlaku.",
              "Pengguna yang memperoleh data kontak pihak lain wajib menjaga kerahasiaan data tersebut dan hanya menggunakannya untuk proses Transaksi yang wajar.",
            ]}
          />

          <TermsSection
            title="PASAL 11 – HAK KEKAYAAN INTELEKTUAL"
            items={[
              "Seluruh hak kekayaan intelektual atas Platform, termasuk nama, logo, desain antarmuka, dan sistem BumiNusa.id adalah milik BumiNusa.id dan/atau pemberi lisensinya.",
              "Dengan mengunggah Konten, Pengguna memberikan lisensi non-eksklusif kepada BumiNusa.id untuk menampilkan, menggandakan, dan mendistribusikan Konten tersebut untuk pengoperasian dan promosi Platform.",
            ]}
          />

          <TermsSection
            title="PASAL 12 – BATASAN TANGGUNG JAWAB PLATFORM"
            items={[
              "BumiNusa.id tidak bertanggung jawab atas kualitas, kuantitas, keaslian, legalitas, ketepatan waktu pengiriman, maupun kesesuaian Komoditas.",
              "BumiNusa.id tidak bertanggung jawab atas kegagalan pembayaran, wanprestasi, sengketa dagang, kerugian finansial, maupun kerugian lain dari Transaksi.",
              "BumiNusa.id tidak bertanggung jawab atas gangguan teknis atau jaringan di luar kendali wajarnya.",
              "Sepanjang diizinkan peraturan yang berlaku, total tanggung jawab BumiNusa.id terbatas pada jumlah Fee yang diterima dari Transaksi yang menjadi dasar tuntutan.",
            ]}
          />

          <TermsSection
            title="PASAL 13 – PENANGGUHAN DAN PENGHENTIAN AKUN"
            items={[
              "BumiNusa.id berhak menangguhkan atau menghentikan Akun apabila Pengguna memberikan data palsu, melakukan penipuan, melanggar S&K, melanggar hukum, atau menerima keluhan berulang yang berdasar.",
              "Sebelum penghentian permanen, BumiNusa.id akan berupaya memberikan pemberitahuan dan kesempatan klarifikasi, kecuali untuk pelanggaran serius.",
              "Penangguhan atau penghentian Akun tidak menghapus kewajiban Pengguna yang telah timbul sebelumnya.",
            ]}
          />

          <TermsSection
            title="PASAL 14 – PENYELESAIAN SENGKETA"
            items={[
              "Sengketa antara Supplier dan Buyer merupakan tanggung jawab dan diselesaikan sendiri oleh kedua pihak.",
              "BumiNusa.id dapat memfasilitasi mediasi yang bersifat tidak mengikat atas permintaan para pihak.",
              "Sengketa antara Pengguna dan BumiNusa.id diselesaikan terlebih dahulu secara musyawarah. Apabila tidak tercapai kesepakatan dalam 30 hari kerja, sengketa diselesaikan melalui Pengadilan Negeri Jakarta Selatan.",
            ]}
          />

          <TermsSection
            title="PASAL 15 – KEADAAN KAHAR (FORCE MAJEURE)"
            items={[
              "BumiNusa.id dibebaskan dari tanggung jawab atas keterlambatan atau kegagalan menjalankan kewajiban akibat keadaan di luar kendali wajar, termasuk bencana alam, kebijakan pemerintah, gangguan internet berskala luas, huru-hara, atau pandemi.",
            ]}
          />

          <TermsSection
            title="PASAL 16 – PERUBAHAN KETENTUAN"
            items={[
              "BumiNusa.id berhak mengubah, menambah, atau memperbarui S&K dari waktu ke waktu.",
              "Penggunaan Platform setelah perubahan berlaku dianggap sebagai persetujuan Pengguna atas perubahan tersebut.",
            ]}
          />

          <TermsSection
            title="PASAL 17 – HUKUM YANG BERLAKU DAN YURISDIKSI"
            items={[
              "S&K ini dibuat, ditafsirkan, dan tunduk pada hukum Negara Republik Indonesia.",
              "Para pihak sepakat memilih domisili hukum di Pengadilan Negeri Jakarta Selatan.",
            ]}
          />

          <TermsSection
            title="PASAL 18 – KETENTUAN LAIN-LAIN"
            items={[
              "Apabila salah satu ketentuan dinyatakan tidak sah, ketentuan lainnya tetap berlaku.",
              "S&K ini bersama Kebijakan Privasi dan Kebijakan Biaya Layanan merupakan satu kesatuan perjanjian.",
              "S&K ini dibuat dalam Bahasa Indonesia dan versi Bahasa Indonesia berlaku apabila terdapat perbedaan penafsiran.",
            ]}
          />

          <TermsSection
            title="PASAL 19 – KONTAK"
            items={[
              "Pertanyaan, keluhan, atau pemberitahuan dapat disampaikan melalui email admin@bumnusa.id, Telepon/WhatsApp 081310599740, atau alamat QP Office Perkantoran Tanjung Mas Raya Blok B1 No.44, Jagakarsa - Jakarta Selatan.",
            ]}
          />

        </div>

        {/* Footer */}
        <div className="border-t border-gray-200 bg-gray-50 px-6 py-4">
          <button
            type="button"
            onClick={onClose}
            className="w-full rounded-full bg-green-600 py-2.5 text-sm font-semibold text-white transition hover:bg-green-700"
          >
            Saya Mengerti
          </button>
        </div>
      </div>
    </div>
  )
}

function TermsSection({
  title,
  items,
}: {
  title: string
  items: string[]
}) {
  return (
    <section className="mb-8">
      <h3 className="mb-3 text-base font-bold text-gray-900">
        {title}
      </h3>

      <ol className="space-y-2 pl-5">
        {items.map((item, index) => (
          <li key={index} className="pl-1">
            {item}
          </li>
        ))}
      </ol>
    </section>
  )
}