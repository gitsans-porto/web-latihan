import allQuestions from './questions.json'

export const STUDY_TOPICS = [
  {
    id: 'sdlc-methodology',
    title: 'Metodologi & Siklus Pengembangan Sistem (SDLC)',
    shortTitle: 'SDLC & Metodologi',
    badge: '112 Soal Terkait',
    icon: 'Layers',
    summary: 'Siklus hidup pengembangan sistem informasi mencakup tahapan inisiasi, evaluasi kelayakan, analisis kebutuhan, perancangan, implementasi, dan pemeliharaan.',
    keyPoints: [
      {
        term: 'Model Waterfall (Air Terjun)',
        explanation: 'Pendekatan sekuensial linier klasik di mana setiap fase harus diselesaikan secara penuh sebelum fase berikutnya dimulai. Cocok untuk proyek dengan kebutuhan stabil dan jelas.'
      },
      {
        term: 'Model Spiral',
        explanation: 'Fokus utamanya adalah manajemen dan mitigasi risiko secara berulang (iteratif) melalui analisis risiko berkelanjutan di setiap putaran siklus.'
      },
      {
        term: 'RUP (Rational Unified Process)',
        explanation: 'Metodologi berbasis objek yang terdiri dari 4 fase utama secara berurutan: Insepsi (konsepsi awal), Elaborasi (perancangan arsitektur), Konstruksi (pembangunan sistem), dan Transisi (penyerahan ke pengguna).'
      },
      {
        term: 'RAD (Rapid Application Development)',
        explanation: 'Prinsip kerja utamanya adalah penggunaan dan daur ulang komponen siap pakai (komponen reusable) serta pembuatan prototipe cepat untuk mempersingkat waktu pengembangan.'
      },
      {
        term: 'Extreme Programming (XP)',
        explanation: 'Metode Agile yang mengutamakan komunikasi, kesederhanaan, umpan balik cepat, keberanian, dan pair programming dengan artefak utama berupa kode program yang operasional.'
      },
      {
        term: 'Evaluasi Kelayakan (Feasibility Study)',
        explanation: 'Dilakukan pada tahap awal inisiasi proyek mencakup kelayakan teknis, operasional, ekonomi, dan legalitas untuk memastikan kelayakan investasi sistem.'
      },
      {
        term: 'CASE Tools (Computer-Aided Software Engineering)',
        explanation: 'Perangkat lunak yang membantu otomatisasi proses rekayasa sistem, dokumentasi, pembuatan diagram, hingga pembuatan kode secara otomatis.'
      }
    ]
  },
  {
    id: 'is-types',
    title: 'Jenis & Klasifikasi Sistem Informasi Organisasi',
    shortTitle: 'Klasifikasi Sistem',
    badge: '130 Soal Terkait',
    icon: 'Cpu',
    summary: 'Sistem informasi dalam organisasi dikelompokkan berdasarkan tingkatan hierarki manajerial dan fungsi operasional yang didukung.',
    keyPoints: [
      {
        term: 'TPS (Transaction Processing System)',
        explanation: 'Memproses transaksi operasional bisnis sehari-hari pada tingkat bawah organisasi (misal: pencatatan penjualan, kasir, penggajian karyawan).'
      },
      {
        term: 'SIM (Sistem Informasi Manajemen)',
        explanation: 'Menghasilkan keluaran berupa laporan manajerial berkala untuk membantu manajer tingkat menengah dalam pemantauan dan pengendalian operasional.'
      },
      {
        term: 'SPK / DSS (Sistem Pendukung Keputusan)',
        explanation: 'Membantu pengambilan keputusan masalah semi-terstruktur melalui analisis model dan simulasi data. Keputusan akhir tetap merupakan wewenang mutlak manajer (manusia).'
      },
      {
        term: 'OAS (Office Automation System)',
        explanation: 'Sistem otomasi perkantoran yang menyasar tugas administratif harian, surat-menyurat digital, pengelolaan dokumen, dan komunikasi internal.'
      },
      {
        term: 'Sistem Informasi Interorganisasional (IOS)',
        explanation: 'Sistem yang menghubungkan proses bisnis dan aliran data antar beberapa perusahaan yang berbeda (seperti rantai pasok SCM, EDI).'
      },
      {
        term: 'ERP (Enterprise Resource Planning)',
        explanation: 'Sistem terintegrasi yang menyatukan seluruh modul proses bisnis inti organisasi (keuangan, SDM, manufaktur, persediaan) ke dalam satu basis data terpusat.'
      }
    ]
  },
  {
    id: 'project-management',
    title: 'Manajemen Proyek & Penjadwalan Sistem',
    shortTitle: 'Manajemen Proyek',
    badge: '59 Soal Terkait',
    icon: 'Calendar',
    summary: 'Teknik kuantitatif untuk merencanakan alokasi sumber daya, menentukan dependensi tugas, dan mengendalikan jadwal agar proyek selesai tepat waktu.',
    keyPoints: [
      {
        term: 'Gantt Chart',
        explanation: 'Bagan visualisasi jadwal proyek berupa diagram batang horizontal di mana panjang batang merepresentasikan durasi waktu pelaksanaan tugas.'
      },
      {
        term: 'Jalur Kritis (Critical Path / CPM)',
        explanation: 'Rangkaian tugas dengan durasi terpanjang dari awal hingga akhir proyek yang tidak memiliki toleransi keterlambatan. Nilai tenggang waktu (slack time) pada jalur kritis tepat bernilai NOL.'
      },
      {
        term: 'Slack Time (Tenggang Waktu / Float)',
        explanation: 'Metrik yang mengukur toleransi kelonggaran keterlambatan suatu tugas tanpa menunda tanggal penyelesaian keseluruhan proyek.'
      },
      {
        term: 'Relasi Finish-to-Start (FS)',
        explanation: 'Aturan dependensi paling umum di mana tugas penerus (successor) hanya dapat dimulai setelah tugas pendahulu (predecessor) selesai dikerjakan.'
      },
      {
        term: 'Relasi Start-to-Start (SS)',
        explanation: 'Aturan dependensi di mana kedua tugas harus dimulai secara bersamaan.'
      },
      {
        term: 'Milestone (Tonggak Pencapaian)',
        explanation: 'Penanda pencapaian penting dalam proyek yang secara definisi memiliki durasi waktu tepat nol (0 hari).'
      }
    ]
  },
  {
    id: 'ui-ux',
    title: 'Perancangan Antarmuka & Interaksi Manusia-Komputer (IMK)',
    shortTitle: 'Desain Antarmuka & IMK',
    badge: '79 Soal Terkait',
    icon: 'Layout',
    summary: 'Prinsip desain visual dan interaksi untuk memastikan sistem mudah dipahami, intuitif, dan nyaman digunakan oleh pengguna akhir.',
    keyPoints: [
      {
        term: 'Hierarki Visual Teks',
        explanation: 'Ditentukan oleh ukuran, bobot huruf (bold/regular), dan kontras warna untuk mengarahkan pandangan mata pengguna ke informasi yang paling penting lebih dulu.'
      },
      {
        term: 'Konsistensi Antarmuka (Internal & Eksternal)',
        explanation: 'Konsistensi internal menyeragamkan elemen di seluruh halaman aplikasi, sedangkan konsistensi eksternal mengikuti standar platform umum. Tujuannya mencegah kebingungan pengguna.'
      },
      {
        term: 'Mock-up Antarmuka',
        explanation: 'Rancangan visual statis tingkat menengah hingga tinggi yang menampilkan tata letak, warna, tipografi, dan elemen visual sebelum sistem dikodekan.'
      },
      {
        term: 'Prototipe Kertas (Paper Prototype)',
        explanation: 'Coretan fisik sederhana di atas kertas untuk menguji alur interaksi dan tata letak secara cepat dan berbiaya murah pada fase awal perancangan.'
      },
      {
        term: 'Tipografi Antarmuka',
        explanation: 'Penataan jenis huruf, spasi baris, dan ukuran font yang bertujuan utama untuk meningkatkan keterbacaan teks dan mempermudah pemindaian informasi.'
      }
    ]
  },
  {
    id: 'data-modeling',
    title: 'Pemodelan Data & Basis Data Sistem',
    shortTitle: 'Pemodelan Data',
    badge: '53 Soal Terkait',
    icon: 'Database',
    summary: 'Konsep konseptual dan logika untuk mengorganisasi data organisasi menggunakan entitas, atribut, relasi, dan bahasa kueri terstruktur.',
    keyPoints: [
      {
        term: 'Entity Relationship Diagram (ERD)',
        explanation: 'Model grafis konseptual untuk menggambarkan struktur basis data melalui entitas (objek data), atribut (karakteristik), dan relasi (hubungan).'
      },
      {
        term: 'Derajat Relasi Unari',
        explanation: 'Keterhubungan rekursif yang melibatkan hanya satu entitas tunggal yang berelasi dengan dirinya sendiri (misal: pegawai mensupervisi pegawai lain).'
      },
      {
        term: 'Derajat Relasi Biner & Ternari',
        explanation: 'Relasi biner menghubungkan dua entitas berbeda (paling umum), sedangkan relasi ternari menghubungkan tiga entitas secara simultan.'
      },
      {
        term: 'Kardinalitas Relasi',
        explanation: 'Menentukan batasan jumlah pemetaan antar entitas: Satu-ke-Satu (1:1), Satu-ke-Banyak (1:N), dan Banyak-ke-Banyak (N:N, contoh: mahasiswa meminjam buku).'
      },
      {
        term: 'Perintah DDL (Data Definition Language)',
        explanation: 'Perintah terstruktur (seperti CREATE, ALTER, DROP) yang digunakan untuk mendefinisikan skema, struktur tabel, dan penyimpanan basis data.'
      }
    ]
  },
  {
    id: 'process-architecture',
    title: 'Pemodelan Proses & Arsitektur Logika Sistem',
    shortTitle: 'Pemodelan Proses',
    badge: '17 Soal Terkait',
    icon: 'Network',
    summary: 'Teknik memodelkan transformasi data, batas sistem, dan interaksi komponen fungsional dalam arsitektur sistem informasi.',
    keyPoints: [
      {
        term: 'Diagram Konteks (DFD Level 0)',
        explanation: 'Diagram tingkat tertinggi yang memodelkan ruang lingkup makro aplikasi, memetakan batas sistem dengan seluruh entitas luar (eksternal) dan aliran data utama.'
      },
      {
        term: 'DFD (Data Flow Diagram)',
        explanation: 'Model proses yang menggambarkan bagaimana data mengalir dari sumber eksternal, diproses oleh fungsi sistem, dan disimpan di penyimpan data (data store).'
      },
      {
        term: 'Dekomposisi Fungsional',
        explanation: 'Teknik memecah sistem kompleks menjadi subsistem dan fungsi-fungsi yang lebih kecil dan modular agar lebih mudah dianalisis dan dibangun.'
      }
    ]
  }
]

// Assign each of the 450 questions to a topic ID
export function getQuestionTopicId(q) {
  const text = (q.text + ' ' + q.correct_text + ' ' + Object.values(q.options).join(' ')).toLowerCase()

  if (
    text.includes('sim') ||
    text.includes('spk') ||
    text.includes('tps') ||
    text.includes('erp') ||
    text.includes('crm') ||
    text.includes('scm') ||
    text.includes('interorganisasional') ||
    text.includes('otomasi perkantoran') ||
    text.includes('eksekutif') ||
    text.includes('pakar') ||
    text.includes('transaksi') ||
    text.includes('manajerial') ||
    text.includes('pendukung keputusan')
  ) {
    return 'is-types'
  }

  if (
    text.includes('gantt') ||
    text.includes('kritis') ||
    text.includes('lintasan') ||
    text.includes('slack') ||
    text.includes('tenggang waktu') ||
    text.includes('successor') ||
    text.includes('predecessor') ||
    text.includes('finish-to-start') ||
    text.includes('start-to-start') ||
    text.includes('finish-to-finish') ||
    text.includes('start-to-finish') ||
    text.includes('jadwal') ||
    text.includes('pert') ||
    text.includes('cpm') ||
    text.includes('milestone') ||
    text.includes('dependensi tugas')
  ) {
    return 'project-management'
  }

  if (
    text.includes('antarmuka') ||
    text.includes('interface') ||
    text.includes('mockup') ||
    text.includes('mock-up') ||
    text.includes('wireframe') ||
    text.includes('tipografi') ||
    text.includes('tata letak') ||
    text.includes('hierarki visual') ||
    text.includes('konsistensi') ||
    text.includes('usabilitas') ||
    text.includes('afordansi') ||
    text.includes('peramban') ||
    text.includes('masukan teks')
  ) {
    return 'ui-ux'
  }

  if (
    text.includes('erd') ||
    text.includes('entitas') ||
    text.includes('relasi') ||
    text.includes('kardinalitas') ||
    text.includes('atribut') ||
    text.includes('unari') ||
    text.includes('biner') ||
    text.includes('ternari') ||
    text.includes('ddl') ||
    text.includes('dml') ||
    text.includes('basis data') ||
    text.includes('database') ||
    text.includes('metadata') ||
    text.includes('skema penyimpanan')
  ) {
    return 'data-modeling'
  }

  if (
    text.includes('dfd') ||
    text.includes('diagram konteks') ||
    text.includes('aliran data') ||
    text.includes('use case') ||
    text.includes('dekomposisi') ||
    text.includes('arsitektur')
  ) {
    return 'process-architecture'
  }

  return 'sdlc-methodology'
}

// Get questions by topic
export function getQuestionsByTopic(topicId) {
  if (!topicId || topicId === 'all') return allQuestions
  return allQuestions.filter(q => getQuestionTopicId(q) === topicId)
}
