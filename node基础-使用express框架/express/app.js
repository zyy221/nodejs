
//引入rexpress框架
const express = require('express');

//创建实例
const app = express();

//监听端口
app.listen(3006);

//设置模板目录
app.set('views' , 'views');
//设置模板引挚
app.set('view engine' , 'xtpl');

//设置静态资源目录
app.use(express.static('public'));

//index.html
app.get('/' , ( req , res ) => {
	//调用模板引挚 相应index.html页面
	res.render('index' , {
		title:'首页',
		content:{
			title:'这张图美不美',
			link:'/images/aa.jpg'
		},
		headers: {
			title: '学习Nodejs啦!',
			navs: [
				{text: '首页', link: '/'},
				{text: '文档', link: '/doc'},
				{text: '博客', link: '/blog'}
			]
		}
	});

});
//doc.html
app.get('/doc' , ( req , res ) => {
	//调用模板引挚 响应doc.html页面
	res.render('doc' , {
		title:'文档',
		content:{
			title:'这张图美不美',
			link:'/images/bb.png'
		},
		headers: {
			title: '学习Nodejs啦!',
			navs: [
				{text: '首页', link: '/'},
				{text: '文档', link: '/doc'},
				{text: '博客', link: '/blog'}
			]
		}
	});
} );
//blog.html
app.get('/blog' , (req , res) => {
	//调用模板引挚 响应blog.html页面
	res.render('blog' , {
		title:'博客',
		content:{
			title:'这张图美不美',
			link:'/images/cc.jpg'
		},
		headers: {
			title: '学习Nodejs啦!',
			navs: [
				{text: '首页', link: '/'},
				{text: '文档', link: '/doc'},
				{text: '博客', link: '/blog'}
			]
		}
	});
});
