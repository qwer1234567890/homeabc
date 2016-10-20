!function(window, document,$,undefined){
	function siderbar(){




		$('.tab1>div').on('mouseenter',function(){
			var $this = $(this);	
			$this.animate({'width':'82px'},500);
		}).on('mouseleave',function(){
			var $this = $(this);
			$this.animate({'width':'35px'},200);
		});


		$('.tab2>div').on('mouseenter',function(){
			var $this = $(this);	
			$this.animate({'width':'108px'},500);
		}).on('mouseleave',function(){
			var $this = $(this);
			$this.animate({'width':'35px'},200);
		});


		// var $div = $('.tab1>div');
		// $div.each(function(i,obj){
		// 	var$obj = $(obj);
		// 	if($obj.hasClass())




		// })



		$('.tab0-8').on('click',function(){
			var timer;

			timer = setInterval(function(){

				if(document.body.scrollTop <= 800){
		        	document.body.scrollTop -= 30;
		        }else{
		        	document.body.scrollTop -= 200;
		        }

		        if(document.body.scrollTop <= 0){
		        clearInterval(timer);
	    		}
	    	},10)
		})
		
	}
	siderbar();






}(window,document,jQuery)