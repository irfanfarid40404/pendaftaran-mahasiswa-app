<template>
  <div class="container">
    <div class="row justify-content-center">
      <div class="col-lg-8">
        <div class="card shadow-sm">
          <div class="card-header">
            <h4 class="mb-0">Edit Data Mahasiswa</h4>
          </div>
          <div class="card-body">
            <MahasiswaForm
              :initial-data="mahasiswa"
              submit-text="Update"
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
import { ref, onMounted } from 'vue'
import { useRoute, useRouter } from 'vue-router'
import { useMahasiswaStore } from '@/stores/mahasiswa'
import MahasiswaForm from '@/components/MahasiswaForm.vue'

const route = useRoute()
const router = useRouter()
const store = useMahasiswaStore()
const mahasiswa = ref<any>({})
const isSubmitting = ref(false)

onMounted(async () => {
  await store.fetchAllMahasiswa()
  const found = store.mahasiswas.find((m) => m.id === route.params.id)
  if (found) {
    mahasiswa.value = { ...found }
  } else {
    router.push('/mahasiswa')
  }
})

const handleSubmit = async (formData: any) => {
  isSubmitting.value = true
  try {
    await store.updateMahasiswa(route.params.id as string, formData)
    router.push('/mahasiswa')
  } finally {
    isSubmitting.value = false
  }
}
</script>
