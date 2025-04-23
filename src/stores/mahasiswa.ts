import { defineStore } from 'pinia'
import { ref } from 'vue'
import type { Mahasiswa } from '@/types/mahasiswa'
import api from '@/services/api'

export const useMahasiswaStore = defineStore('mahasiswa', () => {
  const mahasiswas = ref<Mahasiswa[]>([])
  const isLoading = ref(false)
  const error = ref<string | null>(null)

  const fetchAllMahasiswa = async () => {
    try {
      isLoading.value = true
      const response = await api.get('/mahasiswa')
      mahasiswas.value = response.data
    } catch (err) {
      error.value = 'Gagal memuat data mahasiswa'
      console.error(err)
    } finally {
      isLoading.value = false
    }
  }

  const addMahasiswa = async (mahasiswa: Omit<Mahasiswa, 'id'>) => {
    try {
      isLoading.value = true
      const response = await api.post('/mahasiswa', mahasiswa)
      mahasiswas.value.push(response.data)
      return response.data
    } catch (err) {
      error.value = 'Gagal menambahkan mahasiswa'
      console.error(err)
      throw err
    } finally {
      isLoading.value = false
    }
  }

  const updateMahasiswa = async (id: string, mahasiswa: Partial<Mahasiswa>) => {
    try {
      isLoading.value = true
      const response = await api.put(`/mahasiswa/${id}`, mahasiswa)
      const index = mahasiswas.value.findIndex((m) => m.id === id)
      if (index !== -1) {
        mahasiswas.value[index] = { ...mahasiswas.value[index], ...response.data }
      }
      return response.data
    } catch (err) {
      error.value = 'Gagal memperbarui mahasiswa'
      console.error(err)
      throw err
    } finally {
      isLoading.value = false
    }
  }

  const deleteMahasiswa = async (id: string) => {
    try {
      isLoading.value = true
      await api.delete(`/mahasiswa/${id}`)
      mahasiswas.value = mahasiswas.value.filter((m) => m.id !== id)
    } catch (err) {
      error.value = 'Gagal menghapus mahasiswa'
      console.error(err)
      throw err
    } finally {
      isLoading.value = false
    }
  }

  return {
    mahasiswas,
    isLoading,
    error,
    fetchAllMahasiswa,
    addMahasiswa,
    updateMahasiswa,
    deleteMahasiswa,
  }
})
