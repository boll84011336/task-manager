<template>
    <div class="p-6">
        <h2 class="text-2xl font-bold text-gray-800 dark:text-gray-100 mb-6">Dashboard</h2>

        <!-- 統計卡片 -->
        <div class="grid grid-cols-4 gap-4 mb-8">
            <div class="bg-white dark:bg-gray-800 rounded-xl p-5 shadow-sm">
                <p class="text-sm text-gray-500 dark:text-gray-400 mb-1">總任務數</p>
                <p class="text-3xl font-bold text-gray-800 dark:text-gray-100">{{ taskStore.totalTasks }}</p>
            </div>
            <div class="bg-white dark:bg-gray-800 rounded-xl p-5 shadow-sm">
                <p class="text-sm text-gray-500 dark:text-gray-400 mb-1">已完成</p>
                <p class="text-3xl font-bold text-green-500">{{ taskStore.doneTasks }}</p>
            </div>
            <div class="bg-white dark:bg-gray-800 rounded-xl p-5 shadow-sm">
                <p class="text-sm text-gray-500 dark:text-gray-400 mb-1">進行中</p>
                <p class="text-3xl font-bold text-indigo-500">{{ taskStore.inProgressTasks }}</p>
            </div>
            <div class="bg-white dark:bg-gray-800 rounded-xl p-5 shadow-sm">
                <p class="text-sm text-gray-500 dark:text-gray-400 mb-1">完成率</p>
                <p class="text-3xl font-bold text-orange-500">{{ taskStore.completionRate }}%</p>
            </div>
        </div>

        <!-- 圖表區 -->
        <div class="grid grid-cols-2 gap-4">
            <div class="bg-white dark:bg-gray-800 rounded-xl p-5 shadow-sm">
                <h3 class="text-base font-semibold text-gray-700 dark:text-gray-200 mb-4">任務狀態分佈</h3>
                <canvas ref="pieChartRef"
                    style="max-height: 220px; max-width: 220px; margin: 0 auto; display: block;"></canvas>
                <div class="flex flex-row gap-4 mt-4 justify-center">
                    <div class="flex items-center gap-2 text-sm text-gray-600 dark:text-gray-400">
                        <span class="w-3 h-3 bg-gray-200 inline-block"></span> 待處理
                    </div>
                    <div class="flex items-center gap-2 text-sm text-gray-600 dark:text-gray-400">
                        <span class="w-3 h-3 bg-indigo-500 inline-block"></span> 進行中
                    </div>
                    <div class="flex items-center gap-2 text-sm text-gray-600 dark:text-gray-400">
                        <span class="w-3 h-3 bg-green-500 inline-block"></span> 已完成
                    </div>
                </div>
            </div>
            <div class="bg-white dark:bg-gray-800 rounded-xl p-5 shadow-sm">
                <h3 class="text-base font-semibold text-gray-700 dark:text-gray-200 mb-4">任務完成進度</h3>
                <canvas ref="barChartRef"></canvas>
            </div>
        </div>
    </div>
</template>

<script setup lang="ts">
import { ref, onMounted } from 'vue'
import { useTaskStore } from '../../stores/task'
import Chart from 'chart.js/auto'

const taskStore = useTaskStore()
const pieChartRef = ref<HTMLCanvasElement | null>(null)
const barChartRef = ref<HTMLCanvasElement | null>(null)

onMounted(() => {
    if (pieChartRef.value) {
        new Chart(pieChartRef.value, {
            type: 'doughnut',
            data: {
                labels: ['待處理', '進行中', '已完成'],
                datasets: [{
                    data: [taskStore.todoTasks, taskStore.inProgressTasks, taskStore.doneTasks],
                    backgroundColor: ['#e5e7eb', '#6366f1', '#22c55e'],
                }],
            },
            options: {
                plugins: { legend: { display: false } },
            },
        })
    }

    if (barChartRef.value) {
        new Chart(barChartRef.value, {
            type: 'bar',
            data: {
                labels: ['待處理', '進行中', '已完成'],
                datasets: [{
                    label: '任務數量',
                    data: [taskStore.todoTasks, taskStore.inProgressTasks, taskStore.doneTasks],
                    backgroundColor: ['#e5e7eb', '#6366f1', '#22c55e'],
                }],
            },
            options: {
                plugins: { legend: { display: false } },
                scales: { y: { beginAtZero: true } },
            },
        })
    }
})
</script>