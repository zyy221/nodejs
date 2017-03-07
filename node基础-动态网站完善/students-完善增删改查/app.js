
//加载http模块
const http = require('http');

//加载url模块
const url = require('url');

//加载path模块 处理路径
const path = require('path');

// 加载模板art-template
const template = require('art-template');
//配置模板引挚 默认模板路径
template.config( 'base' , path.join(__dirname , 'views'));

//加载文件模块 fs 
const fs = require('fs');

//加载第三方模块 mime
const mime = require('mime');

// 加载querystring模块
const querystring = require('querystring');

//引入json形式的用户模块
const students = require('./database/students');


//创建http实例
const server = http.createServer();
//监听端口
server.listen(3006);

server.on('request' , ( req , res ) => {
	//封装渲染模板
	res.render = function( tpl , data){
		let html = template( tpl , data);
		res.writeHeader( 200 , {'Content-Type':'text/html'});
		res.end(html);
	}
	//路径与路由有映射关系
	let {pathname , query}= url.parse(req.url , true);

	switch( pathname ){
		case '/':
		case '/add':
			res.render( 'add' , { action: '/save'});
		break;


		case '/list':
			res.render( 'list' , {lists:students});
		break;


		case '/save':

			req.body ='';
			req.on('data' , (chunk)=> {
				req.body += chunk;
			});

			req.on('end' , () => {
				//res.end(req.body); //得到是数据name=%E6%9D%8E%E5%9B%9B&sex=%E7%94%B7&age=26&phone=18312313456&email=zy123%40qq.com&subject=Android&score=70&date_start=2017-01-01&date_end=2017-12-01
				//将数据以 字符串的形式 转化成对象
				let formData = querystring.parse(req.body);
				//console.log(formData);
				//{ name: '张三',sex: '男',age: '20',phone: '18312313456',email: 'zy123@qq.com',subject: 'JAVA',score: '90',date_start: '2017-01-01',date_end: '2018-01-01' }
				students.push(formData);

				fs.open('./database/students.json' , 'w' , (err , fd) => {
					if( err ) {
						return res.end('internal error!');
					}

					//console.log(students);
					//[ { name: '张三', sex: '男',age: '20',phone: '18312313456',email: '1362@qq.com',subject: 'UI设计',score: '90',date_start: '2017-03-07',date_end: '2017-03-25' } ]
					

					//console.log(JSON.stringify(students));
					//[{"name":"莉莉","sex":"女","age":"26","phone":"18312313456","email":"zy3462@qq.com","subject":"前端与移动开发","score":"80","date_start":"2017-03-02","date_end":"2017-03-25"}]
					fs.write(fd , JSON.stringify(students),( err ) => {
						res.writeHeader( 302 , {
							'location':'/list'
						});
						res.end();
					})
				})

			})

		break;

		// ---编辑----
		case '/edit':
			//解析路径 得到query.key
			//通过key值拿到数据中所要找的数据的索引
			let sts = students[query.key];
			sts.action = '/updata?key=' + query.key;
			// console.log(sts);
			res.render( 'add' , sts);
			// 此时修改路径将数据提交到原索引位置
		break;

		case '/updata':
			//上传数据
			req.body = '';
			req.on('data' , (chunk) => { 
				req.body += chunk
			});
			req.on('end' , () => {
				// 将字符串转化成对象
				let formData = querystring.parse(req.body);
				//删除之前的内容添加新内容到原来的索引位置
				students.splice(query.key , 1 , formData);
				//放到列表里面
				fs.open('./database/students.json' , 'w' , (err , fd) => {
					if(err){
						return res.end('内部错误！');
					}

					fs.write(fd , JSON.stringify(students));
					res.writeHeader(302 , {'location':'/list'});
					res.end();
				})

			})

		break;

		//--删除----
		case '/del':
			// 根据索引删除
			students.splice(query.key , 1);
			fs.open('./database/students.json' , 'w' , ( err , fd) => {
				if( err ){
					return res.end('内部错误！');
				}

				fs.write(fd , JSON.stringify(students));
				res.writeHeader(302 , {'location':'/list'});
				res.end();
			})

			break;


		default:
			fs.readFile( path.join( 'public' , pathname ) , (err ,file) => {
				if( err ){
					return res.end('Not Found!');
				}

				res.writeHeader( 200 , {'Content-Type':mime.lookup(pathname)});
				res.end(file);
			});

	}


})