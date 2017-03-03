
//加载http模块
// let http = require('http');

// //创建一个http实例
// const server = http.createServer();
// //监听窗口
// server.listen(3000);


//监听请求
// server.on('request' , ( req , res) => {
// 	//响应头（状态）
// 	res.writeHeader( 200 , {
// 		'Content-Type':'text/html',
// 		'Content-Length':12
// 	});

// 	//响应体
// 	res.write('<h1>Hello World</h1>');

// 	//结束
// 	res.end();
// })



// 如何处理请求
// 
// server.on('request' , ( req , res ) => {
// 	res.writeHeader( 200 , {
// 		'Content-Type':'text/html'
// 	});

// 	res.write('请求方式:' + req.method);
// 	res.write('<br>请求地址:' + req.url);
// 	res.write('<br>请求头是:' + JSON.stringify(req.headers));
// 	res.end();

// });




// get方式请求

// 加载http模块
// const http = require('http');

// const url = require('url');

// // 创建一个http实例
// const server = http.createServer();
// // 请求监听
// server.listen(3000);

// server.on('request' , ( req , res ) => {

// 	let query = url.parse(req.url , true).query;

// 	let {username , pass} = query;

// 	res.writeHeader( 200 , {
// 		'Content-Type':'text/html'
// 	});
// 	res.write('请求方式 : ' + req.method);
// 	res.write('<br>姓名为: ' + username);
// 	res.write('<br>密码: ' + pass);

// 	res.end();
// })




//post 方式请求
const http = require('http');

const server = http.createServer();

const querystring = require('querystring');

server.listen(3000);

server.on('request' , ( req , res ) => {

	// 定义一个字符串 post数据上传是一个持续触发事件
	let formDate = '';

	req.on('data' , (chun) => {
		// 字符串拼接
		formDate += chun;
	});
	// 当数据传输完毕后触发事件
	req.on('end' , () => {
		res.writeHeader( 200 , {
			'Content-Type':'text/html'
		});

		let {username , pass} = querystring.parse(formDate);

		res.write('请求方式: ' + req.method);
		res.write('<br>用户名: ' + username);
		res.write('<br>密码: ' + pass);

		res.end();

	})
})