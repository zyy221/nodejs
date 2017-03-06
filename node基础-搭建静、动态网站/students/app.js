
//加载http模块
const http = require('http');

//获取路径模块
const url = require('url');

//加载模块path 处理文件路径
const path = require('path');

//加载模板art-template
const template = require('art-template');
// 配置模板引擎，默认模板路径
template.config('base', path.join(__dirname, 'views'));

//加载文件模块 fs
const fs = require('fs');

//加载模块 mime 根据文件后缀名查找不同的文件类型
const mime = require('mime');

//加载模块 querystring 用来解析post上传参数
const querystring = require('querystring');

//加载用户模块->database/students.json
const students = require('./database/students');

//创建http实例
const server = http.createServer();
//监听端口
server.listen(3005);


//监听请求
server.on('request' , ( req , res ) => {

	//封装渲染模板
	res.render = function( tpl , data){

		let html = template( tpl , data);
		res.writeHeader( 200 , {'Content-Type':'text/html'});
		res.end(html);
	};

	//获取路径(?前面的纯路径) 路径与路由的映射关系
	//用到了 系统模块->url的parse解析路径
	let pathname = url.parse(req.url).pathname;

	//设计路由
	switch( pathname ){
		case '/':
		case '/add':
			res.render( 'add' , {});
			break;
		case '/list':
			res.render( 'list' , {lists : students});
			break;

		case '/save':
			//接收表单提交数据 post/get方式提交都可以 
			//以post方式提交为例
			//post方式 数据上传是一点一点上传的 所以用一个属性接收
			res.body = '';
			// 上传数据时 会持续触发data事件
			req.on( 'data' , ( chunk ) => {
				res.body += chunk;
			});

			// console.log(res.body);
			//当post方式数据传输完毕时 会触发end事件
			//此时用到系统模块->querystring 转化成数组对象
			req.on( 'end' , () => {

				//将字符串转成对象,就是把url上带的参数串转成数组对象。
				let formDate = querystring.parse(res.body);
				//将提交的数据存起来
				let database = path.join(__dirname , 'database/students.json');
				//文件读取操作 打开students.json文件
				// fd 文件描述符
				fs.open( database , 'w' , ( err , fd ) => {
					if( err ) {return res.end('internal error');}
					//将上传的数据追加到students.json文件里
					//students 是获取的加载进来的json格式的用户模块->database/students.json
					students.push( formDate );
					//解析students.json里的数据
					//JSON.stringify 用于从一个对象解析成字符串
					// 302 用于页面的重定向 location指向的是:通过Location设定跳转地址,将数据放在哪个页面上
					fs.write( fd, JSON.stringify(students) , ( err ) => {
						res.writeHead(302, {
							'Location': '/list'
						});
						res.end();
					})
				})

			});
			break;

		default:
			//加载静态资源 如：图片、css、js等 
			//获取新路径 对文件进行操作
			//用到了 系统模块->path、fs、第三方模块->mime
			// fs.readFile(path.join( 'public' , pathname) , ( err , file ) => {
			// 	if( err ) { return res.end( err);}
			// 	res.writeHead( 200 , {'Content-Type':mime.lookup(pathname)});
			// 	res.end(file);

			// });

			fs.readFile(path.join('public', pathname), (err, file) => {
				if(err) {
					return res.end('not found!');
				}

				res.writeHead(200, {'Content-Type': mime.lookup(pathname)});
				res.end(file);
			});
	}

})