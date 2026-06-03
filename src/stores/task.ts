import { defineStore } from "pinia";
import { ref, computed } from "vue";
import type { Task, TaskStatus } from "../types";
import { mockTasks } from "../api/mock";
import { useDate } from "../composables/useDate";

export const useTaskStore = defineStore("task", () => {
  const tasks = ref<Task[]>([...mockTasks]);
  const loading = ref(false);

  const totalTasks = computed(() => tasks.value.length);
  const doneTasks = computed(
    () => tasks.value.filter((t) => t.status === "done").length,
  );
  const inProgressTasks = computed(
    () => tasks.value.filter((t) => t.status === "in-progress").length,
  );
  const todoTasks = computed(
    () => tasks.value.filter((t) => t.status === "todo").length,
  );
  const completionRate = computed(() => {
    if (totalTasks.value === 0) return 0;
    return Math.round((doneTasks.value / totalTasks.value) * 100);
  });

  function addTask(task: Omit<Task, "id" | "createdAt">) {
    const { getTodayString } = useDate();
    const newTask: Task = {
      ...task,
      id: Date.now(),
      createdAt: getTodayString(),
    };
    tasks.value.push(newTask);
  }

  function updateTask(id: number, updates: Partial<Task>) {
    const index = tasks.value.findIndex((t) => t.id === id);
    if (index !== -1) {
      tasks.value[index] = { ...tasks.value[index], ...updates };
    }
  }

  function deleteTask(id: number) {
    tasks.value = tasks.value.filter((t) => t.id !== id);
  }

  function updateTaskStatus(id: number, status: TaskStatus) {
    updateTask(id, { status });
  }

  return {
    tasks,
    loading,
    totalTasks,
    doneTasks,
    inProgressTasks,
    todoTasks,
    completionRate,
    addTask,
    updateTask,
    deleteTask,
    updateTaskStatus,
  };
});
