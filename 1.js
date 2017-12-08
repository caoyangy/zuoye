var express = require('express')
var mysql = require('mysql')
var jade = require('jade')
var app = express()
var pool = mysql.createPool({
	host: '127.0.0.1',
	user: 'root',
	password: 'caoyangy',
	database: 'user',
	port: 3306
})
var user = express.Router()
var ell = express.Router()
var xing = express.Router()
app.use('/user', user)
app.use('/ell', ell)
app.use('/xing', xing)
//pool.getConnection(function(err, connection) {
//		if (err) {
//			console.log('connection::' + err)
//			return
//		}
//		connection.query('select * from xinwen', function(err,data) {
//			if (err) {
//				console.log('mysql::' + err)
//				return
//			}
//			console.log(data[0].zhuti)
//			
//			
//		})
//
//	})
user.use('', function(req, res) {
	res.setHeader('Access-Control-Allow-Origin','*')
	pool.getConnection(function(err, connection) {
		if (err) {
			console.log('connection::' + err)
			return
		}
		connection.query('select * from xinwen', function(err,data) {
			if (err) {
				console.log('mysql::' + err)
				return
			}
			var usd=req.query.usd
			var num2=3
			var arr1=[]
			
			for(var i=0;i<data.length;i++){
				arr1.push(data[i].zhuti)
			}
			
			var num=Math.ceil(arr1.length/num2)
			if(usd == undefined){
			 	ye=arr1.slice(0,num2)
			 	usd = 0
			 }else{
			 	ye=arr1.slice(usd*num2,usd*num2+num2)
			 }
			
			var str = jade.renderFile('./1.jade', {pretty: true,tit: '新闻',txtarr:ye,nums:num,diannum:usd,urld:'user'})
			res.send(str)
		})

	})

})






ell.use('', function(req, res) {
	res.setHeader('Access-Control-Allow-Origin','*')
		pool.getConnection(function(err, connection) {
			if (err) {
				console.log('connection::' + err)
				return
			}
			connection.query('select * from jianjie', function(err,data) {
				if (err) {
					console.log('mysql::' + err)
					return
				}
				var usd=req.query.usd
				var num2=3
				var arr1=[]
				
				for(var i=0;i<data.length;i++){
					arr1.push(data[i].zhuti)
				}
				
				var num=Math.ceil(arr1.length/num2)
				if(usd == undefined){
				 	ye=arr1.slice(0,num2)
				 	usd = 0
				 }else{
				 	ye=arr1.slice(usd*num2,usd*num2+num2)
				 }
					
				var str = jade.renderFile('./1.jade', {pretty: true,tit: '简介',txtarr:ye,nums:num,diannum:usd,urld:'ell'})
				res.send(str)
			})
	
		})
})
xing.use('', function(req, res) {
res.setHeader('Access-Control-Allow-Origin','*')
	pool.getConnection(function(err, connection) {
		if (err) {
			console.log('connection::' + err)
			return
		}
		connection.query('select * from xinxi', function(err,data) {
			if (err) {
				console.log('mysql::' + err)
				return
			}
			var usd=req.query.usd
			var num2=3
			var arr1=[]
			
			for(var i=0;i<data.length;i++){
				arr1.push(data[i].zhuti)
			}
			
			var num=Math.ceil(arr1.length/num2)
			if(usd == undefined){
			 	ye=arr1.slice(0,num2)
			 	usd = 0
			 }else{
			 	ye=arr1.slice(usd*num2,usd*num2+num2)
			 }
			
			var str = jade.renderFile('./1.jade', {pretty: true,tit: '信息',txtarr:ye,nums:num,diannum:usd,urld:'xing'})
			res.send(str)
		})

	})
})

app.listen(8000, function() {
	console.log('ok')
})