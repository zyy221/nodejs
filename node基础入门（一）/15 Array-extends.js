
//Array.foem() 装换成数组
// function foo(){
// 	console.log(Array.from(arguments));
// }

// foo(1,2,3);


//可转换具有length属性的对象
 // let str = 'hello world';
 // console.log(Array.from(str));

 //定义数组
 // let arr = Array.of(3,4,5);
 // console.log(arr);
 
 // find()
 let newArr = Array.of('a','2','3','4','e','f');

 // var res = newArr.find(function(val,key,arr){
 // 	// return val =='a';
 // 	return val >'3';
 	
 // });

 // console.log(res);
 var res = newArr.findIndex(function(val,key,arr){
 	// return val == 'a';
 	return val == 'e';
 });
 console.log(res);
