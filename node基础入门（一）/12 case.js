
//函数赋值
let a = 10;
let b = 20;

console.log(a , b);

[a , b] = [ b , a];

console.log(a , b);

// 接受函数返回值

// function foo(){
// 	return {
// 		name:'jim',
// 		age:18,
// 		sex:'男'
// 	}
// }

// var {name , age , sex} = foo();

// console.log(name , age , sex);

// 提取JSON对象值
let json = '{"name":"Itcast" , "age": 11}';

let {name , age} = JSON.parse(json);
console.log(name , age);