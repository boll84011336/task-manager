<template>
    <div class="p-6">
        <h2 class="text-2xl font-bold text-gray-800 dark:text-gray-100 mb-2">權限設定</h2>
        <p class="text-sm text-gray-500 dark:text-gray-400 mb-6">設定每位使用者的功能存取權限</p>

        <div class="bg-white dark:bg-gray-800 rounded-xl shadow-sm overflow-hidden">
            <table class="w-full text-sm">
                <thead class="bg-gray-50 dark:bg-gray-700 text-gray-500 dark:text-gray-400 text-left">
                    <tr>
                        <th class="px-6 py-3 font-medium">使用者</th>
                        <th class="px-6 py-3 font-medium">角色</th>
                        <th class="px-6 py-3 font-medium text-center">新增任務</th>
                        <th class="px-6 py-3 font-medium text-center">編輯任務</th>
                        <th class="px-6 py-3 font-medium text-center">刪除任務</th>
                        <th class="px-6 py-3 font-medium text-center">使用者管理</th>
                    </tr>
                </thead>
                <tbody class="divide-y divide-gray-100 dark:divide-gray-700">
                    <tr v-for="user in userStore.users" :key="user.id"
                        class="hover:bg-gray-50 dark:hover:bg-gray-700 transition">
                        <td class="px-6 py-4 font-medium text-gray-800 dark:text-gray-200">{{ user.name }}</td>
                        <td class="px-6 py-4">
                            <span
                                :class="user.role === 'admin' ? 'bg-indigo-100 dark:bg-indigo-900 text-indigo-600 dark:text-indigo-300' : 'bg-gray-100 dark:bg-gray-700 text-gray-600 dark:text-gray-400'"
                                class="px-2 py-1 rounded-full text-xs font-medium">
                                {{ user.role }}
                            </span>
                        </td>
                        <td class="px-6 py-4 text-center">
                            <input type="checkbox" :checked="getPermission(user.id, 'canCreate')"
                                :disabled="user.role === 'admin'" @change="togglePermission(user.id, 'canCreate')"
                                class="w-4 h-4 accent-indigo-600 disabled:opacity-40" />
                        </td>
                        <td class="px-6 py-4 text-center">
                            <input type="checkbox" :checked="getPermission(user.id, 'canEdit')"
                                :disabled="user.role === 'admin'" @change="togglePermission(user.id, 'canEdit')"
                                class="w-4 h-4 accent-indigo-600 disabled:opacity-40" />
                        </td>
                        <td class="px-6 py-4 text-center">
                            <input type="checkbox" :checked="getPermission(user.id, 'canDelete')"
                                :disabled="user.role === 'admin'" @change="togglePermission(user.id, 'canDelete')"
                                class="w-4 h-4 accent-indigo-600 disabled:opacity-40" />
                        </td>
                        <td class="px-6 py-4 text-center">
                            <input type="checkbox" :checked="getPermission(user.id, 'canManageUsers')"
                                :disabled="user.role === 'admin'" @change="togglePermission(user.id, 'canManageUsers')"
                                class="w-4 h-4 accent-indigo-600 disabled:opacity-40" />
                        </td>
                    </tr>
                </tbody>
            </table>
        </div>
    </div>
</template>

<script setup lang="ts">
import { onMounted } from 'vue'
import { useUserStore } from '@/stores/user'
import { usePermissionStore } from '@/stores/permission'

const userStore = useUserStore()
const permissionStore = usePermissionStore()

type PermissionKey = 'canCreate' | 'canEdit' | 'canDelete' | 'canManageUsers'

onMounted(() => {
    permissionStore.initPermissions()
})

function getPermission(userId: number, key: PermissionKey): boolean {
    return permissionStore.getPermission(userId, key)
}

function togglePermission(userId: number, key: PermissionKey) {
    permissionStore.togglePermission(userId, key)
}
</script>