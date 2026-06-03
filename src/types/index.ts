// 使用者
export interface User {
  id: number
  name: string
  email: string
  role: 'admin' | 'member'
  avatar?: string
}

// 任務狀態
export type TaskStatus = 'todo' | 'in-progress' | 'done'

// 任務
export interface Task {
  id: number
  title: string
  description: string
  status: TaskStatus
  assignee: string
  createdAt: string
  dueDate: string
}

// API 回應格式
export interface ApiResponse<T> {
  data: T
  message: string
  success: boolean
}

// 登入表單
export interface LoginForm {
  email: string
  password: string
}

// Token
export interface AuthToken {
  token: string
  user: User
}