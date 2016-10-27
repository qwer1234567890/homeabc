!function(window,document,$,undefined){

	var Libaray = {
			$loadingWp: $('.masker-wp'),
			init: function(){

				this.initEvent();///////////this指向Libaray对象
				this.initTable();
				this.initDate();
				this.initOption();
			},
			initTable: function(){
				var url = 'php/books_list.php',
					Lib = this;
				Lib.$loadingWp.show();

				$.get(url,function(back){
					
					if(back.success){
						Lib.onRenderTable(back.data);
					}
				},'json');
			},
			onRenderTable: function(data) {
				var arr = [],
				$tbody = $('#booksTable tbody');
				$.each(data,function(){

					var b_status = this.borrow_status;
					var b_statusMap = {1:'出借',0:'库存'};

					arr.push('<tr>',
								'<td>',this.name,'</td>',
								'<td>',this.author,'</td>',
								'<td>',this.publisher,'</td>',
								'<td>￥',this.price,'</td>',
								'<td>',this.p_date,'</td>',
								'<td>',this.classify,'</td>',
								'<td>',this.status?'上架' :'下架','</td>',
								'<td>',b_statusMap[b_status],'</td>',
								'<td>',this.bookPic,'</td>',
							'</tr>');
				});
				$tbody.html(arr.join(''));
				Libaray.$loadingWp.hide();

			},
			initEvent: function() {

				$('#btn_addBook').on('click',this.onAddBook);///////////this指向Libaray对象
				$('#btn_saveBook').on('click',this.onSaveBook);
				$('#p_year').on('change',this.onRenderMonth);
				$('#p_month').on('change',this.onRenderDay);
				$('#status-down').on('click',this.onDisbled);
				$('#status-up').on('click',this.onNomal);

				$('#test_date').on('click',this.showDatePicker);
			},
			initDate: function() {//////////////////初始化日期组件

					$('#date-piaker').datetimepicker({
						todayBtn:  1,
						format: 'yyyy-mm-dd',
						autoclose: 1,
						minView: 2,
						language:'zh-CN'
					});

			},
			onAddBook: function() {

				$('#bookDlg').modal();

			},
			initOption:function(){////////////////////初始化DIY日期年份中的选项

				this.onRenderOpt($('#p_year'),pub_Date);

			},
			onRenderOpt: function(obj,data) {///////////////////根据数据data给对象obj渲染option

				var $obj = $(obj);
				var arr = ['<option value="0">请选择</option>'];
				$.each(data,function(){
					arr.push('<option value=',this.value,'>',this.name,'</option>')
				});
				$obj.html(arr.join(''));
			},
			searchChildren: function(data,val){///根据value值找到对应对象data下children属性中的数组

				var obj = {};
				$.each(data,function(){
					if(this.value == val){
						obj = this.children;
					}
				});
				return obj;
			},
			onRenderMonth: function(){/////暂时不用/////渲染月份

				var val_year = $('#p_year').val(),
					Mon_data = Libaray.searchChildren(pub_Date,val_year);
				Libaray.onRenderOpt($('#p_month'),Mon_data);
				$('#p_day').html('<option value="0">请选择</option>');
			},
			onRenderDay: function(){///////暂时不用/////渲染天

				var val_year = $('#p_year').val(),
				val_month = $('#p_month').val(),
				Mon_data = Libaray.searchChildren(pub_Date,val_year),
				Day_data = Libaray.searchChildren(Mon_data,val_month);
				Libaray.onRenderOpt($('#p_day'),Day_data);			
			},
			p_date:function(obj){////暂时不用//找到jquery对象<select>下被选中<option>的值并返回一个数组

				var arr = [];
				obj.each(function(){
					var $this = $(this);
					arr.push($this.find('option:selected').text());
				});
				return arr;
			},
			onSaveBook:function(event){
				var $this = $(this),data,url;

				if($this.hasClass('submiting')){///////非常重要的技巧,通过保存按钮是否有相应样式来判断
					//////////////////函数是否继续执行,能有效防止二货用户狂点保存按钮触发事件冒泡等BUG
					return;
				};

				data = {
				name: $('#name').val(),
				author: $('#author').val(),
				publisher: $('#publisher').val(),
				price: $('#price').val(),
				p_date: $('#date-piaker').val(),
				p_date2: Libaray.p_date($('[name="p_date"]')).join(''),
				classify: $('#classify').val(),
				status: $('[name="status"]:checked').val(),
				borrow_status: $('[name="borrow_status"]:checked').val(),
				bookPic: $('#bookPic').val()
				},
				url = 'php/books_add.php';

				$this.addClass('submiting');/////////保存按钮被点击后,添加submiting类
				//Libaray.$loadingWp.show();

				$.get(url,data,function(back){
					if(back.success){
						$('#bookDlg').modal('hide');	
						alert('保存成功');
					}else{
						alert('保存失败');
					}
				Libaray.initTable();/////////////////让表格页面局部刷新显示新添加的项
				},'json');
			},
			onDisbled: function(){
				$('#borrow-down').prop('checked',true);
				$('#borrow-up').prop('disabled',true);
			},
			onNomal: function(){
				$('#borrow-up').prop('disabled',false);
			}
	}

	Libaray.init();

}(window,document,jQuery)
