<template>
  <div class="container">
    <div class="row justify-content-center">
      <div class="col-lg-8">
        <div class="card shadow-sm">
          <div class="card-header">
            <h4 class="mb-0">Tambah Mahasiswa Baru</h4>
          </div>
          <div class="card-body">
            <MahasiswaForm
              submit-text="Simpan"
              :is-submitting="isSubmitting"
              @submit="handleSubmit"
            />
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref } from 'vue'
import { useRouter } from 'vue-router'
import { useMahasiswaStore } from '@/stores/mahasiswa'
import MahasiswaForm from '@/components/MahasiswaForm.vue'

const router = useRouter()
const store = useMahasiswaStore()
const isSubmitting = ref(false)

const handleSubmit = async (formData: any) => {
  isSubmitting.value = true
  try {
    await store.addMahasiswa(formData)
    router.push('/mahasiswa')
  } finally {
    isSubmitting.value = false
  }
}
</script>
