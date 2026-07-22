const headers = require("./headers");

function errorHandle(res) {
  res.writeHead(400, headers);
  res.write(JSON.stringify({ status: "fail", message: "Invalid input" }));
  res.end();
}

module.exports = errorHandle;
