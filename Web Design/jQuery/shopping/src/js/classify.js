!function (window,document,$,undefined){

	var Cls ={
		init: function(){
			this.initEvent();
			this.initClassify();
		},
		param:{size:2,page:0,totalpage:0},
		totalNumbers:{numbers:0},
		Cache: {},
		$loadingWp: $('#masker-wp'),
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
		initEvent:function() {
			$('#btn_addClassify').on('click',this.onAddClassify);
			$('#btn_saveClassify').on('click',this.onSaveClassify);
			$('#classifyTable').on('click','tbody input[type="checkbox"]',this.onChoose);
			$('#btn_checkAll').on('click',this.onChooseAll);
			$('#btn_delClassify').on('click',this.onDeleteClassify);
			$('#btn_changeClassify').on('click',this.onChangeClassify);
			$('#btn_searchClassify').on('click',this.onSearchClassify);
			$('#btn_classifyList').on('click',this.onClassifyList);
			$('#pagination').on('click','li',this.onPaging);
			$('#btn_jump').on('click',this.onJumpPage);
			$('#classifyName').on('keyup',this.onCheckName);
		},
		onCheckName: function() {
			var $this = $(this),
				Clsname = this.value;
			if(!Clsname){
				return;
			};
			Cls.ajax({
				url:'../php/shopping_classify_check.php' ,
				data: {name: Clsname},
				dataType: 'json',
				success: function(response){
					if (response.total == 1){
						$this.parent('div').addClass('has-error');
					}else{
						$this.parent('div').removeClass('has-error');
					};
				}
			});


		},
		onSearchClassify: function() {
			var searchName = $('#searchIpt').val();
			Cls.param.query = searchName;
			Cls.initClassify();
		},
		onJumpPage: function() {
			var jumpPage = $('#jumpIpt').val()*1 - 1;

			if(isNaN(jumpPage)){
				layer.msg('请输入一个数字');
				$('#jumpIpt').val('');
				return;
			};		
			if(jumpPage < 0){
				jumpPage = 0;
			}else if(jumpPage > Cls.param.totalpage - 1){
				jumpPage = Cls.param.totalpage - 1;
			}
//////当页面为空 没一个选项的时候 Cls.param.totalpage - 1 为-1 此时的jumpPage输入一
///个大于它的值传给后台的page值是-1 会导致一直无法渲染/////////////
			if(Cls.param.totalpage == 0){
				jumpPage = 0;
			};
////////////////////////////////////////////////////////////////////////////////////////
			Cls.param.page = jumpPage;
			Cls.initClassify();
			$('#jumpIpt').val('');
		},
		onPaging: function(){
			var $this = $(this),
				currPage = $('#pagination li.active').attr('page');
			if($this.hasClass('disabled')){
				return;
			}else if($this.hasClass('fist-page')){
				currPage = 0;
			}else if($this.hasClass('last-page')){
				currPage = Cls.param.totalpage - 1;
			}else if ($this.hasClass('prev')){
				currPage --;
			}else if ($this.hasClass('next')) {
				currPage ++;
			}else{
				currPage = $this.attr('page');
			};

			Cls.param.page = currPage;
			Cls.initClassify();
		},
		onClassifyList: function (){
			Cls.param.query = '';
			Cls.initClassify();
		},
		onChangeClassify: function() {
			var $checkedBox = $('#classifyTable tbody input[type="checkbox"]:checked'),
				$classifyDlg = $('#classifyDlg'),
				//var id = $checkedBox.attr('value'),    //jQuery方法
				id = $checkedBox[0].value,
				currClsData = Cls.Cache[id];
				$classifyDlg.find('#classifyName').val(currClsData);

			$classifyDlg.find('#myModalLabel').html('修改类别').end()
					.find('#btn_saveClassify').html('确定修改').addClass('change').attr('status',1).end()//设置自定义属性做标识
					.modal('show');
		},
		onDeleteClassify: function() {
			var $checkedBox,url,currPage,
					ids = [],len;

			if(!confirm('确定删除吗？')){
				return;
			};

			currPage = $('#pagination li.active').attr('page')*1;/////将string转化成number
			$checkedBox = $('#classifyTable tbody input[type="checkbox"]:checked');
			$checkedBox.each(function(i,obj){
				ids.push(obj.value);
			});
			len = ids.length;
			url = '../php/shopping_classify_del.php';
///////////MaxPage是删除后页面最多页数////////////////////////////////////////////////////////////////
			MaxPage = Math.ceil((Cls.totalNumbers.numbers - len) / Cls.param.size);
			(currPage + 1) < MaxPage? currPage = currPage : currPage = (MaxPage - 1);
			if (currPage < 0) {
				currPage = 0;
			};

			Cls.ajax({
				url: url,
				data: {ids: ids.join(',')},
				dataType: 'json',
				success: function(response){
					if (response.success){
						$('#btn_delClassify').attr('disabled','disabled');
						$('#btn_changeClassify').attr('disabled','disabled');
					}else{
						layer.msg('删除失败,请刷新重试!');
					};

					Cls.param.page = currPage ;
					Cls.initClassify();
				}
			});
		},
		onChoose: function() {
			var len = $('#classifyTable tbody input[type="checkbox"]:checked').length,
				lens = $('#classifyTable tbody input[type="checkbox"]').length,
				$btn_checkAll = $('#btn_checkAll'),
				$delClassify = $('#btn_delClassify'),
				$btn_changeClassify = $('#btn_changeClassify');
				
			if(len > 0){
				$delClassify.removeAttr('disabled');
				if(len == 1){
					$btn_changeClassify.removeAttr('disabled');				
				}else{
					$btn_changeClassify.attr('disabled','disabled');
				};
				if(len == lens){
					$btn_checkAll.prop('checked',true);
				}else{
					$btn_checkAll.prop('checked',false);
				}
			}else{					
				$delClassify.attr('disabled','disabled');
				$btn_changeClassify.attr('disabled','disabled');
				$btn_checkAll.prop('checked',false);				
			}
		},
		onChooseAll: function() {
			var $checkedBox = $('#classifyTable tbody input[type="checkbox"]'),
				$delClassify = $('#btn_delClassify'),
				$btn_changeClassify = $('#btn_changeClassify'),status;

			if($checkedBox.length == 0){
				this.checked = false;
			}

			if(this.checked){
				status = true;
				if($checkedBox.length == 1){
					$btn_changeClassify.removeAttr('disabled');
				};
				
				$delClassify.removeAttr('disabled');

			}else{

				status = false;
				$btn_changeClassify.attr('disabled','disabled');
				$delClassify.attr('disabled','disabled');

			};
			$checkedBox.each(function (i,obj) {
					obj.checked = status;
				});
		},
		initClassify:function () {
			//$.extend(Cls.param,{query: Cls.param.query || ''},{page: Cls.param.page});
			var url = '../php/shopping_classify_list.php';
			Cls.$loadingWp.show();
			Cls.ajax({
				url: url,
				data: Cls.param,
				dataType: 'json',
				success: function(response) {
					if(!response.success){	

						layer.msg('暂无查询结果,请更换查询关键字重试!');
						$('#searchIpt').val('');
						Cls.param.query = '';
					};
					Cls.onRenderPage(response);
					Cls.onRenderClsList($('#classifyTable').find('tbody'),response.data);
					Cls.$loadingWp.hide();					
				}
			})
		},
		onRenderPage: function(data){
			//console.log(data);
			var total = data.total,
				size = Cls.param.size,
				totalpage = Math.ceil(total / size),i,
				arr = [];
			Cls.totalNumbers.numbers = total;
			Cls.param.totalpage = totalpage;
			if(Cls.param.page == 0){
				arr.push('<li class="fist-page disabled"><a href="javascript:;">&laquo;</a></li>',
					'<li class="prev disabled"><a href="javascript:;">&lsaquo;</a></li>');
			}else{
			arr.push('<li class="fist-page"><a href="javascript:;">&laquo;</a></li>',
					'<li class="prev"><a href="javascript:;">&lsaquo;</a></li>');
			};

			for(i = 0;i < totalpage; i++){

				if(i == Cls.param.page){
					arr.push('<li page="',i,'" class="active"><a href="javascript:;">',i+1,'</a></li>');
				}else{
					arr.push('<li page="',i,'"><a href="javascript:;">',i+1,'</a></li>');
				};
			};
			if(Cls.param.page >= Cls.param.totalpage - 1){
				arr.push('<li class="next disabled"><a href="javascript:;">&rsaquo;</a></li>',
					'<li class="last-page disabled"><a href="javascript:;">&raquo;</a></li>');
			}else{				
				arr.push('<li class="next"><a href="javascript:;">&rsaquo;</a></li>',
					'<li class="last-page"><a href="javascript:;">&raquo;</a></li>');
			};

			$('#pagination').html(arr.join(''));
			Cls.param.page = 0;
		},
		onRenderClsList: function(obj,data) {
			var arr = [];

			$.each(data,function(i,obj){
				arr.push('<tr>',
							'<td><input type="checkbox" value="',obj.id,'"></td>',
							'<td>',i + 1 + Cls.param.page*Cls.param.size,'</td>',
							'<td title="',obj.name,'">',obj.name,'</td>',						
						'</tr>');
				Cls.Cache[obj.id] = obj.name;
			});

			obj.html(arr.join(''));
			$('#btn_changeClassify').attr('disabled','disabled');
			$('#btn_delClassify').attr('disabled','disabled');
			$('#btn_checkAll').prop('checked',false);
			$('#searchIpt').val('');
		},
		onAddClassify: function(){
			Cls.onResetForm();
			$('#classifyDlg').find('#myModalLabel').html('新增类别').end()
							.find('#btn_saveClassify').html('保存入库').removeClass('change').attr('status',2).end()//设置自定义属性做标识
							.modal('show');
		},
		onSaveClassify: function () {
			var $this = $(this),
				Clsname = $('#classifyName').val(),//////todo 表单验证
				data = {name: Clsname},
				url;
//在弹出模态框时根据新增或修改的功能不同给btn添加自定义属性status具有不同的值,此时根据这个值来判断状态//
//在保存的时候 通过保存前的Cls.param.query值得到的原来项目的数据渲染table,如果新增则更新table数据
			if($this.attr('status') == 2){

				Cls.param.query = '';

			}else{
//////修改后保证页码和之前一样/////////////////////////////////////////////
				Cls.param.page = $('#pagination li.active').attr('page');
			};
			if($this.hasClass('submiting') || $('#checkName').hasClass('has-error')){
					layer.msg('该类别已存在!');
					return;
				};

			$this.addClass('submiting');

			if($this.hasClass('change')){

				data['id'] = $('#classifyTable tbody input[type="checkbox"]:checked').val();
				url = '../php/shopping_classify_update.php';
			}else{
				url = '../php/shopping_classify_add.php';
			};

			Cls.ajax({
				url: url,
				dataType: 'json',
				data: data,
				success: function(response) {
					console.log(response);
					if(response.success){
						Cls.onResetForm();
					}else{
						layer.msg('保存失败!');
					}

					$('#classifyDlg').modal('hide');
					Cls.initClassify();/////////////////让表格页面局部刷新显示新添加的项
				}
			});

		},
		onResetForm: function(){
				$('#fm_addClassify').trigger('reset');
				$('#btn_saveClassify').removeClass('submiting');
		}
	}

	Cls.init();

}(window,document,jQuery)