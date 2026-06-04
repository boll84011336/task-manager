<template>
    <div class="flex h-screen bg-gray-100">
        <!-- 側邊欄 -->
        <aside class="w-64 bg-white shadow-md flex flex-col">
            <div class="p-6 border-b">
                <h1 class="text-lg font-bold text-indigo-600">任務管理系統</h1>
            </div>

            <nav class="flex-1 p-4 space-y-1">
                <RouterLink v-for="item in navItems" :key="item.path" :to="item.path"
                    class="flex items-center gap-3 px-4 py-2 rounded-lg text-sm text-gray-600 hover:bg-indigo-50 hover:text-indigo-600 transition"
                    active-class="bg-indigo-50 text-indigo-600 font-medium">
                    <component :is="getIcon(item.icon)" class="w-5 h-5" />
                    <span>{{ item.label }}</span>
                </RouterLink>
            </nav>

            <div class="p-4 border-t">
                <div class="flex items-center gap-3 mb-3">
                    <div
                        class="w-8 h-8 rounded-full bg-indigo-100 flex items-center justify-center text-sm font-bold text-indigo-600">
                        {{ authStore.user?.name[0] }}
                    </div>
                    <div>
                        <p class="text-sm font-medium text-gray-800">{{ authStore.user?.name }}</p>
                        <p class="text-xs text-gray-400">{{ authStore.user?.role }}</p>
                    </div>
                </div>
                <button @click="handleLogout"
                    class="w-full text-sm text-gray-500 hover:text-red-500 transition text-left px-2">
                    登出
                </button>
            </div>
        </aside>

        <!-- 主內容區 -->
        <main class="flex-1 overflow-auto">
            <RouterView />
        </main>
    </div>
</template>

<script setup lang="ts">
import { computed } from 'vue'
import { useRouter } from 'vue-router'
import { useAuthStore } from '../stores/auth'
import {
    ChartBarIcon,
    ClipboardDocumentListIcon,
    UsersIcon,
    BeakerIcon
} from '@heroicons/vue/24/outline'


const router = useRouter()
const authStore = useAuthStore()

const navItems = computed(() => {
    const items = [
        { path: '/dashboard', label: 'Dashboard', icon: 'chart' },
        { path: '/tasks', label: '任務管理', icon: 'clipboard' },

    ]
    if (authStore.user?.role === 'admin') {
        items.push({ path: '/users', label: '使用者管理', icon: 'users' })
    }
    items.push({ path: '/test', label: '測試管理', icon: 'beaker' })

    return items
})

function getIcon(name: string) {
    const map: Record<string, any> = {
        chart: ChartBarIcon,
        clipboard: ClipboardDocumentListIcon,
        users: UsersIcon,
        beaker: BeakerIcon
    }
    return map[name]
}

function handleLogout() {
    authStore.logout()
    router.push('/login')
}
</script>