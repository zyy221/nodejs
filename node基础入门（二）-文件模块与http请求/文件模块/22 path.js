
// 引入系统模块 path 此模块用于处理路径
const path = require('path');

// 模拟一个路径
let src = './public/image/logo.png';

// 获取所在的相对路径 dirname
// let pathname = path.dirname(src);

// console.log(pathname);

// console.log(__dirname);

//获取文件名 basename
 // let filename = path.basename(src);

 // console.log(filename);

 //获取扩展名
 // let extname = path.extname(src);

 // console.log(extname);

//解析路径
let parsepath = path.parse(src);

// console.log(parsepath);

let {dir , base , ext , name } = parsepath;

console.log(dir , base , ext , name);