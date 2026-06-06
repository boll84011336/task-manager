<template>
    <div class="bg-white dark:bg-gray-800 rounded-xl p-4 shadow-sm border border-gray-100 dark:border-gray-700">
        <div class="flex items-start justify-between mb-2">
            <h3 class="text-sm font-semibold text-gray-800 dark:text-gray-100">{{ task.title }}</h3>
            <span :class="statusClass" class="text-xs px-2 py-1 rounded-full font-medium">
                {{ statusLabel }}
            </span>
        </div>
        <p class="text-xs text-gray-500 dark:text-gray-400 mb-3">{{ task.description }}</p>
        <div class="flex items-center justify-between text-xs text-gray-400 dark:text-gray-500">
            <span>👤 {{ task.assignee }}</span>
            <span>📅 {{ task.dueDate }}</span>
        </div>
        <div class="flex gap-2 mt-3">
            <button v-if="canEdit" @click="$emit('edit', task)"
                class="text-xs text-indigo-600 dark:text-indigo-400 hover:underline">
                編輯
            </button>
            <button v-if="canDelete" @click="$emit('delete', task.id)"
                class="text-xs text-red-500 dark:text-red-400 hover:underline">
                刪除
            </button>
            <select :value="task.status" :disabled="!canEdit"
                @change="$emit('statusChange', task.id, ($event.target as HTMLSelectElement).value)"
                class="ml-auto text-xs border border-gray-200 dark:border-gray-600 rounded px-1 py-0.5 bg-white dark:bg-gray-700 text-gray-700 dark:text-gray-300 disabled:opacity-40 disabled:cursor-not-allowed disabled:bg-gray-100 dark:disabled:bg-gray-800 disabled:text-gray-400">
                <option value="todo">待處理</option>
                <option value="in-progress">進行中</option>
                <option value="done">已完成</option>
            </select>
        </div>
    </div>
</template>

<script setup lang="ts">
import { computed } from 'vue'
import type { Task } from '@/types'
import { useAuthStore } from '@/stores/auth'
import { usePermissionStore } from '@/stores/permission'

// props & emits
const props = defineProps<{
    task: Task
}>()

defineEmits<{
    edit: [task: Task]
    delete: [id: number]
    statusChange: [id: number, status: string]
}>()

// stores
const authStore = useAuthStore()
const permissionStore = usePermissionStore()

// computed
const statusLabel = computed(() => {
    const map = { todo: '待處理', 'in-progress': '進行中', done: '已完成' }
    return map[props.task.status]
})

const statusClass = computed(() => {
    const map = {
        todo: 'bg-gray-100 text-gray-600',
        'in-progress': 'bg-indigo-100 text-indigo-600',
        done: 'bg-green-100 text-green-600',
    }
    return map[props.task.status]
})

const canEdit = computed(() => {
    if (!authStore.user) return false
    if (authStore.user.role === 'admin') return true
    const hasPermission = permissionStore.getPermission(authStore.user.id, 'canEdit')
    return hasPermission && authStore.user.name === props.task.assignee
})

const canDelete = computed(() => {
    if (!authStore.user) return false
    return permissionStore.getPermission(authStore.user.id, 'canDelete')
})
</script>