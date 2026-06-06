<template>
    <div class="p-6">
        <div class="mb-4">
            <h2 class="text-2xl font-bold text-gray-800 dark:text-gray-100 mb-4">任務管理</h2>
            <div class="flex items-center justify-between">
                <!-- 篩選 -->
                <div class="flex gap-2">
                    <button v-for="filter in filters" :key="filter.value" @click="activeFilter = filter.value" :class="[
                        'px-4 py-1.5 rounded-full text-sm font-medium transition',
                        activeFilter === filter.value
                            ? 'bg-indigo-600 text-white'
                            : 'bg-white dark:bg-gray-700 text-gray-600 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-600'
                    ]">
                        {{ filter.label }}
                    </button>
                </div>
                <button @click="openCreate"
                    class="bg-indigo-600 text-white px-4 py-2 rounded-lg text-sm font-medium hover:bg-indigo-700 transition">
                    + 新增任務
                </button>
            </div>
        </div>



        <!-- Loading -->
        <BaseLoading v-if="loading" />

        <!-- 任務列表 -->
        <div v-else-if="filteredTasks.length > 0" class="grid grid-cols-3 gap-4">
            <TaskCard v-for="task in filteredTasks" :key="task.id" :task="task" @edit="openEdit" @delete="handleDelete"
                @statusChange="handleStatusChange" />
        </div>

        <!-- 空狀態 -->
        <div v-else class="text-center py-20 text-gray-400 dark:text-gray-500">
            <p class="text-4xl mb-3">📭</p>
            <p class="text-sm">沒有任務</p>
        </div>

        <!-- 表單 Modal -->
        <TaskForm v-if="showForm" :task="editingTask" @close="closeForm" @submit="handleSubmit" />

        <ConfirmModal v-if="showConfirm" title="刪除任務" message="確定要刪除這個任務嗎？此操作無法復原。" @confirm="confirmDelete"
            @cancel="cancelDelete" />
    </div>
</template>

<script setup lang="ts">
import BaseLoading from '../../components/base/BaseLoading.vue'
import ConfirmModal from '../../components/base/ConfirmModal.vue'
import { ref, computed, onMounted } from 'vue'
import { useTaskStore } from '../../stores/task'
import type { Task, TaskStatus } from '../../types'
import TaskCard from './components/TaskCard.vue'
import TaskForm from './components/TaskForm.vue'
import { useToast } from '../../composables/useToast'


const taskStore = useTaskStore()
const showConfirm = ref(false)
const deletingId = ref<number | null>(null)
const { success, error } = useToast()

const showForm = ref(false)
const editingTask = ref<Task | undefined>(undefined)
const activeFilter = ref('all')
const loading = ref(false)


const filters = [
    { label: '全部', value: 'all' },
    { label: '待處理', value: 'todo' },
    { label: '進行中', value: 'in-progress' },
    { label: '已完成', value: 'done' },
]

const filteredTasks = computed(() => {
    if (activeFilter.value === 'all') return taskStore.tasks
    return taskStore.tasks.filter(t => t.status === activeFilter.value)
})

function openCreate() {
    editingTask.value = undefined
    showForm.value = true
}

function openEdit(task: Task) {
    editingTask.value = task
    showForm.value = true
}

function closeForm() {
    showForm.value = false
    editingTask.value = undefined
}

function handleSubmit(form: Omit<Task, 'id' | 'createdAt'>) {
    if (editingTask.value) {
        taskStore.updateTask(editingTask.value.id, form)
        success('任務已更新')
    } else {
        taskStore.addTask(form)
        success('任務已新增')
    }
    closeForm()
}

function handleDelete(id: number) {
    deletingId.value = id
    showConfirm.value = true
}

function confirmDelete() {
    if (deletingId.value !== null) {
        taskStore.deleteTask(deletingId.value)
        error('任務已刪除')
    }
    showConfirm.value = false
    deletingId.value = null
}

function cancelDelete() {
    showConfirm.value = false
    deletingId.value = null
}

function handleStatusChange(id: number, status: string) {
    taskStore.updateTaskStatus(id, status as TaskStatus)
}

async function initTasks() {
    loading.value = true
    await new Promise(resolve => setTimeout(resolve, 600))
    loading.value = false
}

onMounted(() => {
    initTasks()
})
</script>