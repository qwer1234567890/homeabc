!function(window,document,$,undefined){

	var Libaray = {
			param:{},
			Cache: {},
			$loadingWp: $('.masker-wp'),
			classify_map: [
				{value:1,name:'历史类'},
				{value:2,name:'文学类'},
				{value:3,name:'艺术类'},
				{value:4,name:'科技类'},
				{value:5,name:'军事类'},
				{value:6,name:'百科类'},
				{value:7,name:'社会类'}
			],
			init: function(){

				this.initEvent();///////////this指向Libaray对象
				this.initTable();
				this.initDate();
				this.initYearOption();
				this.initClassify();
			},
			initTable: function(){
				var url = 'php/books_list.php';

				Libaray.$loadingWp.show();

				$.get(url,{query: Libaray.param.query || ''},function(back){
					
					if(back.success){
						Libaray.onRenderTable(back.data);
//////每次查询后 让Libaray.param.query = '' 否则接下去每次初始化table的时会根据Libaray.param.query的值来渲染表格
						Libaray.param.query = '';
					}else{					
						alert('查询失败,请刷新重试！');	//php返回的success值都是 true 这两行不执行	RenderDable ↓
						Libaray.$loadingWp.hide();
					};
				},'json');
			},
			onRenderTable: function(data) {
				var arr = [],
					$tbody = $('#booksTable tbody'),
					classify_tablemap = {
						0: '未分类',
						1: '历史类',
						2: '文学类',
						3: '艺术类',
						4: '科技类',
						5: '军事类',
						6: '百科类',
						7: '社会类'
					},
					b_status = this.borrow_status,
					b_statusMap = {1:'出借',0:'库存'}; 
////////////////////////////////////////////////////////////////////////////////////////////////
				if(data.length == 0){
					alert('暂无查询结果,请更换查询关键字重试!');
					//$('#searchIpt').val('');
					Libaray.$loadingWp.hide();
					return;
				}
///////////////////////////////////////////////////////////////////////////////////////////////
				$.each(data,function(){
						
					arr.push('<tr>',
								'<td><input type="checkbox" value="',this.id,'"></td>',
								'<td>',this.name,'</td>',
								'<td>',this.author,'</td>',
								'<td>',this.publisher,'</td>',
								'<td>￥',this.price,'</td>',
								'<td>',this.p_date,'</td>',
								'<td>',classify_tablemap[this.classify],'</td>',
								'<td>',this.status?'上架' :'下架','</td>',
								'<td>',b_statusMap[this.borrow_status],'</td>',
								'<td>',this.bookPic,'</td>',
							'</tr>');

					Libaray.Cache[this.id] = this;////让this中每个id的值成为这个对象的父对象的属性;
										      /////使每一条图书信息都有他相应的的ID值作为它的唯一标识

				});
				//console.log(data);
				//console.log(Libaray.Cache); /////得到了一个新对象具有
				
				$tbody.html(arr.join(''));
				$('#btn_changeBook').attr('disabled','disabled');
				$('#btn_delBook').attr('disabled','disabled');
				$('#btn_checkAll').prop('checked',false);
				$('#searchIpt').val('');
				Libaray.$loadingWp.hide();

			},
			initEvent: function() {

				$('#btn_addBook').on('click',this.onAddBook);///////////this指向Libaray对象
				$('#btn_saveBook').on('click',this.onSaveBook);
				$('#p_year').on('change',this.onRenderMonth);
				$('#p_month').on('change',this.onRenderDay);
				$('#status-down').on('click',this.onDisbled);
				$('#status-up').on('click',this.onNomal);
				$('#booksTable').on('click','tbody input[type="checkbox"]',this.onChoose);
				$('#btn_delBook').on('click',this.onDeleteBook);
				$('#btn_checkAll').on('click',this.onChooseAll);
				$('#btn_changeBook').on('click',this.onChangeBook);
				$('#btn_searchBook').on('click',this.onSearchBook);
				$('#btn_bookList').on('click',this.initTable);
			},
			onSearchBook:function() {
				var searchName = $('#searchIpt').val();
				Libaray.param.query = searchName;
				Libaray.initTable();
			},
			onChoose: function() {
				var len = $('#booksTable tbody input[type="checkbox"]:checked').length,
					lens = $('#booksTable tbody input[type="checkbox"]').length,
					$btn_checkAll = $('#btn_checkAll'),
					$delBook = $('#btn_delBook'),
					$btn_changeBook = $('#btn_changeBook');
				
					if(len > 0){
						$delBook.removeAttr('disabled');
						if(len == 1){
							$btn_changeBook.removeAttr('disabled');				
						}else{
							$btn_changeBook.attr('disabled','disabled');
						};
						if(len == lens){
							$btn_checkAll.prop('checked',true);
						}else{
							$btn_checkAll.prop('checked',false);
						}
					}else{					
						$delBook.attr('disabled','disabled');
						$btn_changeBook.attr('disabled','disabled');
						$btn_checkAll.prop('checked',false);				
					}
			},
			onChooseAll: function () {
				var $checkedBox = $('#booksTable tbody input[type="checkbox"]'),
					$delBook = $('#btn_delBook'),
					$btn_changeBook = $('#btn_changeBook'),status;

				if(this.checked){
					status = true;
					if($checkedBox.length == 1){

						$btn_changeBook.removeAttr('disabled');
					};
					$delBook.removeAttr('disabled');

				}else{

					status = false;
					$btn_changeBook.attr('disabled','disabled');
					$delBook.attr('disabled','disabled');

				};
				$checkedBox.each(function (i,obj) {
						obj.checked = status;
					});
			},
			onChangeBook: function() {
				var $checkedBox = $('#booksTable tbody input[type="checkbox"]:checked'),
					$bookDlg = $('#bookDlg'),
					//var id = $checkedBox.attr('value'),    //jQuery方法
					id = $checkedBox[0].value,
					currBookDate = Libaray.Cache[id];
				// var currStatusIndex = currBookDate.status ? 0: 1,/////我的笨方法
				// 	currB_StatusIndex = currBookDate.borrow_status ? 0: 1;

				//console.log(currBookDate);

				$bookDlg.find('#myModalLabel').val('修改图书').end()
						.find('#btn_saveBook').html('确定修改').addClass('change').end()
						.modal('show');
				$bookDlg.find('#name').val(currBookDate.name);
				$bookDlg.find('#author').val(currBookDate.author);
				$bookDlg.find('#publisher').val(currBookDate.publisher);
				$bookDlg.find('#price').val(currBookDate.price);
				$bookDlg.find('#date-piaker').val(currBookDate.p_date);
				$bookDlg.find('#classify').val(currBookDate.classify);
				////////我的笨方法
				//$bookDlg.find('[name="status"]').eq(currStatusIndex).prop('checked',true);
				//$bookDlg.find('[name="borrow_status"]').eq(currB_StatusIndex).prop('checked',true);
				$bookDlg.find('[name="status"][value="'+ currBookDate.status +'"]').trigger('click');
				$bookDlg.find('[name="borrow_status"][value="'+ currBookDate.borrow_status +'"]').trigger('click');
				$bookDlg.find('#bookPic').val();
				

			},
			onDeleteBook: function () {
				var $checkedBox,url,
					ids = [];

				if(!confirm('确定删除吗？')){
					return;
				}
				Libaray.$loadingWp.show()
				$checkedBox = $('#booksTable tbody input[type="checkbox"]:checked');
				$checkedBox.each(function(i,obj){
					ids.push(obj.value);
				});
				url = 'php/books_del.php';
				$.get(url,{ids: ids.join(',')},function(back){

					if (back.success){
						$('#btn_delBook').attr('disabled','disabled');
						$('#btn_changeBook').attr('disabled','disabled');
						Libaray.initTable();

					}else{
						alert('删除失败，请刷新重试！')
					}

				},'json');

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
				//var $this = $(this);	
				Libaray.onResetForm();		
				$('#bookDlg').find('#myModalLabel').html('新增图书').end()
							.find('#btn_saveBook').html('保存入库').removeClass('change').end()
							.modal('show');

			},
			initClassify: function(){
				this.onRenderOpt($('#classify'),this.classify_map);
			},
			initYearOption:function(){////////////////////初始化DIY日期年份中的选项

				this.onRenderOpt($('#p_year'),pub_Date);

			},
			onRenderOpt: function(obj,data) {////////根据数据data给对象obj(obj为jQuery对象)渲染option

				var arr = ['<option value="0">请选择</option>'];
				$.each(data,function(){
					arr.push('<option value=',this.value,'>',this.name,'</option>')
				});
				obj.html(arr.join(''));
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
			p_date2:function(obj){////暂时不用//找到jquery对象<select>下被选中<option>的值并返回一个数组

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
					p_date2: Libaray.p_date2($('[name="p_date2"]')).join(''),
					classify: $('#classify').find('option:selected').val(),
					status: $('[name="status"]:checked').val(),
					borrow_status: $('[name="borrow_status"]:checked').val(),
					bookPic: $('#bookPic').val()
				};

				$this.addClass('submiting');/////////保存按钮被点击后,添加submiting类
				// todo 表单验证
				if($this.hasClass('change')){

					data['id'] = $('#booksTable tbody input[type="checkbox"]:checked').val();
					//console.log(data['id']);
					url = 'php/books_update.php';
				}else{

					url = 'php/books_add.php';
				};

				$.get(url,data,function(back){

					if(back.success){
						Libaray.onResetForm();
					}else{
						alert('保存失败');
					}

					$('#bookDlg').modal('hide');
					Libaray.initTable();/////////////////让表格页面局部刷新显示新添加的项
				},'json');
				
			},
			onDisbled: function(){
				$('#borrow-down').prop('checked',true);
				$('#borrow-up').prop('disabled',true);
			},
			onNomal: function(){
				$('#borrow-up').prop('disabled',false);
			},
			onResetForm: function(){
				$('#fm_addBook').trigger('reset');
				$('#btn_saveBook').removeClass('submiting');
			}
	}

	Libaray.init();

}(window,document,jQuery)
