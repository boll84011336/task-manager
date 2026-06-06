<template>
    <div class="min-h-screen flex items-center justify-center relative overflow-hidden bg-gray-900">
        <!-- 背景光暈層 -->
        <div class="absolute inset-0">
            <div class="absolute -top-32 -left-32 w-96 h-96 bg-indigo-500/30 rounded-full blur-3xl"></div>
            <div class="absolute -bottom-32 -right-32 w-96 h-96 bg-pink-500/20 rounded-full blur-3xl"></div>
            <div class="absolute inset-0 bg-[url('/bg1.png')] bg-cover bg-center opacity-20"></div>
        </div>

        <!-- Glass Card -->
        <div class="relative z-10 w-full max-w-md p-8 rounded-2xl
             bg-white/10 dark:bg-white/5
             backdrop-blur-2xl
             border border-white/20
             shadow-[0_8px_32px_rgba(0,0,0,0.4)]
             hover:scale-[1.01] transition">
            <h1 class="text-2xl font-bold text-white mb-6 tracking-wide">
                任務管理系統
            </h1>

            <!-- Email -->
            <div class="mb-4">
                <label class="block text-sm text-white/70 mb-1">Email</label>
                <input v-model="form.email" type="email" placeholder="admin@test.com" class="w-full px-3 py-2 rounded-lg
                 bg-white/10 border border-white/20
                 text-white placeholder-white/40
                 focus:outline-none focus:ring-2 focus:ring-indigo-400" />
            </div>

            <!-- Password -->
            <div class="mb-6">
                <label class="block text-sm text-white/70 mb-1">密碼</label>
                <input v-model="form.password" type="password" placeholder="輸入密碼" class="w-full px-3 py-2 rounded-lg
                 bg-white/10 border border-white/20
                 text-white placeholder-white/40
                 focus:outline-none focus:ring-2 focus:ring-indigo-400" />
            </div>

            <!-- Error -->
            <div v-if="errorMsg" class="mb-4 text-sm text-red-400">
                {{ errorMsg }}
            </div>

            <!-- Button -->
            <button @click="handleLogin" :disabled="loading" class="w-full py-2 rounded-lg font-medium
               bg-gradient-to-r from-indigo-500 to-pink-500
               text-white shadow-lg
               hover:opacity-90 active:scale-[0.98]
               transition disabled:opacity-50">
                {{ loading ? "登入中..." : "登入" }}
            </button>

            <p class="text-xs text-white/40 mt-4">
                測試帳號：admin@test.com／密碼隨便輸入
            </p>
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