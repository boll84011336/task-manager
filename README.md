# 團隊任務管理後台

模擬企業內部任務管理系統，具備登入驗證、權限控管、任務管理與數據統計等功能。

🌐 **Demo**：https://task-manager-dem.netlify.app/login
🔗 **GitHub**：https://github.com/boll84011336/task-manager

---

## 技術棧

- **Vue3** Composition API
- **TypeScript**
- **Pinia** 全域狀態管理
- **Vue Router** 路由與權限控管
- **Tailwind CSS** 樣式
- **Chart.js** 圖表
- **Vite** 建構工具

---

## 功能說明

### 登入系統

- Mock 帳號驗證，token 存入 localStorage
- Route Guard 依角色控管頁面存取
- 重新整理後自動還原登入狀態

### Dashboard

- 任務總數、完成數、進行中、完成率統計
- Chart.js 圓餅圖與長條圖即時呈現資料

### 任務管理

- 新增、編輯、刪除任務
- 依狀態篩選（全部／待處理／進行中／已完成）
- 狀態即時切換
- Loading 狀態與空狀態處理

### 使用者管理（admin 限定）

- 使用者列表、搜尋篩選
- 分頁功能
- 新增、編輯、刪除使用者
- 角色權限（admin／member）

admin
→ 可以新增任務
→ 可以編輯所有任務
→ 可以刪除所有任務
→ 可以切換所有任務狀態

member
→ 可以新增任務（只能新增給自己）
→ 只能編輯自己負責的任務
→ 不能刪除任務
→ 只能切換自己負責的任務狀態

---

## 測試帳號

| 角色   | Email            | 密碼     |
| ------ | ---------------- | -------- |
| Admin  | admin@test.com   | 任意輸入 |
| Member | member1@test.com | 任意輸入 |

> Member 角色無法存取使用者管理頁面

---

## 本地運行

```bash

```
