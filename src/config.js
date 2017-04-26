
const host = '192.168.1.114:8080';

const start = {
	isTest : true,
	testOpenId : 'orJtLt_If3QAld15hxMnuI1uRoGU'
}
const ip = {
	user : 'http://'+ host +'/user',
	portal : 'http://'+ host +'/rd-portal',
	robBuy : 'http://'+ host +'/robBuy',
	room : 'http://'+ host +'/room',
}

module.exports = {
	ip : ip,
	start : start
}
