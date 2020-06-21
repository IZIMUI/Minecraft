//这里填写运行扩展文件名 请勿填写文件后缀 默认js后缀
const ExtendList = new Array();

//必要默认依靠模块
const FileSystem = require('fs');
const os = require('os');
const WebSocket = require('nodejs-websocket');
const Http = require('http');
const Https = require('https');
const Url = "https://chushou.tv/room/41990704.html";
const IP = os.networkInterfaces().wlan0[0].address;
const Port = 4199;
const ServerMessage = "暂无启动数据";
const While = 0;

/** 感谢代码格式化网址  
 * https://tool.oschina.net/codeformat/js
 */

//事件 命令前缀 执行者 列表
const EventLists = new Array("PlayerMessage", "PlayerTransform", "BlockBroken", "BlockPlaced", "ItemUsed", "MobKilled", "PlayerDied", "GameSessionStart");
const FunctionPrefixs = new Array("指令", "功能", "文件", "推广", "系统");
const ExecutorPlayers = new Array("外部", "External", "lZiMUl", "指令彡工程");

//服务器运行时间
var ServerRunTimesSecond = 0;
var ServerRunTimesMinute = 0;
var ServerRunTimesHour = 0;
var ServerRunTimesDay = 0;

//服务器离线设置
var ServerOff = false;
var Tips = true;

//玩家触发事件记录次数
var ConnectNumber = 0;
var PlayerTransform = 0;
var BlockBroken = 0;
var BlockPlaced = 0;
var ItemUsed = 0;
var MobKilled = 0;
var PlayerDied = 0;

//重生点
var PosX;
var PosY;
var PosZ;
var HomeX;
var HomeY;
var HomeZ;

//运行扩展
for (var ExtendValue = 0; ExtendValue < ExtendList.length; ExtendValue++) {
	eval("const " + ExtendList[ExtendValue] + " = require('../Extend/WebSocket/" + ExtendList[ExtendValue] + ".js')");
};

//运行初始状态
console.log("【 客户端状态 】");
console.log("-----------------------------------------------");
console.log("IPv4: " + IP + "  |  端口: " + Port);
console.log("正在等待握手");

var Server = WebSocket.createServer(function(conn) {
	conn.sendText(JSON.stringify({
		"Result": "true"
	}));

	console.log("-----------------------------------------------");
	ConnectNumber++;
	console.log("握手成功   " + "  当前连接数为〔 " + ConnectNumber + " 〕个");
	console.log("-----------------------------------------------");

	//声明消息显示时间
	RunCommand("title @a times 0 15 0");

	//获取文档并设置游戏设定
	function ServerSettings(Rule, Data) {
		if (Data == true) {
			conn.sendText(JSON.stringify({
				"body": {
					"origin": {
						"type": "player"
					},
					"commandLine": "Gamerule " + Rule + " true",
					"version": 1
				},
				"header": {
					"requestId": "9b84bcb2-5390-11ea-9e87-0221860e9b7e",
					"messagePurpose": "commandRequest",
					"version": 1,
					"EventName": "commandRequest"
				}
			}));
		} else if (Data == false) {
			conn.sendText(JSON.stringify({
				"body": {
					"origin": {
						"type": "player"
					},
					"commandLine": "Gamerule " + Rule + " false",
					"version": 1
				},
				"header": {
					"requestId": "9b84bcb2-5390-11ea-9e87-0221860e9b7e",
					"messagePurpose": "commandRequest",
					"version": 1,
					"EventName": "commandRequest"
				}
			}));
		} else {
			console.log("布尔值错误")
		}
	};

	FileSystem.readFile('../Server.json', 'utf-8',
	function(err, data) {
		if (!err) {
			let Server_Settings = JSON.parse(data.toString());
			ServerSettings("friendly_Fire", Server_Settings.Server_Settings.World_Settings.friendly_Fire);
			ServerSettings("Show_Coordinates", Server_Settings.Server_Settings.World_Settings.Show_Coordinates);
			ServerSettings("Fire_Spreads", Server_Settings.Server_Settings.World_Settings.Fire_Spreads);
			ServerSettings("Tnt_Explodes", Server_Settings.Server_Settings.World_Settings.Tnt_Explodes);
			ServerSettings("Mod_Loot", Server_Settings.Server_Settings.World_Settings.Mod_Loot);
			ServerSettings("Natural_Regeneration", Server_Settings.Server_Settings.World_Settings.Natural_Regeneration);
			ServerSettings("Tile_Drops", Server_Settings.Server_Settings.World_Settings.Tile_Drops);
			ServerSettings("Immediate_Respawn", Server_Settings.Server_Settings.World_Settings.Immediate_Respawn);
			ServerSettings("Respawn_Radius", Server_Settings.Server_Settings.World_Settings.Respawn_Radius);
		}
	});

	//Minecraft客户端订阅此WebSocket
	for (let Value = 0; Value < EventLists.length; Value++) {
		conn.sendText(JSON.stringify({
			"body": {
				"eventName": EventLists[Value]
			},
			"header": {
				"requestId": "9b84bfdc-5390-11ea-9e87-0221860e9b7e",
				"messagePurpose": "subscribe",
				"version": 1,
				"EventName": "commandRequest"
			}
		}))
	};

	if (ServerOff == false) {
		ServerRunTime();

		function ServerRunTime() {
			try {
				setTimeout(function() {
					ServerRunTimesSecond++;
					if (ServerRunTimesSecond == 60) {
						ServerRunTimesMinute++;
						ServerRunTimesSecond = 0;
					};
					if (ServerRunTimesMinute == 60) {
						ServerRunTimesHour++;
						ServerRunTimesMinute = 0;
					};
					if (ServerRunTimesHour == 24) {
						ServerRunTimesDay++;
						ServerRunTimesHour = 0
					};
					ServerRunTime();
					EventUpdate();
				},
				1000)
			} catch(err) {}
		}
	};

	function DisplayMessage(Message) {
		console.log("客户端发送过来的数据：〔 " + Message + " 〕");
		console.log("-----------------------------------------------");
	};

	function RunCommand(Command) {
		Server.connections.forEach(function(conn) {
			conn.sendText(JSON.stringify({
				"body": {
					"origin": {
						"type": "player"
					},
					"commandLine": Command,
					"version": 1
				},
				"header": {
					"requestId": "9b84bcb2-5390-11ea-9e87-0221860e9b7e",
					"messagePurpose": "commandRequest",
					"version": 1,
					"EventName": "commandRequest"
				}
			}))
		})
	};

	function SendMessage(Message) {
		Server.connections.forEach(function(conn) {
			conn.sendText(JSON.stringify({
				"body": {
					"origin": {
						"type": "player"
					},
					"commandLine": "say §a" + Message,
					"version": 1
				},
				"header": {
					"requestId": "9b84babe-5390-11ea-9e87-0221860e9b7e",
					"messagePurpose": "commandRequest",
					"version": 1,
					"EventName": "commandRequest"
				}
			}))
		})
	};

	function SendErrorMessage(Name, Content, PlayerMessage) {
		conn.sendText(JSON.stringify({
			"body": {
				"origin": {
					"type": "player"
				},
				"commandLine": "say §e观众〔 §a" + Name + " §e〕 §c" + Content + " §e内容为 〔 §b" + PlayerMessage + "§e 〕",
				"version": 1
			},
			"header": {
				"requestId": "9b84babe-5390-11ea-9e87-0221860e9b7e",
				"messagePurpose": "commandRequest",
				"version": 1,
				"EventName": "commandRequest"
			}
		}))
	};

	function SendBoomMessage() {
		for (let Value = 0; Value < 100; Value++) {
			conn.sendText(JSON.stringify({
				"body": {
					"origin": {
						"type": "player"
					},
					"commandLine": "execute @a ~~~ say @a[name=!" + Name + "] ",
					"version": 1
				},
				"header": {
					"requestId": "9b84bcb2-5390-11ea-9e87-0221860e9b7e",
					"messagePurpose": "commandRequest",
					"version": 1,
					"EventName": "commandRequest"
				}
			}))
		}
	};

	function GetWebSite(Name, Url, PlayerMessage) {
		if (Url[4] !== "s") {
			Http.get(Url,
			function(res) {
				var html = "\n";
				res.on('data',
				function(data) {
					html += data;
				});
				res.on('end',
				function(data) {
					SendMessage(html);
				})
			}).on('error',
			function() {
				SendMessage(Name, "获取数据错误", PlayerMessage);
			});
		} else {
			Https.get(Url,
			function(res) {
				var html = "\n";
				res.on('data',
				function(data) {
					html += data;
				});
				res.on('end',
				function(data) {
					SendMessage(html);
				})
			}).on('error',
			function() {
				SendMessage(Name, "获取数据错误", PlayerMessage);
			});
		}
	};

	function EventUpdate() {
		/*conn.sendText(JSON.stringify({
			"body": {
				"origin": {
					"type": "player"
				},
				"commandLine": "title @a actionbar §6服务器运行时间 〔§a " + ServerRunTimesDay + " §6〕 天 – 〔§a " + ServerRunTimesHour + " §6〕 小时 – 〔§a " + ServerRunTimesMinute + " §6〕 分钟 – 〔§a " + ServerRunTimesSecond + " §6〕 秒\n§3移动数 〔§a " + PlayerTransform + " §3〕\n§6破坏数 〔§a " + BlockBroken + " §6〕\n§3放置数 〔§a " + BlockPlaced + " §3〕\n§6使用数 〔§a " + ItemUsed + " §6〕\n§3击杀数 〔§a " + MobKilled + " §3〕\n§6死亡数 〔§a " + PlayerDied + " §6〕\n\n\n\n",
				"version": 1
			},
			"header": {
				"requestId": "9b84bcb2-5390-11ea-9e87-0221860e9b7e",
				"messagePurpose": "commandRequest",
				"version": 1,
				"EventName": "commandRequest"
			}
		}));*/
	};

	function DataComparison(ArrayName, Content) {
		let Data;
		for (let Value = 0; Value < ArrayName.length; Value++) {
			if (Content == ArrayName[Value]) {
				Data = true;
				break;
			} else {
				Data = false;
			}
		}
		return Data;
	};

	setTimeout(function() {
		SendMessage("成功连接WebSocket服务器\n WebSocket最新公告〔 " + ServerMessage + " 〕\nIPv4:〔 " + IP + " 〕端口〔 " + Port + " 〕\n正在加载数据 请稍等");
	},
	500);

	conn.on("text",
	function(Message) {
		try {
			RunCommand("title @a times 0 15 0");

			//显示Minecraft客户端发送的数据
			DisplayMessage(Message);

			//获取客户端发送的数据类型
			const EventName = JSON.parse(Message).body.eventName;
			if (EventName == "WebSite") {
				let Type = JSON.parse(Message).body.Request.Type;
				let Data = JSON.parse(Message).body.Request.Data;
				if (Type == "Official") {
					RunCommand(Data);
				} else if (Type == "Other") {
					if (Data == "设家") {
						HomeX = PosX;
						HomeY = PosY;
						HomeZ = PosZ;
						SendMessage("设置成功");
					} else if (Data == "回家") {
						if (HomeX || HomeY || HomeZ) {
							RunCommand("tp @s " + HomeX + " " + HomeY + " " + HomeZ);
							SendMessage("成功回家");
						} else {
							SendMessage("请设置设家点，在回家，你没有设置设家点，你想回哪去")
						};
					}
				}
			}

			if (EventName == EventLists[0]) {

				const Name = JSON.parse(Message).body.properties.Sender;
				var Messages = JSON.parse(Message).body.properties.Message;
				var Data = new Array();
				Data = Messages.split(" ");

				if (DataComparison(FunctionPrefixs, Data[0]) == true) {

					if (DataComparison(ExecutorPlayers, Name) == true) {

						//模式区域
						if (Messages == "指令 模式 创造") {

							RunCommand("gamemode 1");

						} else if (Messages == "指令 模式 生存") {

							RunCommand("gamemode 0");

							//时间区域
						} else if (Messages == "指令 时间 早上") {

							RunCommand("time set day");

						} else if (Messages == "指令 时间 中午") {

							RunCommand("time set noon");

						} else if (Messages == "指令 时间 晚上") {

							RunCommand("time set night");

						} else if (Messages == "指令 时间 深夜") {

							RunCommand("time set midnight");

							//物品区域
						} else if (Messages == "指令 物品 钻石块") {

							RunCommand("give @s Diamond_block 64");

						} else if (Messages == "指令 物品 金块") {

							RunCommand("give @s Gold_block 64");

						} else if (Messages == "指令 物品 铁块") {

							RunCommand("give @s Iron_block 64");

						} else if (Messages == "指令 物品 钻石剑") {

							RunCommand("give @s Diamond_Sword 64");

							//效果区域
						} else if (Messages == "指令 效果 速度") {

							RunCommand("effect @s speed 1000 40 true");

						} else if (Messages == "指令 效果 高跳") {

							RunCommand("effect @s jump_boost 1000 40 true");

							//粒子区域
						} else if (Messages == "指令 粒子 老八") {

							RunCommand("function LaoBa");

						} else if (Messages == "指令 粒子 骨灰泼洒者") {

							RunCommand("function GuHuiPoSaZhe");

						} else if (Messages == "指令 粒子 黑手") {

							RunCommand("function HeiShou");

							//生物区域
						} else if (Messages == "指令 生物 Agent") {

							RunCommand("agent create");

						} else if (Messages == "") {} else if (Messages == "") {} else if (Messages == "") {} else if (Messages == "") {} else if (Messages == "") {} else if (Messages == "") {} else if (Messages == "") {} else if (Messages == "") {} else if (Messages == "") {} else if (Messages == "") {} else if (Messages == "") {} else if (Messages == "") {} else if (Messages == "") {} else if (Messages == "") {} else if (Messages == "") {} else if (Messages == "") {} else if (Messages == "文件 读取文件 " + Data[2]) {
							FileSystem.readFile('../Files/' + Data[2], 'utf-8',
							function(err, data) {
								if (err) {
									console.log("读取错误");
									SendMessage("读取错误");
								} else {
									console.log("异步读取： " + data.toString());
									SendMessage("异步读取： " + data.toString());
								}
							})
						} else if (Messages == "文件 写入文件 " + Data[2] + " " + Data[3]) {
							FileSystem.writeFile('../Files/' + Data[2], Data[3],
							function(err) {
								console.log("成功写入文件");
								SendMessage("成功写入文件");
							})
						} else if (Messages == "文件 复制文件 " + Data[2] + " " + Data[3]) {
							FileSystem.copyFile('../Files/' + Data[2], Data[3], err => {
								SendMessage(err);
							});
						} else if (Messages == "文件 运行文件 " + Data[2]) {
							FileSystem.readFile('../Files/' + Data[2], 'utf-8',
							function(err, data) {
								if (err) {
									console.log("运行错误");
									SendMessage("运行错误");
								} else {
									eval(data.toString());
									SendMessage("运行成功");
									console.log("运行成功");
								}
							})
						} else if (Messages == "") {

							//无中值区域          	                    	   
						} else if (Messages == "指令 杀死所有玩家") {

							RunCommand("gamemode 0 @a");
							RunCommand("kill @a");

						} else if (Messages == "指令 让所有人飞起来") {

							RunCommand("gamemode 0 @a");
							RunCommand("effect @a levitation 1 255 true");
							RunCommand("gamemode 1 " + Name);
							SendMessage("飞起来吧");

						} else if (Messages == "指令 死") {

							RunCommand("kill @s");

							//功能区域
						} else if (Messages == "功能 获取网页 " + Data[2]) {

							GetWebSite(Name, Data[2], Messages)

						} else if (Messages == "功能 设家") {

							HomeX = PosX;
							HomeY = PosY;
							HomeZ = PosZ;
							SendMessage("设置成功");

						} else if (Messages == "功能 回家") {

							if (HomeX || HomeY || HomeZ) {
								RunCommand("tp @s " + HomeX + " " + HomeY + " " + HomeZ);
								SendMessage("成功回家");
							} else {
								SendMessage("请设置设家点，在回家，你没有设置设家点，你想回哪去")
							};

						} else if (Messages == "功能 崩房") {

							SendMessage("成功崩房")

							SendBoomMessage()

						} else if (Messages == "功能 Ban " + Data[2]) {

							RunCommand(Data[2], "Tag @s add Ban");

							//推广区域
						} else if (Messages == "推广 我的广告") {

							SendMessage("B站搜索〔 lZIMUl 〕\n触手直播搜索 〔 触手TV紫幕 〕");

							//系统区域
						} else if (Messages == "系统 公告") {

							SendMessage("暂无公告 因为我懒得写公告 嘿嘿");

						} else if (Messages == "系统 重启") {

							SendMessage("重启失败，原因 我不会做重启函数 哈哈哈哈");

						} else if (Messages == "系统 更新") {

							SendMessage("升级个屁 需要你自己手动升级〔 " + Name + " 〕");

						} else if (Messages == "系统 关闭") {

							SendMessage("服务器已关闭");

						} else {

							SendErrorMessage(Name, "发送未知指令", Messages);

						}
					} else {
						SendMessage("尊敬的〔 " + Name + " 〕 您不是执行者，请向服主获取执行者权限")
					}
				}
			} else if (EventName == EventLists[1]) {

				PlayerTransform++;
				PosX = JSON.parse(Message).body.properties.PosX;
				PosY = JSON.parse(Message).body.properties.PosY;
				PosZ = JSON.parse(Message).body.properties.PosZ;

			} else if (EventName == EventLists[2]) {

				BlockBroken++;

			} else if (EventName == EventLists[3]) {

				BlockPlaced++;

			} else if (EventName == EventLists[4]) {

				ItemUsed++;

			} else if (EventName == EventLists[5]) {

				MobKilled++;

			} else if (EventName == EventLists[6]) {

				PlayerDied++;

			} else if (EventName == EventLists[7]) {

}
		} catch(err) {}
	});

	conn.on("close",
	function(code, reason) {

		ServerOff = true;
		ConnectNumber--;
		console.log("连接已断开   " + "  当前连接数为〔 " + ConnectNumber + " 〕个")

	});

	conn.on("error",
	function(err) {

		ServerOff = true;
		if (Tips == true) {
			console.log("连接错误");
			Tips = false;
		};

	});

}).listen(Port, IP);
