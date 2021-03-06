!function(window,document,$,undefined){
	
	var Store = {
		$loadingWp: $('#masker-wp'),
		param:{size:10,page:0,totalpage:0},
		Cache: {},                       //////渲染商品时得到的商品信息缓存,用于在修改时得到商品的原有信息
		totalNumbers:{numbers:0},
		classify_Cache: {},              ////////////类别缓存,作为渲染商品时的map
		ajax: function(param) {
				$.ajax({
					url: param.url,
					type: param.type,
					data: param.data,
					dataType: param.dataType || 'text',
					success: function(response){
						param.success(response);
					},
					error: function() {
						console.log('call:' + param.url + 'failed');
					}
				});
			},
		init:function(){
			this.initEvent();
			this.initTable();
		},
		initTable: function(){

			var url = '../php/shopping_classify_list.php',
				url2 = '../php/shopping_goods_list.php';

			Store.$loadingWp.show();

			$.when($.getJSON(url),$.getJSON(url2,Store.param)).done(function(classifyList,tableList) {
				Store.$loadingWp.hide();

				if(classifyList[0].success){

					Store.onRenderClassify($('#classify'),classifyList[0].data);
					
					//$.extend(Store.param,{query: Store.param.query || ''},{page: Store.param.page});
					if(!tableList[0].success){	

						layer.msg('暂无查询结果,请更换查询关键字重试!');
						$('#searchIpt').val('');
						Store.param.query = '';
					};
					Store.onRenderTable(tableList[0].data);
					Store.onRenderPage(tableList[0]);
				}else{					
						layer.msg('渲染分类失败,数据库没有分类数据!');
				};

			});
		},
		onRenderClassify: function(obj,data) {////////根据数据data给对象obj(obj为jQuery对象)渲染option

			var arr = ['<option value="1">请选择</option>'];
			$.each(data,function(){
				arr.push('<option value=',this.id,'>',this.name,'</option>');
				Store.classify_Cache[this.id] = this.name;
			});
			obj.html(arr.join(''));
		},
		onRenderPage: function(data){
				var total = data.total,
					size = Store.param.size,
					totalpage = Math.ceil(total / size),i,
					arr = [];
				Store.totalNumbers.numbers = total;
				Store.param.totalpage = totalpage;
					//console.log(page);
				if(Store.param.page == 0){
					arr.push('<li class="fist-page disabled"><a href="javascript:;">&laquo;</a></li>',
						'<li class="prev disabled"><a href="javascript:;">&lsaquo;</a></li>');
				}else{
				arr.push('<li class="fist-page"><a href="javascript:;">&laquo;</a></li>',
						'<li class="prev"><a href="javascript:;">&lsaquo;</a></li>');
				};

				for(i = 0;i < totalpage; i++){

					if(i == Store.param.page){
						arr.push('<li page="',i,'" class="active"><a href="javascript:;">',i+1,'</a></li>');
					}else{
						arr.push('<li page="',i,'"><a href="javascript:;">',i+1,'</a></li>');
					};
				};
				if(Store.param.page >= Store.param.totalpage - 1){
					arr.push('<li class="next disabled"><a href="javascript:;">&rsaquo;</a></li>',
						'<li class="last-page disabled"><a href="javascript:;">&raquo;</a></li>');
				}else{				
					arr.push('<li class="next"><a href="javascript:;">&rsaquo;</a></li>',
						'<li class="last-page"><a href="javascript:;">&raquo;</a></li>');
				};

				$('#pagination').html(arr.join(''));
				Store.param.page = 0;
		},
		onRenderTable: function(data){
			var arr = [],
				$tbody = $('#goodsTable tbody');
				
				$.each(data,function(i,obj){
					arr.push('<tr>',
								'<td><input type="checkbox" value="',obj.id,'"></td>',
								'<td>',i + 1 + Store.param.page*Store.param.size,'</td>',
								'<td title="',obj.title,'">',obj.title,'</td>',
								'<td>￥',obj.price,'</td>',
								'<td><span class="textEllipsis" title="',obj.details,'">',obj.details,'</span></td>',
								'<td>',obj.amount,'</td>',
								'<td>',Store.classify_Cache[obj.classify],'</td>',
								'<td>',obj.status?'上架' :'下架','</td>',
								'<td>',obj.goodsPic,'</td>',
							'</tr>');
					Store.Cache[obj.id] = this;////让obj中每个id的值成为这个对象的父对象的属性;
										      /////使每一条图书信息都有他相应的的ID值作为它的唯一标识

				});
				//console.log(data);
				//console.log(Store.Cache); 
				
				$tbody.html(arr.join(''));
				$('#btn_changeGoods').attr('disabled','disabled');
				$('#btn_delGoods').attr('disabled','disabled');
				$('#btn_shelves').attr('disabled','disabled');
				$('#btn_offShelves').attr('disabled','disabled');
				$('#btn_checkAll').prop('checked',false);
				$('#searchIpt').val('');
		},
		initEvent:function(){
			$('#btn_addGoods').on('click',this.onAddGoods);
			$('#btn_saveGoods').on('click',this.onSaveGoods);
			$('#goodsTable').on('click','tbody input[type="checkbox"]',this.onChoose);
			$('#btn_checkAll').on('click',this.onChooseAll);
			$('#btn_delGoods').on('click',this.onDeleteGoods);
			$('#btn_changeGoods').on('click',this.onChangeGoods);
			$('#btn_searchGoods').on('click',this.onSearchGoods);
			$('#btn_goodsList').on('click',this.onGoodslist);
			$('#pagination').on('click','li',this.onPaging);
			$('#btn_jump').on('click',this.onJumpPage);
			$('#btn_shelves,#btn_offShelves').on('click',this.onShelves);
		},
		onShelves: function() {
			var $checkedBox,url,
				$this = $(this),
				currStatus = $this.val(),
				ids = [];	
			currPage = $('#pagination li.active').attr('page')*1;
			$checkedBox = $('#goodsTable tbody input[type="checkbox"]:checked');
			$checkedBox.each(function(i,obj){
				ids.push(obj.value);
			});
			
			url = '../php/shopping_goods_update_status.php';

			Store.ajax({
				url: url,
				data: {ids: ids.join(','),status: currStatus},
				dataType: 'json',
				success: function(response){
					if (response.success){
						$('#btn_delGoods').attr('disabled','disabled');
						$('#btn_changeGoods').attr('disabled','disabled');
						$('#btn_shelves').attr('disabled','disabled');
						$('#btn_offShelves').attr('disabled','disabled');
					}else{
						layer.msg('当前状态未做任何改变!');
					};
					Store.param.page = currPage;
					Store.initTable();
				}
			});
		},
		onJumpPage: function() {
			var jumpPage = $('#jumpIpt').val()*1 - 1;

			if(isNaN(jumpPage)){
				layer.msg('请输入一个数字');
				$('#jumpIpt').val('');
				return;
			};			
			//console.log(Libaray.param.totalpage)
			if(jumpPage < 0){
				jumpPage = 0;
			}else if(jumpPage > Store.param.totalpage - 1){
				jumpPage = Store.param.totalpage - 1;
			}
//////当页面为空 没一个选项的时候 Store.param.totalpage - 1 为-1 此时的jumpPage输入一
///个大于它的值传给后台的page值是-1 会导致一直无法渲染/////////////
			if(Store.param.totalpage == 0){
				jumpPage = 0;
			};
////////////////////////////////////////////////////////////////////////////////////////
			Store.param.page = jumpPage;
			Store.initTable();
			$('#jumpIpt').val('');
		},
		onPaging: function() {
			var $this = $(this),
				currPage = $('#pagination li.active').attr('page');
			if($this.hasClass('disabled')){
				return;
			}else if($this.hasClass('fist-page')){
				currPage = 0;
			}else if($this.hasClass('last-page')){
				currPage = Store.param.totalpage - 1;
			}else if ($this.hasClass('prev')){
				currPage --;
			}else if ($this.hasClass('next')) {
				currPage ++;
			}else{
				currPage = $this.attr('page');
			};

			Store.param.page = currPage;
			Store.initTable();
		},
		onGoodslist: function() {
			Store.param.query = '';
			Store.initTable();
		},
		onSearchGoods: function() {
			var searchName = $('#searchIpt').val();
			Store.param.query = searchName;
			Store.initTable();
		},
		onChangeGoods: function() {
			var $checkedBox = $('#goodsTable tbody input[type="checkbox"]:checked'),
				$goodsDlg = $('#goodsDlg'),
				//var id = $checkedBox.attr('value'),    //jQuery方法
				id = $checkedBox[0].value,
				currGoodsData = Store.Cache[id];//////Cache是商品渲染时得到的商品信息缓存

			//console.log(currGoodsDate);

			$goodsDlg.find('#myModalLabel').html('修改商品').end()
					.find('#btn_saveGoods').html('确定修改').addClass('change').attr('status',1).end()//设置自定义属性做标识
					.modal('show');
			$goodsDlg.find('#title').val(currGoodsData.title);
			$goodsDlg.find('#price').val(currGoodsData.price);
			$goodsDlg.find('#details').html(currGoodsData.details);
			$goodsDlg.find('#amount').val(currGoodsData.amount);
			$goodsDlg.find('#classify').val(currGoodsData.classify);
			$goodsDlg.find('[name="status"][value="'+ currGoodsData.status +'"]').trigger('click');
			$goodsDlg.find('#goodsPic').val();
				
		},
		onDeleteGoods: function() {
			var $checkedBox,url,currPage,
					ids = [],len;

			if(!confirm('确定删除吗？')){
				return;
			};

			currPage = $('#pagination li.active').attr('page')*1;/////将string转化成number
			$checkedBox = $('#goodsTable tbody input[type="checkbox"]:checked');
			$checkedBox.each(function(i,obj){
				ids.push(obj.value);
			});
			len = ids.length;
			url = '../php/shopping_goods_del.php';
///////////MaxPage是删除后页面最多页数////////////////////////////////////////////////////////////////
			MaxPage = Math.ceil((Store.totalNumbers.numbers - len) / Store.param.size);
			(currPage + 1) < MaxPage? currPage = currPage : currPage = (MaxPage - 1);
			if (currPage < 0) {
				currPage = 0;
			};

			Store.ajax({
				url: url,
				data: {ids: ids.join(',')},
				dataType: 'json',
				success: function(response){
					if (!response.success){

						layer.msg('删除失败!');
					};

					Store.param.page = currPage ;
					Store.initTable();
				}
			});
		},
		onChoose:function() {
			var len = $('#goodsTable tbody input[type="checkbox"]:checked').length,
				lens = $('#goodsTable tbody input[type="checkbox"]').length,
				$btn_checkAll = $('#btn_checkAll'),
				$delGoods = $('#btn_delGoods'),
				$btn_changeGoods = $('#btn_changeGoods');
				$btn_shelves = $('#btn_shelves');
				$btn_offShelves = $('#btn_offShelves');
				
			if(len > 0){
				$delGoods.removeAttr('disabled');
				$btn_shelves.removeAttr('disabled');
				$btn_offShelves.removeAttr('disabled');
				if(len == 1){
					$btn_changeGoods.removeAttr('disabled');				
				}else{
					$btn_changeGoods.attr('disabled','disabled');
				};
				if(len == lens){
					$btn_checkAll.prop('checked',true);
				}else{
					$btn_checkAll.prop('checked',false);
				}
			}else{					
				$delGoods.attr('disabled','disabled');
				$btn_shelves.attr('disabled','disabled');
				$btn_offShelves.attr('disabled','disabled');
				$btn_changeGoods.attr('disabled','disabled');
				$btn_checkAll.prop('checked',false);				
			}
		},
		onChooseAll: function() {
			var $checkedBox = $('#goodsTable tbody input[type="checkbox"]'),
				$delGoods = $('#btn_delGoods'),
				$btn_shelves = $('#btn_shelves'),
				$btn_offShelves = $('#btn_offShelves'),
				$btn_changeGoods = $('#btn_changeGoods'),status;

			if($checkedBox.length == 0){
				this.checked = false;
			}

			if(this.checked){
				status = true;
				if($checkedBox.length == 1){
					$btn_changeGoods.removeAttr('disabled');
				};
				
				$delGoods.removeAttr('disabled');
				$btn_shelves.removeAttr('disabled');
				$btn_offShelves.removeAttr('disabled');

			}else{

				status = false;
				$btn_changeGoods.attr('disabled','disabled');
				$delGoods.attr('disabled','disabled');
				$btn_shelves.attr('disabled','disabled');
				$btn_offShelves.attr('disabled','disabled');


			};
			$checkedBox.each(function (i,obj) {
					obj.checked = status;
				});
		},
		onAddGoods: function(){

			Store.onResetForm();
			$('#goodsDlg').find('#myModalLabel').html('新增商品').end()
							.find('#btn_saveGoods').html('保存入库').removeClass('change').attr('status',2).end()//设置自定义属性做标识
							.modal('show');
		},
		onSaveGoods: function(){
			var $this = $(this),data,url;
//在弹出模态框时根据新增或修改的功能不同给btn添加自定义属性status具有不同的值,此时根据这个值来判断状态//
//在保存的时候 通过保存前的Store.param.query值得到的原来项目的数据渲染table,如果新增则更新table数据
			if($this.attr('status') == 2){

				Store.param.query = '';

			}else{
//////修改后保证页码和之前一样/////////////////////////////////////////////
				Store.param.page = $('#pagination li.active').attr('page');
			};
			if($this.hasClass('submiting')){
					return;
				};
			data = {
					title: $('#title').val(),				
					price: $('#price').val(),
					details: $('#details').val(),
					amount: $('#amount').val(),					
					//classify: $('#classify').find('option:selected').val(),
					classify: $('#classify').val(),
					status: $('[name="status"]:checked').val(),
					pic: $('#goodsPic').val()
				};

			$this.addClass('submiting');

			if($this.hasClass('change')){

				data['id'] = $('#goodsTable tbody input[type="checkbox"]:checked').val();
				//console.log(data['id']);
				url = '../php/shopping_goods_update.php';
			}else{

				url = '../php/shopping_goods_add.php';
			};
			Store.ajax({
				url: url,
				data: data,
				dataType: 'json',
				success: function(response){
					if(response.success){
						Store.onResetForm();
					}else{
						layer.msg('保存失败!');
					}

					$('#goodsDlg').modal('hide');
					Store.initTable();/////////////////让表格页面局部刷新显示新添加的项
				}
			});
		},
		onResetForm: function(){
				$('#fm_addGoods').trigger('reset');
				$('#btn_saveGoods').removeClass('submiting');
		}

	};

	Store.init();

}(window,document,jQuery)
