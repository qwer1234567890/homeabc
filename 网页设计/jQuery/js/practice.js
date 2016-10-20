$('#myBtn').css('color','blue');
$('.abc').css({'color':'yellow','background-color':'#ccc'});
$('p').css('color','pink');
$('div>span').css('color','grey');
$('#test').attr('title','def');        //////设置一个标签的属性
console.log($('#test').attr('title')); /////得到标签的一个属性的值
$('#test').removeAttr('title');        //////删除一个标签的指定属性
$('#test').addClass('red');            //////给一个标签添加一个red的类
$('#test').removeClass('red');         //////给一个标签删除一个red的类
// $('#myBtn').on('click',function() {
// 	$('#test').toggleClass('hidden');
// })
$('#myBtn')[0].onclick = function() {
	$('#test').toggleClass('hidden');
}
$('.qwe').on('click',function(){
	$('#test').toggleClass('hidden');
})
// $('.qwe')[0].onclick = function() {
// 	$('#test').toggleClass('hidden');
// }
$('#test').html('new span');
console.log($('#test').html());
$('#myBtn1').on('click',function(){
	$('#txt').val('');
})
$('#wapNav>li').on('click',function(){
	var $this = $(this);
	$this.addClass('active').siblings('.active').removeClass('active');
	console.log($('#wapNav>li').index($('.active')));
});
$('.anniu').on('click',function(){
		var para1 = {
			'margin-left' : '0px',
			'height' : '200px',
			'width' : '300px',
			'border-radius' : '0px'
		}
		var para2 = {
			'margin-left' : '500px',
			'height' : '100px',
			'width' : '100px',
			'border-radius' : '60px'
		}

		// $('.red-div').css('background-color','green');
		// console.log($('.red-div').css('background-color'))

		
		// $('.red-div').animate(para2,1000,function(){
		// 	$('.red-div').animate(para1,1000);
		// })

		if($('.red-div:visible').length){
			$('.red-div').animate(para1,1000);
			$('.red-div').fadeOut();
			//$('.red-div').hide(1000);
		}else{
			$('.red-div').fadeIn();
			$('.red-div').animate(para2,1000);
			//$('.red-div').show(1000);
		}
	
})
// $('.anniu').on('click',function(){
// 	$('.red-div').hide(5000,function(){
// 		console.log(!$('.red-div:visible').length)
// 	});
// })

/*var iframe = document.getElementById('iframe');
var cDocument = iframe.contentWindow.document;
var more = cDocument.getElementById('more');
console.log(more);
console.log(cDocument);
console.log(document)*/
var content = 0;
$('.wpBtn').on('click',function () {
	
	$('.wp').append('<span class="wpSpan">我是一个span' + content + '</span>');
	content++;
})
$('.wp').delegate($('.wpSpan'),'click',function () {
	console.log(this);
})
$('.wp').on('click',$('.wpSpan'),function() {
	console.log(this);
})


$('.wpBtn').data('name',18);
$('.wpBtn').data('name','18');
$('.wpBtn').data('name',[18,'18','abc']);
$('.wpBtn').data('name',{'name':'Mr.Wang','age':18,'gender':'man'});
console.log($('.wpBtn').data('name'));

$('a').attr('target','_blank');
$('a').each(function() {
	$(this).attr('target','_blank');
});

$('a:not(".special")').css('color','black');
$('a:first').css('color','blue');
$('a:last').css('color','green');
$("a:contains('span')").css('color','yellow');
$("a:has(span)").css('color','orange');
$("a:has(.pink)").css('color','pink');
console.log($('select').val());

var $abc = $('.asd');

console.log($abc.index());
$('a:eq(-1)').before('<input class="qwe">');
console.log($('input.qwe'));
console.log($('input.qwe') instanceof Array);
console.log($('input.qwe') instanceof Object);




