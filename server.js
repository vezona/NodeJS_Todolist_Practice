const http = require("http");
const errorHandler = require("./errorHandler.js");
const { v4: uuidv4 } = require("uuid");
const todoList = [];

const requestListener = (req, res) => {
  const headers = {
    "Access-Control-Allow-Headers":
      "Content-Type, Authorization, Content-Length, X-Requested-With",
    "Access-Control-Allow-Origin": "*",
    "Access-Control-Allow-Methods": "PATCH, POST, GET,OPTIONS,DELETE",
    "Content-Type": "application/json",
  };
  // 接收並組裝body資料
  let body = "";
  req.on("data", (chunk) => {
    body += chunk;
  });

  // 待辦事項頁面
  if (req.url == "/todo" && req.method == "GET") {
    res.writeHead(200, headers);
    res.write(
      JSON.stringify({
        status: "success",
        data: todoList,
      })
    );
    res.end();
  } else if (req.url == "/todo" && req.method == "POST") {
    // 新增
    req.on("end", () => {
      try {
        // 驗證格式是否正確
        const title = JSON.parse(body).title;
        if (title !== undefined) {
          // 設定新的代辦事項
          const todo = {
            title: title,
            id: uuidv4(),
          };
          // 新的待辦事項推入原本陣列
          todoList.push(todo);

          res.writeHead(200, headers);
          res.write(
            JSON.stringify({
              status: "success",
              data: todoList,
            })
          );
          res.end();
        } else {
          errorHandler(res, "缺少title屬性");
        }
      } catch (err) {
        errorHandler(res, "格式不正確");
      }
    });
  } else if (req.url == "/todo" && req.method == "DELETE") {
    // 刪除全部
    todoList.length = 0;
    res.writeHead(200, headers);
    res.write(
      JSON.stringify({
        status: "success",
        data: todoList,
        message: "delete success",
      })
    );
    res.end();
  } else if (req.url.startsWith("/todo/") && req.method == "DELETE") {
    // 刪除單筆
    // 抓出單筆id，判斷是否資料中有此id
    const id = req.url.split("/").pop();
    const index = todoList.findIndex((element) => element.id == id);
    if (index !== -1) {
      // 刪除該筆資料
      todoList.splice(index, 1);
      res.writeHead(200, headers);
      res.write(
        JSON.stringify({
          status: "success",
          data: todoList,
          message: `成功刪除單筆物件`,
        })
      );
      res.end();
    } else {
      errorHandler(res, "查無該筆物件");
    }
  } else if (req.url.startsWith("/todo/") && req.method == "PATCH") {
    // 編輯單筆
    // 特別注意，編輯需要接收body資訊，所以要等req on end 再動作
    req.on("end", () => {
      try {
        // (自訂)格式必須有title，進行驗證
        const title = JSON.parse(body).title;
        const id = req.url.split("/").pop();
        const index = todoList.findIndex((element) => element.id == id);
        console.log(index);
        if (title !== undefined && index !== -1) {
          todoList[index].title = title;
          res.writeHead(200, headers);
          res.write(
            JSON.stringify({
              status: "success",
              data: todoList,
              message: `編輯第${index}筆物件成功`,
            })
          );
          res.end();
        } else {
          errorHandler(res, "查無該筆物件");
        }
      } catch {
        errorHandler(res, "發生錯誤");
      }
    });
  } else if (req.method == "OPTIONS") {
    // 跨網域請求設定：preflight 發出 options 請求
    res.writeHead(200, headers);
    res.end();
  } else {
    // 404頁面
    res.writeHead(404, headers);
    res.write(
      JSON.stringify({
        status: "false",
        message: "無此網站路由",
      })
    );
    res.end();
  }
};

const server = http.createServer(requestListener);
server.listen(8080);
