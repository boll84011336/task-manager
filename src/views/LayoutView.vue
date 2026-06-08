<template>
    <div class="flex h-screen bg-gray-50 dark:bg-gray-900">

        <!-- 側邊欄 -->
        <aside class="w-64 bg-gray-900 dark:bg-gray-950 flex flex-col shrink-0">

            <!-- Logo -->
            <div class="px-6 py-5 border-b border-gray-700/50">
                <h1 class="text-2xl font-bold text-white tracking-wide">TaskFlow</h1>
                <p class="text-xl text-gray-400 mt-0.5">管理後台</p>
            </div>

            <!-- 選單 -->
            <nav class="flex-1 px-3 py-4 space-y-1 overflow-y-auto">
                <div v-for="group in navGroups" :key="group.label" class="mb-6">
                    <button @click="toggleGroup(group.label)"
                        class="w-full flex items-center justify-between text-l font-semibold text-gray-500 uppercase tracking-wider px-3 mb-2 hover:text-gray-300 transition">
                        <span>{{ group.label }}</span>
                        <ChevronRightIcon v-if="isCollapsed(group.label)" class="w-3 h-3 text-gray-600" />
                        <ChevronDownIcon v-else class="w-3 h-3 text-gray-600" />
                    </button>


                    <div v-show="!isCollapsed(group.label)" class="space-y-1">
                        <RouterLink v-for="item in group.items" :key="item.path" :to="item.path"
                            class="flex items-center gap-3 px-3 py-2.5 rounded-lg text-sm text-gray-400 hover:bg-gray-700/50 hover:text-white transition-all duration-150"
                            active-class="bg-indigo-600/20 text-indigo-400 border-l-2 border-indigo-500">
                            <component :is="getIcon(item.icon)" class="w-4 h-4 shrink-0" />
                            <span>{{ item.label }}</span>
                        </RouterLink>
                    </div>


                </div>
            </nav>

            <!-- 使用者資訊 -->
            <div class="px-4 py-4 border-t border-gray-700/50">
                <div class="flex items-center gap-3 mb-3">
                    <div
                        class="w-8 h-8 rounded-full bg-indigo-600 flex items-center justify-center text-sm font-bold text-white shrink-0">
                        {{ authStore.user?.name[0] }}
                    </div>
                    <div class="flex-1 min-w-0">
                        <p class="text-sm font-medium text-white truncate">{{ authStore.user?.name }}</p>
                        <p class="text-xs text-gray-400">{{ authStore.user?.role }}</p>
                    </div>
                </div>
                <button @click="handleLogout"
                    class="w-full text-xs text-gray-500 hover:text-red-400 transition text-left px-1 py-1">
                    登出
                </button>
            </div>
        </aside>

        <!-- 右邊主區域 -->
        <div class="flex flex-col flex-1 overflow-hidden">

            <!-- Header -->
            <header
                class="h-14 bg-white dark:bg-gray-800 border-b border-gray-200 dark:border-gray-700 flex items-center justify-end px-6 shrink-0">
                <button @click="themeStore.toggleTheme()"
                    class="flex items-center gap-2 text-sm text-gray-500 dark:text-gray-400 hover:text-indigo-500 transition px-3 py-1.5 rounded-lg hover:bg-gray-100 dark:hover:bg-gray-700">
                    {{ themeStore.isDark ? '☀️ 淺色模式' : '🌙 深色模式' }}
                </button>
            </header>

            <!-- 主內容區 -->
            <main class="flex-1 overflow-auto bg-gray-50 dark:bg-gray-900">
                <RouterView />
            </main>

        </div>
    </div>
</template>

<script setup lang="ts">
import { computed, ref } from 'vue'
import { useRouter } from 'vue-router'
import { useAuthStore } from '@/stores/auth'
import { useThemeStore } from '@/stores/theme'
import {
    ChartBarIcon,
    ClipboardDocumentListIcon,
    UsersIcon,
    BeakerIcon,
    ShieldCheckIcon,
    ChevronDownIcon,
    ChevronRightIcon,
} from '@heroicons/vue/24/outline'

const router = useRouter()
const authStore = useAuthStore()
const themeStore = useThemeStore()

const navGroups = computed(() => {
    const groups = [
        {
            label: '主要功能',
            items: [
                { path: '/dashboard', label: 'Dashboard', icon: 'chart' },
                { path: '/tasks', label: '任務管理', icon: 'clipboard' },
            ]
        },
        {
            label: '系統管理',
            items: [
                { path: '/users', label: '使用者管理', icon: 'users' },
            ]
        },
    ]

    if (authStore.user?.role === 'admin') {
        groups[1].items.push({ path: '/permissions', label: '權限設定', icon: 'shield' })
    }

    groups.push({
        label: '其他',
        items: [
            { path: '/test', label: '測試管理', icon: 'beaker' },
        ]
    })

    return groups
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

const collapsedGroups = ref<Record<string, boolean>>({})

function toggleGroup(label: string) {
    collapsedGroups.value[label] = !collapsedGroups.value[label]
}

function isCollapsed(label: string) {
    return collapsedGroups.value[label] ?? false
}

function handleLogout() {
    authStore.logout()
    router.push('/login')
}
</script>