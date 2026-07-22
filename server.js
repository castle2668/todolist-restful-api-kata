const http = require("http");
const { v4: uuidv4 } = require("uuid");
const headers = require("./headers");
const errorHandle = require("./errorHandle");

const todos = [];

const server = http.createServer((req, res) => {
  let body = "";
  req.on("data", (chunk) => {
    body += chunk.toString();
  });

  // 取得所有待辦
  if (req.url === "/todos" && req.method === "GET") {
    res.writeHead(200, headers);
    res.write(JSON.stringify({ status: "success", data: todos }));
    res.end();
  }
  // 新增單筆待辦
  else if (req.url === "/todos" && req.method === "POST") {
    req.on("end", () => {
      try {
        const title = JSON.parse(body).title;
        if (typeof title === "string" && title.trim() !== "") {
          const newTodo = { id: uuidv4(), title };
          todos.push(newTodo);
          res.writeHead(200, headers);
          res.write(JSON.stringify({ status: "success", data: todos }));
          res.end();
        } else {
          errorHandle(res);
        }
      } catch (error) {
        errorHandle(res);
      }
    });
  }
  // 刪除所有待辦
  else if (req.url === "/todos" && req.method === "DELETE") {
    todos.length = 0; // 清空陣列
    res.writeHead(200, headers);
    res.write(JSON.stringify({ status: "success", data: todos }));
    res.end();
  }
  // 刪除單筆待辦
  else if (req.url.startsWith("/todos/") && req.method === "DELETE") {
    const id = req.url.split("/").pop();
    const index = todos.findIndex((todo) => todo.id === id);
    if (index !== -1) {
      todos.splice(index, 1); // 從索引位置刪除一筆資料
      res.writeHead(200, headers);
      res.write(JSON.stringify({ status: "success", data: todos }));
      res.end();
    } else {
      errorHandle(res);
    }
  }
  // 編輯單筆待辦
  else if (req.url.startsWith("/todos/") && req.method === "PATCH") {
    req.on("end", () => {
      try {
        const title = JSON.parse(body).title;
        const id = req.url.split("/").pop();
        const index = todos.findIndex((todo) => todo.id === id);
        if (typeof title === "string" && title.trim() !== "" && index !== -1) {
          todos[index].title = title; // 更新標題
          res.writeHead(200, headers);
          res.write(JSON.stringify({ status: "success", data: todos }));
          res.end();
        } else {
          errorHandle(res);
        }
      } catch (error) {
        errorHandle(res);
      }
    });
  } else if (req.method === "OPTIONS") {
    res.writeHead(200, headers);
    res.end();
  } else {
    res.writeHead(404, headers);
    res.write(JSON.stringify({ status: "fail", message: "Not Found" }));
    res.end();
  }
});

const PORT = process.env.PORT || 3005;
server.listen(PORT, () => {
  console.log(`Server running at http://localhost:${PORT}/`);
});
