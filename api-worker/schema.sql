-- Schema untuk tabel mahasiswa
CREATE TABLE IF NOT EXISTS mahasiswa (
  id TEXT PRIMARY KEY DEFAULT (hex(randomblob(16))),
  nim TEXT NOT NULL UNIQUE,
  nama TEXT NOT NULL,
  fakultas TEXT NOT NULL,
  jurusan TEXT NOT NULL,
  angkatan INTEGER NOT NULL CHECK (angkatan BETWEEN 2000 AND 2099),
  email TEXT NOT NULL,
  no_hp TEXT NOT NULL,
  alamat TEXT,
  created_at TEXT NOT NULL DEFAULT (datetime('now')),
  updated_at TEXT NOT NULL DEFAULT (datetime('now'))
);

-- Index untuk pencarian cepat
CREATE INDEX IF NOT EXISTS idx_mahasiswa_nim ON mahasiswa(nim);
CREATE INDEX IF NOT EXISTS idx_mahasiswa_nama ON mahasiswa(nama);