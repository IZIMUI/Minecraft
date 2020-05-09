/**
* 此JS由〔lZiMUl〕个人编写开发
* 部分函数是从网络参考的
* 禁止修改和倒卖 否则承担法律责任
* 可授权使用,QQ〔2908554069〕 答案〔程序员/主播〕
* BiliBili 地址〔https://space.bilibili.com/291883246?share_medium=android&share_source=copy_link&bbid=XYF83CAFCD3359D0884B8E2CBE73B95A05E86&ts=1587381625535〕
* 我的服务 包括〔JS定制〕〔JS美化〕〔JS加密〕〔JS解密〕〔JS编码〕〔JS解码〕
* 因为此脚本开源 所以我不加密了 到时候修改还麻烦
* 感谢大家支持

* 还有

* 本人只会JavaScript 不会Css 如果您会请加我QQ 
* 让我们一起为 《WebSocket Server Of Minecraft》网站加油吧

**/


var ws;
var wss = new WebSocket("wss://broadcastlv.chat.bilibili.com:2245/sub");
var ConnectStatus = false;

document.getElementById("loading").style.display = "none";
document.getElementById("Close").setAttribute("disabled", "true");
document.getElementById("Close").style.background = "gray";

function DanMu(Room_Number, Callback) {
function ReadInt(Buffer, Start, Len) {
  let Result = 0;
  for (let Value = Len - 1; Value >= 0; Value--) {
    Result += Math.pow(256, Len - Value - 1) * Buffer[Start + Value];
  };
  return Result;
};

function WriteInt(Buffer, Value) {
  let Values = 0;
  while (Values < 4) {
    Buffer[Values] = Value / Math.pow(256, 4 - Values - 1);
    Values++;
  }
};

function Encode(Str, Op) {
  const Data = new TextEncoder("utf-8").encode(Str);
  const PacketLen = 16 + Data.byteLength;
  const Header = [0, 0, 0, 0, 0, 16, 0, 1, 0, 0, 0, Op, 0, 0, 0, 1];
  WriteInt(Header, PacketLen);
  return (new Uint8Array(Header.concat(...Data))).buffer;
};

function Decode(Blob) {
  return new Promise(function(Resolve, reject) {
    let Reader = new FileReader();
    Reader.onload = function(Event) {
      let Buffer = new Uint8Array(Event.target.result);
      let Result = {};
      Result.Code = ReadInt(Buffer, 8, 4);
      if (Result.Code === 5) {
        Result.Body = [];
        let Offset = 0;
        while (Offset < Buffer.length) {
          let PacketLen = ReadInt(Buffer, Offset, 4);
          let Body = new TextDecoder("utf-8").decode(Buffer.slice(Offset + 16, Offset + PacketLen));
          if (Body) {
            Result.Body.push(JSON.parse(Body));
          }
          Offset += PacketLen;
        }
      } else if (Result.Code === 3) {
        Result.Body = {
          count: ReadInt(Buffer, 16, 4)
        };
      }
      Resolve(Result);
    }
    Reader.readAsArrayBuffer(Blob);
  })
}
};

document.getElementById("Connect").addEventListener('click', function(){
if(document.getElementById("ConnectUrl").value){
document.getElementById("Connect").setAttribute("disabled", "true");
document.getElementById("Connect").style.background = "gray";
Toast({
Message:"正在连接请稍等",
Color: "orange",
Time:2000
});
setTimeout(function(){
document.getElementById("loading").style.display = "block";
ws = new WebSocket("ws://"+ document.getElementById("ConnectUrl").value)
Connect()
}, 2000);
} else {
Toast({
Message:"请输入WebSocket服务器地址",
Color: "red",
Time:2000
});
}});

document.getElementById("Close").addEventListener('click', function(){
if(ConnectStatus == true){
ws.close()
Toast({
Message:"已断开",
Color: "red",
Time:2000
});
ConnectStatus = false;
document.getElementById("loading").style.display = "none";
document.getElementById("Connect").removeAttribute("disabled");
document.getElementById("Connect").style.background = "yellow";
document.getElementById("Close").setAttribute("disabled", "true");
document.getElementById("Close").style.background = "gray";
}})

function Connect(){
ws.onopen = function(){
ws.onmessage = function(Data){
const Result = JSON.parse(Data.data).Result;
setTimeout(function(){
if(Result == "true"){
Toast({
Message:"已连接至WebSocket服务器",
Color: "green",
Time:2000
});
ConnectStatus = true;
document.getElementById("loading").style.display = "none";
document.getElementById("Close").removeAttribute("disabled");
document.getElementById("Close").style.background = "yellow";
}}, 2000)
};
}
var Delays = 0;
Delay()
function Delay(){
setTimeout(function(){
if(ConnectStatus == false){
if(Delays == 3){
Toast({
Message:"无法连接到WebSocket服务器",
Color: "red",
Time:2000
});
document.getElementById("loading").style.display = "none";
document.getElementById("Connect").removeAttribute("disabled");
document.getElementById("Connect").style.background = "yellow";
} else {
Delays++;
Delay();
}}}, 1000)
}}

function SendCommand (Type, Command){
if(ConnectStatus == true){
ws.send(JSON.stringify({
"body": {
"eventName": "WebSite",
"Request": {
"Type": Type,
"Data": Command
}}}));

Toast({
Message:"已发送指令",
Color: "green",
Time:2000
});
} else {
Toast({
Message:"请连接WebSocket服务器在进行指令发送",
Color: "red",
Time:2000
});
}}

document.getElementById("Run_File").addEventListener("click", function(){
alert();
});

function Connect_Room(Room_Number){
if(Room_Number){
alert("成功绑定直播间")
} else {
alert("房间号不能为空");
}};

function Toast(Strings){
let Establish = document.createElement("div");
Establish.setAttribute("id","Toast");
Establish.innerHTML = Strings.Message;
Establish.style.background = Strings.Color;
document.body.appendChild(Establish);
Establish.classList.add("FadeIn");
setTimeout(function(){
Establish.classList.remove("FadeIn"); 
Establish.classList.add("FadeOut");
Establish.addEventListener("animationend", function(){
Establish.classList.add("Hide");
});
},Strings.Time);
};
