<template>
  <form @submit.prevent="handleSubmit">
    <div class="row g-3">
      <div class="col-md-6">
        <label for="nim" class="form-label">NIM</label>
        <input
          type="text"
          class="form-control"
          id="nim"
          v-model="form.nim"
          required
        />
      </div>
      <div class="col-md-6">
        <label for="nama" class="form-label">Nama Lengkap</label>
        <input
          type="text"
          class="form-control"
          id="nama"
          v-model="form.nama"
          required
        />
      </div>
      <div class="col-md-6">
        <label for="fakultas" class="form-label">Fakultas</label>
        <select class="form-select" id="fakultas" v-model="form.fakultas" required>
          <option value="">Pilih Fakultas</option>
          <option value="Teknik">Teknik</option>
          <option value="Ekonomi">Ekonomi</option>
          <option value="Hukum">Hukum</option>
          <option value="Kedokteran">Kedokteran</option>
        </select>
      </div>
      <div class="col-md-6">
        <label for="jurusan" class="form-label">Jurusan</label>
        <input
          type="text"
          class="form-control"
          id="jurusan"
          v-model="form.jurusan"
          required
        />
      </div>
      <div class="col-md-6">
        <label for="angkatan" class="form-label">Angkatan</label>
        <input
          type="number"
          class="form-control"
          id="angkatan"
          v-model="form.angkatan"
          min="2000"
          max="2099"
          required
        />
      </div>
      <div class="col-md-6">
        <label for="email" class="form-label">Email</label>
        <input
          type="email"
          class="form-control"
          id="email"
          v-model="form.email"
          required
        />
      </div>
      <div class="col-md-6">
        <label for="no_hp" class="form-label">No. HP</label>
        <input
          type="tel"
          class="form-control"
          id="no_hp"
          v-model="form.no_hp"
          required
        />
      </div>
      <div class="col-12">
        <label for="alamat" class="form-label">Alamat</label>
        <textarea
          class="form-control"
          id="alamat"
          rows="3"
          v-model="form.alamat"
        ></textarea>
      </div>
    </div>
    <div class="mt-4">
      <button type="submit" class="btn btn-primary me-2" :disabled="isSubmitting">
        <span v-if="isSubmitting" class="spinner-border spinner-border-sm" role="status" aria-hidden="true"></span>
        {{ submitText }}
      </button>
      <button type="button" class="btn btn-outline-secondary" @click="$router.back()">
        Batal
      </button>
    </div>
  </form>
</template>

<script setup lang="ts">
import { ref, defineProps, defineEmits, onMounted } from 'vue'
import type { Mahasiswa } from '@/types/mahasiswa'

const props = defineProps<{
  initialData?: Partial<Mahasiswa>
  isSubmitting: boolean
  submitText: string
}>()

const emit = defineEmits(['submit'])

const form = ref<Partial<Mahasiswa>>({
  nim: '',
  nama: '',
  fakultas: '',
  jurusan: '',
  angkatan: new Date().getFullYear(),
  email: '',
  no_hp: '',
  alamat: ''
})

onMounted(() => {
  if (props.initialData) {
    form.value = { ...props.initialData }
  }
})

const handleSubmit = () => {
  emit('submit', form.value)
}
</script>
