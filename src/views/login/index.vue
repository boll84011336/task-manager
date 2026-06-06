<template>
    <div class="min-h-screen flex items-center justify-center bg-cover bg-center bg-no-repeat"
        style="background-image: url('/bg1.png')">
        <div class="bg-white/90 dark:bg-gray-800/90 backdrop-blur-sm p-8 rounded-xl shadow-md w-full max-w-md">
            <h1 class="text-2xl font-bold text-gray-800 dark:text-gray-100 mb-6">任務管理系統</h1>

            <div class="mb-4">
                <label class="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">Email</label>
                <input v-model="form.email" type="email" placeholder="admin@test.com"
                    class="w-full border border-gray-300 dark:border-gray-600 rounded-lg px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-indigo-500 bg-white dark:bg-gray-700 text-gray-800 dark:text-gray-200" />
            </div>

            <div class="mb-6">
                <label class="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">密碼</label>
                <input v-model="form.password" type="password" placeholder="輸入密碼"
                    class="w-full border border-gray-300 dark:border-gray-600 rounded-lg px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-indigo-500 bg-white dark:bg-gray-700 text-gray-800 dark:text-gray-200" />
            </div>

            <div v-if="errorMsg" class="mb-4 text-red-500 dark:text-red-400 text-sm">{{ errorMsg }}</div>

            <button @click="handleLogin" :disabled="loading"
                class="w-full bg-indigo-600 text-white py-2 rounded-lg font-medium hover:bg-indigo-700 transition disabled:opacity-60">
                {{ loading ? '登入中...' : '登入' }}
            </button>

            <p class="text-xs text-gray-400 dark:text-gray-500 mt-4">測試帳號：admin@test.com／密碼隨便輸入</p>
        </div>
    </div>
</template>

<script setup lang="ts">
import { ref } from 'vue'
import { useRouter } from 'vue-router'
import { useAuthStore } from '@/stores/auth'
import { mockUsers } from '@/api/mock'

const router = useRouter()
const authStore = useAuthStore()

const form = ref({
    email: '',
    password: '',
})
const loading = ref(false)
const errorMsg = ref('')

async function handleLogin() {
    errorMsg.value = ''

    if (!form.value.email || !form.value.password) {
        errorMsg.value = '請填寫 Email 和密碼'
        return
    }

    loading.value = true

    await new Promise(resolve => setTimeout(resolve, 800))

    const user = mockUsers.find(u => u.email === form.value.email)

    if (!user) {
        errorMsg.value = 'Email 不存在'
        loading.value = false
        return
    }

    const fakeToken = `token-${user.id}-${Date.now()}`
    authStore.login(user, fakeToken)
    router.push('/dashboard')

    loading.value = false
}
</script>