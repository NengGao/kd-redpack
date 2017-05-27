
//const host = 'g.kuaidian.cn';
const host = '192.168.1.114:8080';
const start = {
	isTest : false,
	testOpenId : 'wxOpenId_001012'
}
const ip = {
	user : 'http://'+ host +'/user',
	portal : 'http://'+ host +'/rd-portal',
	robBuy : 'http://'+ host +'/robBuy',
	trade : 'http://'+ host +'/trade',
	room : 'http://'+ host +'/room'
}
const ws = {
	//roomCard : 'ws://ws.kuaidian.cn/room'
	roomCard: 'ws://192.168.1.114:8080/room',
	robBuy : 'ws://192.168.1.2:9000/robBuy'
}
module.exports = {
	host : host,
	ip : ip,
	start : start,
	ws : ws
}

