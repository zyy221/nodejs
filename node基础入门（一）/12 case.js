
//������ֵ
let a = 10;
let b = 20;

console.log(a , b);

[a , b] = [ b , a];

console.log(a , b);

// ���ܺ�������ֵ

// function foo(){
// 	return {
// 		name:'jim',
// 		age:18,
// 		sex:'��'
// 	}
// }

// var {name , age , sex} = foo();

// console.log(name , age , sex);

// ��ȡJSON����ֵ
let json = '{"name":"Itcast" , "age": 11}';

let {name , age} = JSON.parse(json);
console.log(name , age);