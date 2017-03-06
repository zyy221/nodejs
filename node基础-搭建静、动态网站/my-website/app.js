
//加载http模块
const http = require('http');

//加载路径
const url = require('url');

//加载path 处理路径
const path = require('path');

//加载fs模块
const fs = require('fs');

//加载mime模块
const mime = require('mime');

//创建http实例
const server = http.createServer();


//监听端口
server.listen(3004);

server.on('request' , ( req , res ) => {

	//获取路径
	let pathname = url.parse(req.url).pathname;

	//设置不同的路由
	if( pathname == '/'){
		fs.readFile('./index.html' , ( err , file ) => {
			if(err)  return ;
			res.writeHeader( 200 , {'Content-Type':'text/html'});
			res.end(file);

		})
	}else if( pathname == '/201703/doc'){
		fs.readFile('./doc.html' , ( err , file ) => {
			if(err)  return ;
			res.writeHeader( 200 , {'Content-Type':'text/html'});
			res.end(file);

		})
	}else if( pathname == '/201703/blog'){
		fs.readFile('./blog.html' , ( err , file ) => {
			if(err)  return ;
			res.writeHeader( 200 , {'Content-Type':'text/html'});
			res.end(file);

		})
	}else{
		let realpath = path.join('./' , pathname);
		fs.readFile( realpath , ( err , file ) => {
			if(err) return;

			res.writeHeader( 200 , {'Content-Type':mime.lookup(realpath)});
			res.end(file);
		})
	}

})