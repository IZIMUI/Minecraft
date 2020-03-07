var ws;
var ConnectStatus = false;

document.getElementById("loading").style.display = "none";
document.getElementById("Close").setAttribute("disabled", "true");
document.getElementById("Close").style.background = "gray";

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
ws = new WebSocket(document.getElementById("ConnectUrl").value)
Connect()
document.getElementById("loading").style.display = "block";
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
Color: "green",
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