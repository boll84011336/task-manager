<template>
    <div class="bg-white rounded-xl p-4 shadow-sm border border-gray-100">
        <div class="flex items-start justify-between mb-2">
            <h3 class="text-sm font-semibold text-gray-800">{{ task.title }}</h3>
            <span :class="statusClass" class="text-xs px-2 py-1 rounded-full font-medium">
                {{ statusLabel }}
            </span>
        </div>
        <p class="text-xs text-gray-500 mb-3">{{ task.description }}</p>
        <div class="flex items-center justify-between text-xs text-gray-400">
            <span>👤 {{ task.assignee }}</span>
            <span>📅 {{ task.dueDate }}</span>
        </div>
        <div class="flex gap-2 mt-3">
            <button @click="$emit('edit', task)" class="text-xs text-indigo-600 hover:underline">
                編輯
            </button>
            <button @click="$emit('delete', task.id)" class="text-xs text-red-500 hover:underline">
                刪除
            </button>
            <select :value="task.status"
                @change="$emit('statusChange', task.id, ($event.target as HTMLSelectElement).value)"
                class="ml-auto text-xs border border-gray-200 rounded px-1 py-0.5">
                <option value="todo">待處理</option>
                <option value="in-progress">進行中</option>
                <option value="done">已完成</option>
            </select>
        </div>
    </div>
</template>

<script setup lang="ts">
import { computed } from 'vue'
import type { Task, TaskStatus } from '../../../types'

const props = defineProps<{
    task: Task
}>()

defineEmits<{
    edit: [task: Task]
    delete: [id: number]
    statusChange: [id: number, status: string]
}>()

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
</script>