const WebSocket = require('ws');
onst wss = new WebSocket.Server({ port: 8906 });
const uuid = require('node-uuid');
// 省略一些参数的定义
// 服务端处理连接
wss.on('connection', function(ws) {
  console.log('client [%s] connected', clientIndex);
  var connection_uuid = uuid.v4();
  var nickname = "AnonymousUser" + clientIndex;
  clientIndex += 1;
  clients.push({ "id": connection_uuid, "ws": ws, "nickname": nickname });
  
 //服务器收到消息时
  ws.on('message', function(e) {
   var data = JSON.parse(e);
   var type = data.type;
   // 省略业务处理逻辑
  });

  // ws连接关闭时触发的操作
  ws.on("close", function () {
   websocketClose();
  });
  
  // 省略函数 websocketClose()、wsSend()、socketClose 的定义
  // 聊天服务器关闭所触发的操作
  process.on("SIGINT", function () {
   console.log("SOCKET CLOSED!");
   ("客服已关闭，请稍后再来");
   process.exit();
  });
});
