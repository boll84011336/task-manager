<template>
    <div class="flex flex-col h-screen bg-gray-100 dark:bg-gray-900">

        <!-- 頂部 header（橫跨整頁） -->
        <header
            class="flex items-center justify-between px-6 h-14 bg-white dark:bg-gray-800 border-b border-gray-200 dark:border-gray-700 shrink-0">
            <h1 class="text-lg font-bold text-indigo-600 dark:text-indigo-300">任務管理系統</h1>
            <button @click="themeStore.toggleTheme()"
                class="flex items-center gap-2 text-sm text-gray-500 hover:text-indigo-500 transition px-3 py-1.5 rounded-lg hover:bg-gray-100">
                {{ themeStore.isDark ? '☀️ 淺色模式' : '🌙 深色模式' }}
            </button>
        </header>

        <!-- 下方左右分欄 -->
        <div class="flex flex-1 overflow-hidden">

            <!-- 側邊欄 -->
            <aside class="w-64 bg-white dark:bg-gray-800 shadow-md flex flex-col shrink-0">
                <nav class="flex-1 p-4 space-y-1 mt-2">
                    <RouterLink v-for="item in navItems" :key="item.path" :to="item.path"
                        class="flex items-center gap-3 px-4 py-2 rounded-lg text-sm text-gray-600 dark:text-gray-300 hover:bg-indigo-50 dark:hover:bg-gray-700 hover:text-indigo-600 transition"
                        active-class="bg-indigo-50 dark:bg-gray-700 text-indigo-600 dark:text-indigo-400 font-medium">
                        <component :is="getIcon(item.icon)" class="w-5 h-5" />
                        <span>{{ item.label }}</span>
                    </RouterLink>
                </nav>

                <div class="p-4 border-t border-gray-200 dark:border-gray-700">
                    <div class="flex items-center gap-3 mb-3">
                        <div
                            class="w-8 h-8 rounded-full bg-indigo-100 flex items-center justify-center text-sm font-bold text-indigo-600">
                            {{ authStore.user?.name[0] }}
                        </div>
                        <div>
                            <p class="text-sm font-medium text-gray-800 dark:text-gray-200">{{ authStore.user?.name }}
                            </p>
                            <p class="text-xs text-gray-400 dark:text-gray-500">{{ authStore.user?.role }}</p>
                        </div>
                    </div>
                    <button @click="handleLogout"
                        class="w-full text-sm text-gray-500 dark:text-gray-400 hover:text-red-500 transition text-left px-2">
                        登出
                    </button>
                </div>
            </aside>

            <!-- 主內容區 -->
            <main class="flex-1 overflow-auto">
                <RouterView />
            </main>

        </div>
    </div>
</template>

<script setup lang="ts">
import { computed } from 'vue'
import { useRouter } from 'vue-router'
import { useAuthStore } from '@/stores/auth'
import { useThemeStore } from '@/stores/theme'
import {
    ChartBarIcon,
    ClipboardDocumentListIcon,
    UsersIcon,
    BeakerIcon,
    ShieldCheckIcon,
} from '@heroicons/vue/24/outline'

const router = useRouter()
const authStore = useAuthStore()
const themeStore = useThemeStore()

const navItems = computed(() => {
    const items = [
        { path: '/dashboard', label: 'Dashboard', icon: 'chart' },
        { path: '/tasks', label: '任務管理', icon: 'clipboard' },
        { path: '/users', label: '使用者管理', icon: 'users' },
    ]
    if (authStore.user?.role === 'admin') {
        items.push({ path: '/permissions', label: '權限設定', icon: 'shield' })
    }
    items.push({ path: '/test', label: '測試管理', icon: 'beaker' })
    return items
})

function getIcon(name: string) {
    const map: Record<string, any> = {
        chart: ChartBarIcon,
        clipboard: ClipboardDocumentListIcon,
        users: UsersIcon,
        beaker: BeakerIcon,
        shield: ShieldCheckIcon,
    }
    return map[name]
}

function handleLogout() {
    authStore.logout()
    router.push('/login')
}
</script>