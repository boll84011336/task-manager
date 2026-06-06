<template>
    <div class="fixed inset-0 bg-black/40 backdrop-blur-sm flex items-center justify-center z-50">
        <div class="bg-white dark:bg-gray-800 rounded-xl p-6 w-full max-w-md shadow-xl">
            <h3 class="text-lg font-bold text-gray-800 dark:text-gray-100 mb-4">
                {{ isEdit ? '編輯任務' : '新增任務' }}
            </h3>

            <div class="space-y-4">
                <div>
                    <label class="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">標題</label>
                    <input v-model="form.title" type="text"
                        class="w-full border border-gray-300 dark:border-gray-600 rounded-lg px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-indigo-500 bg-white dark:bg-gray-700 text-gray-800 dark:text-gray-200" />
                </div>

                <div>
                    <label class="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">描述</label>
                    <textarea v-model="form.description" rows="3"
                        class="w-full border border-gray-300 dark:border-gray-600 rounded-lg px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-indigo-500 bg-white dark:bg-gray-700 text-gray-800 dark:text-gray-200" />
                </div>

                <div>
                    <label class="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">負責人</label>
                    <input v-model="form.assignee" type="text" :disabled="isMember"
                        class="w-full border border-gray-300 dark:border-gray-600 rounded-lg px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-indigo-500 bg-white dark:bg-gray-700 text-gray-800 dark:text-gray-200 disabled:bg-gray-100 dark:disabled:bg-gray-600 disabled:text-gray-400 disabled:cursor-not-allowed" />
                </div>

                <div>
                    <label class="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">截止日期</label>
                    <input v-model="form.dueDate" type="date"
                        class="w-full border border-gray-300 dark:border-gray-600 rounded-lg px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-indigo-500 bg-white dark:bg-gray-700 text-gray-800 dark:text-gray-200" />
                </div>

                <div>
                    <label class="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">狀態</label>
                    <select v-model="form.status"
                        class="w-full border border-gray-300 dark:border-gray-600 rounded-lg px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-indigo-500 bg-white dark:bg-gray-700 text-gray-800 dark:text-gray-200">
                        <option value="todo">待處理</option>
                        <option value="in-progress">進行中</option>
                        <option value="done">已完成</option>
                    </select>
                </div>
            </div>

            <div v-if="errorMsg" class="mt-3 text-red-500 dark:text-red-400 text-sm">{{ errorMsg }}</div>

            <div class="flex gap-3 mt-6 justify-end">
                <button @click="$emit('close')"
                    class="px-4 py-2 text-sm text-gray-600 dark:text-gray-300 bg-gray-100 dark:bg-gray-700 rounded-lg hover:bg-gray-200 dark:hover:bg-gray-600 transition">
                    取消
                </button>
                <button @click="handleSubmit"
                    class="px-4 py-2 text-sm text-white bg-indigo-600 rounded-lg hover:bg-indigo-700 transition">
                    {{ isEdit ? '儲存' : '新增' }}
                </button>
            </div>
        </div>
    </div>
</template>

<script setup lang="ts">
import { ref } from 'vue'
import type { Task, TaskStatus } from '../../../types'
import { useAuthStore } from '@/stores/auth'


const props = defineProps<{
    task?: Task
}>()

const emit = defineEmits<{
    close: []
    submit: [form: Omit<Task, 'id' | 'createdAt'>]
}>()

const isEdit = !!props.task
const errorMsg = ref('')
const authStore = useAuthStore()
const isMember = authStore.user?.role === 'member'

const form = ref({
    title: props.task?.title ?? '',
    description: props.task?.description ?? '',
    assignee: props.task?.assignee ?? (isMember ? authStore.user?.name ?? '' : ''),
    dueDate: props.task?.dueDate ?? '',
    status: (props.task?.status ?? 'todo') as TaskStatus,
})

function handleSubmit() {
    if (!form.value.title || !form.value.assignee || !form.value.dueDate) {
        errorMsg.value = '請填寫所有必填欄位'
        return
    }
    emit('submit', { ...form.value })
}
</script>