<template>
  <div class="card">
    <div class="card-header d-flex justify-content-between align-items-center">
      <h5 class="mb-0">Daftar Mahasiswa</h5>
      <router-link to="/mahasiswa/tambah" class="btn btn-primary btn-sm">
        <i class="bi bi-plus-lg"></i> Tambah Mahasiswa
      </router-link>
    </div>
    <div class="card-body">
      <div v-if="isLoading" class="text-center py-4">
        <div class="spinner-border text-primary" role="status">
          <span class="visually-hidden">Loading...</span>
        </div>
      </div>
      <div v-else-if="error" class="alert alert-danger">{{ error }}</div>
      <div v-else-if="mahasiswas.length === 0" class="alert alert-info">
        Tidak ada data mahasiswa
      </div>
      <div v-else class="table-responsive">
        <table class="table table-hover">
          <thead>
            <tr>
              <th>NIM</th>
              <th>Nama</th>
              <th>Fakultas</th>
              <th>Jurusan</th>
              <th>Angkatan</th>
              <th>Aksi</th>
            </tr>
          </thead>
          <tbody>
            <tr v-for="mahasiswa in mahasiswas" :key="mahasiswa.id">
              <td>{{ mahasiswa.nim }}</td>
              <td>{{ mahasiswa.nama }}</td>
              <td>{{ mahasiswa.fakultas }}</td>
              <td>{{ mahasiswa.jurusan }}</td>
              <td>{{ mahasiswa.angkatan }}</td>
              <td>
                <div class="btn-group btn-group-sm">
                  <router-link
                    :to="{ name: 'mahasiswa-edit', params: { id: mahasiswa.id } }"
                    class="btn btn-outline-primary"
                  >
                    <i class="bi bi-pencil"></i>
                  </router-link>
                  <button
                    @click="handleDelete(mahasiswa.id)"
                    class="btn btn-outline-danger"
                    :disabled="isDeleting === mahasiswa.id"
                  >
                    <span
                      v-if="isDeleting === mahasiswa.id"
                      class="spinner-border spinner-border-sm"
                      role="status"
                      aria-hidden="true"
                    ></span>
                    <i v-else class="bi bi-trash"></i>
                  </button>
                </div>
              </td>
            </tr>
          </tbody>
        </table>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref, onMounted } from 'vue'
import { useMahasiswaStore } from '@/stores/mahasiswa'

const store = useMahasiswaStore()
const { mahasiswas, isLoading, error, fetchAllMahasiswa, deleteMahasiswa } = store

const isDeleting = ref<string | null>(null)

onMounted(() => {
  fetchAllMahasiswa()
})

const handleDelete = async (id: string) => {
  if (confirm('Apakah Anda yakin ingin menghapus mahasiswa ini?')) {
    isDeleting.value = id
    try {
      await deleteMahasiswa(id)
    } finally {
      isDeleting.value = null
    }
  }
}
</script>
