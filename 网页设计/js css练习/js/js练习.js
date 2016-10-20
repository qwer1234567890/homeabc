// document.getElementById('my-button').onclick=function(){
// 	alert('我又被点击了，疯了！！！');
// }
// document.getElementById('switch').onclick=function(){
// 	document.getElementById('light').src='tutu/on.gif';
// 	document.getElementById('switch').innerHTML='关灯';
// 	document.getElementById('switch').className='red';
// }
// var a='13';
// var b='a4';
// console.log(a+b);

// var x = 50;
// if (x < 12){
// 	console.log('儿童');
// } else if (x >= 12 && x < 18){
// 	console.log('少年');
// } else if (x >= 18 && x < 30){
// 	console.log('青年');
// } else if (x >= 30 && x < 50){
// 	console.log('中年');
// } else {
// 	console.log('老年');
// }
// for (var i = 1;i <= 20;i++){
// 	if (i % 3 == 2){
// 	console.log(i)
// 	}
// }
// var n = 0
// for (var m = 1; m <= 10; m += 1) {
// 	if( m == 10){
// 		break;
// 	}
// 	n += m
// }
// console.log(n)

// var k=0
// while (k < 10){
// 	k ++;
// console.log(k);
// }
// var imgUrl = 'img/abc/def.jpg';
// var ext = imgUrl.substr(11, 4)
// console.log(ext)
// var e='mid.txt.jkopjpg'
// var f=''
// f = e.substr(e.lastIndexOf('.'))
// console.log(f)

// var date = new Date();
// var date1= date.getFullYear() + '年' + (date.getMonth()+1) + '月' + date.getDate() + '日' + ' ' + date.getHours() + ':' + date.getMinutes() + ':' +date.getSeconds();
// console.log(date1)
// var h = 'm243'
// console.log(isNaN(h))
// var date = new Date()
// console.log(date)
// var array1 = ['a','b','c','d','e'];
// console.log(array1);



// var array1 = ['a','b','c','d','e'];
// // var array2 = ['h']
// console.log(array1.concat('h'))
//  var array1 = ['a','b','c','d','e'];
//   console.log(array1.join('='))
// var array1 = ['a','b','c','d','e'];
// for (var f = 0; f < array1.length;f++){
// console.log(array1[f])
// }


// var v = -5;
// console.log(Math.pow(8.01,2))



// var obj = new Object();
// obj.name = 'Mr.li';
// obj.age = 18;
// obj.height = '180cm';
// console.log(obj);

// var obj2 = {};
// obj2.name = 'Mr.lii';
// obj2.age = 28;
// obj2.height = '150cm';
// console.log(obj2)

// var obj3 = {
// 	name : 'Mr.liii',
// 	age : 38,
// 	height : '190cm'
// }
// console.log(obj3)
// var text1 = document.getElementById('text1');
// text1.innerHTML = ' hello word ';

// var img1 = document.getElementById('img1');
// img1.src = 'tutu/26.jpg'

// var text1 = document.getElementById('text1');
// text1.style.color = 'red';
// text1.style.fontSize = '45px';
// text1.style.backgroundColor = 'blue';
// text1.onclick = function(){       //event handler  事件处理程序
// 	text1.innerHTML = 'Goodbye Word !'
// }
// text1.onmouseover = function(){
// 	text1.innerHTML = 'Game Over'
// }
// text1.onmouseout = function(){
// 	text1.innerHTML = ' hello word '
// }

// var btn = document.getElementById('btn');
// btn.onclick = function(){
// 	window.open('http://www.baidu.com')
// }

// var newbtn = document.createElement('button');
// var text2 = document.createTextNode('登陆')
// var special = document.getElementById('special')
// newbtn.appendChild(text2);
// special.appendChild(newbtn);
// newbtn.removeChild(text2);
// special.removeChild(newbtn);

// setTimeout(function(){
// 		alert('过了几秒');
// },3000);
// setInterval(function(){
// 		console.log('过了几秒');
// },3000);
var myclock = document.getElementById('myclock');
var time;
function timer(){
	var date = new Date();
	hour = date.getHours();
	minute = date.getMinutes();
	second = date.getSeconds();
	time = fill0(hour) + ':' + fill0(minute) + ':' + fill0(second);
	myclock.innerHTML = time;
}
function fill0(num){
	return num < 10 ? '0' + num : num;
}
setInterval(timer,1000);




// var on = document.getElementById('on')
// var timer
// on.onclick = function(){
// 		timer = setInterval(function(){
// 		var prize = ['一个耳光','iphone7','谢谢惠顾','谢谢惠顾','谢谢惠顾','谢谢惠顾','谢谢惠顾','谢谢惠顾','Macbook Air','家乐福购物卡','谢谢参与','马克杯','小米超极本','三星galaxy','谢谢惠顾'];
//  		var all = parseInt(Math.random()*15);
// 		var choose = document.getElementById('choose');
// 		choose.innerHTML = prize[all];
//  },100);
// }
// var off = document.getElementById('off');
// off.onclick = function(){
//    clearInterval(timer);
// }

// var on = document.getElementById('on');
// var timer ;
// on.onclick = function(){
// if(timer){
// return;
// }
// 	timer = setInterval(function(){
// 	var prize = ['手机','电脑','数码相机','ipad','平板','笔记本','谢谢'];
// 	var number = parseInt(Math.random()*7);
// 	var choose = document.getElementById('choose');
// 	choose.innerHTML = prize[number];
// 	},100);
// }
// var off = document.getElementById('off');
// off.onclick = function(){
// 	clearInterval(timer);
//  timer = undefined;
// }
// var on = document.getElementById('on');
// var timer

// if(on.innerHTML == '开始摇大奖'){
// 	on.onclick = function(){
// 		timer = setInterval(function(){
// 			var prize = ['手机','电脑','数码相机','ipad','平板','笔记本','谢谢'];
// 			var number = parseInt(Math.random()*7);
// 			var choose = document.getElementById('choose');
// 			choose.innerHTML = prize[number];
// 		},100);	
// 		on.innerHTML = '停止';
// 		}
// }
// if(on.innerHTML == '停止'){
// 	on.onclick = function(){
// 		// clearInterval(timer);
// 	 	on.innerHTML = '开始摇大奖'
//  	}
// }

// var b1 = 0;
// for (var a1 = 0;a1 <= 100;a1++){
// 	if (a1 % 2 == 0) {
// 		b1 += a1;
// 	}	
// }
// console.log(b1);
// var d1 = 0;
// for (var c1 = 0;c1 <= 100;c1 += 2 ) {
// 		d1 += c1;
// }
// console.log(d1)


// var ten = '';
// var asd = 0
// setInterval(function(){
// 	var number123 = document.getElementById('number123');	
// 	if (ten.length < 20) {
// 		asd++;
// 		ten += asd;
// 		number123.innerHTML = ten;
// 	}
// },1000)



// var total = 1;
// for (var t1 = 5; t1 > 0;t1--){
// 	total*=t1;
	
// }
// var z;
// var a;
// var b;
// var c;
// var d;
// var r;
// var m = document.getElementById('nine');

// a = ['1','2','3','4','5','6','7','8','9'];
// b = ['1','2','3','4','5','6','7','8','9'];
// for(var e = 0;e < a.length;e++){
// 	for(var f = 0;f < b.length;f++){
// 		c = a[e]*b[f];
// 		d = a[e] + '*' + b[f] + '=' + c;
// 		console.log(d)
// 		m.innerHTML = d;
// 	}
// }
// for(var x = 1;x <= 9;x++){
// 	for(var y = 1;y <= x;y++){
// 		z = x*y
// 		r = x+'*'+y+'='+z
// 		console.log(r)
// 	}	
// }
///////九九乘法表
// document.write('<div class="nine" id="nine">');
// 	for(var x = 1;x <= 9;x++){
// 		for(var y = 1;y <= x;y++){
// 		document.write('<span class="one">*</span>');
// 		}
// 		document.write('<br>')
// 	}	
// document.write('</div>');
////////////////////////求十以内奇数相乘；
// var s = 1;
// var q = document.getElementById('multiplicative');
// for(var j = 1;j < 10;j += 2){
// 	s *= j;
// }
// console.log(s);
// q.innerHTML= s ;


// var Student = {
// 	name : '张三',
// 	age : 18
// };
// Student.gender = '男';
// Student.fkl = function(){
// 	console.log('我是Student下的一个函数')
	
// };
// console.log(Student);
// Student.age = ++Student.age;
// for(var key in Student){
// 	console.log(Student[key])
// }
// Student.fkl();
// // delete Student.gender;
// console.log(Student)

// var mit = 'asdsSDFSdF';
// console.log(mit.toLowerCase());
// console.log(mit.toUpperCase());
// console.log(mit.substr(1,3));
// console.log(mit.substring(1,3));
// console.log(mit.indexOf('d'));
// console.log(mit.lastIndexOf('d'));
// console.log(mit.charAt(5));



// function v1() {
// 	var date5 = new Date;
// 	date5.setFullYear(2008);
// 	date5.setMonth(7);
// 	date5.setDate(8);
// 	return date5;
// }
// console.log(v1());
function v2() {
	var date5 = new Date;
	// date5.setFullYear(2016);
	// date5.setMonth(6);
	// date5.setDate(21);
	// date5.setHours(16);
	// date5.setMinutes(37);
	// date5.setSeconds(28);
	var nian = date5.getFullYear();
	var yue = date5.getMonth();
	var ri = date5.getDate();
	var shi = date5.getHours();
	var fen = date5.getMinutes();
	var miao = date5.getSeconds();
	if(yue < 10){
		yue = '0' + yue;
	}
	if(ri < 10){
		ri = '0' + ri;
	}
	if(shi < 10){
		shi = '0' + shi;
	}
	if(fen < 10){
		fen = '0' + fen;
	}
	if(miao < 10){
		miao = '0' + miao;
	}
	var date6;
	return date6 = nian + '年' + yue  + '月' + ri + '日 ' + shi + ':' + fen + ':' + miao;
}
console.log(v2());

// setInterval(function v2() {
// 	var date5 = new Date;
// 	var nian = date5.getFullYear();
// 	var yue = date5.getMonth() + 1;
// 	var ri = date5.getDate();
// 	var shi = date5.getHours();
// 	var fen = date5.getMinutes();
// 	var miao = date5.getSeconds();
// 	var date6;
// 	if(yue < 10){
// 		yue = '0' + yue;
// 	}
// 	if(ri < 10){
// 		ri = '0' + ri;
// 	}
// 	if(shi < 10){
// 		shi = '0' + shi;
// 	}
// 	if(fen < 10){
// 		fen = '0' + fen;
// 	}
// 	if(miao < 10){
// 		miao = '0' + miao;
// 	}
// 	date6 = nian + '年' + yue + '月' + ri + '日 ' + shi + ':' + fen + ':' + miao;
// 	console.log(date6)
// },1000)
// 

// function total(l,k){
// 	var m = 0;
// 	for(x = l; x<= k;x++){
// 		m += x;
// 		return m;
// 	}
	
// }
// var r = total(5,6);
// console.log(r);

// var array3 = [132,3,54,34,25,6,7,9,10];
// console.log(array3.sort());
// var compare = function(x,y) {
//     return x - y; //从小到大排列;
//     // return y - x 是从大到小排列;
// }
// console.log(array3.sort(compare));
var array3 = [132,3,54,34,25,6,7,9,10,10086];
function compare(x,y){
	return	x > y;
}
var sel = document.getElementById('qwe')
sel.innerHTML = '<option>' + array3.sort(compare).join('</option><option>') + '</option>';	
// console.log(Math.floor(Math.random()*11));
















