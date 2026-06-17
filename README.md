# Todolist RESTful API Kata

以 Node.js **原生 `http` 模組**實作的待辦事項 RESTful API 練習，未使用任何 web framework。資料存於記憶體陣列，重啟後即清空。

## 環境需求

- Node.js `>=20`

## 安裝與啟動

```bash
npm install
npm run dev    # 使用 nodemon 開發模式
npm start      # 直接以 node 啟動
```

預設監聽 `http://localhost:3005`（可用環境變數 `PORT` 覆寫）。

## API

所有回應皆為 JSON，並已開啟 CORS。

| Method   | Path         | 說明         | Request Body          |
| -------- | ------------ | ------------ | --------------------- |
| `GET`    | `/todos`     | 取得所有待辦 | —                     |
| `POST`   | `/todos`     | 新增單筆待辦 | `{ "title": "字串" }` |
| `PATCH`  | `/todos/:id` | 編輯單筆待辦 | `{ "title": "字串" }` |
| `DELETE` | `/todos/:id` | 刪除單筆待辦 | —                     |
| `DELETE` | `/todos`     | 清空所有待辦 | —                     |

### 回應格式

成功：

```json
{
  "status": "success",
  "data": [{ "id": "uuid", "title": "買牛奶" }]
}
```

失敗（`title` 缺漏 / JSON 格式錯誤 → `400`；找不到 id → `400`；未知路由 → `404`）：

```json
{ "status": "fail", "message": "Invalid input" }
```

## 範例

```bash
# 新增
curl -X POST http://localhost:3005/todos \
  -H "Content-Type: application/json" \
  -d '{"title":"買牛奶"}'

# 取得全部
curl http://localhost:3005/todos
```
