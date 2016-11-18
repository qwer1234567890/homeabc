
!function(window,document,$,undefined) {
	var app = angular.module('user_man',[]);

	app.filter('showLev',function(){
		return function(type) {
			return type == 1?'普通用户' : '管理员';
		}
	});
////////////用户序号变更管理/////////////////////////////////
	var currNumber = 0;
	app.filter('currNum',function() {
		return function($index) {
			return $index + 1 + currNumber;
		}
	})
/////////////////////////////////////////////////////////////
	app.controller('user_ctrl',function($scope,$http){
		$scope.param = {
			size: 6,
			page: 0,
			ids: [],
			status: 0
		};

		app.filter('showLev',function(){
		return function(type) {
			return type == 1?'普通用户' : '管理员';
		}
	});
		
		$scope.onJumpPage = function() {
			var jumpPage = $scope.jumpIpt*1 - 1;

			//////当页面为空 没一个选项的时候/////////////
			if(isNaN(jumpPage)){
				layer.msg('请输入一个数字');
				$scope.jumpIpt = '';
				return;
			};
			if(jumpPage < 0){
				jumpPage = 0;
			}else if(jumpPage > $scope.pageArr.length - 1){
				jumpPage = $scope.pageArr.length - 1;
			};
//////当页面为空 没一个选项的时候 $scope.pageArr.length - 1 值为-1 此时的jumpPage输入一
///个大于它的值传给后台的page值是-1 会导致一直无法渲染 所以重新让jumpPage = 0/////////////
			if($scope.pageArr.length == 0){
				jumpPage = 0;
			};
////////////////////////////////////////////////////////////////////////////////////////
			$scope.param.page = jumpPage;
			listTable ();
			$scope.jumpIpt = '';
		};
		
		$scope.onPaging = function () {
			$scope.param.page = this.$index;
			listTable ();
		};

		$scope.onFistPage = function() {
			$scope.param.page = 0;
			listTable ();
		};

		$scope.onPrevPage = function() {
			$scope.param.page--;
			listTable ();
		};

		$scope.onLastPage = function() {
			$scope.param.page = $scope.pageArr.length - 1;
			listTable ();
		};

		$scope.onNextPage = function() {
			$scope.param.page++;
			listTable ();
		};

		$scope.onUserList = function() {
			$scope.param.status = 0;
			$scope.param.page = 0;
			$scope.param.query = '';
			listTable ();
		};

		$scope.recycleList = function() {
			$scope.param.status = 2;
			$scope.param.page = 0;
			listTable ();
		};

		$scope.onSearch = function () {
			$scope.param.query = $scope.searchIpt;
			listTable ();
		};
		// $scope.onClickCheck = function(e){
		// 	var status = e.target.checked,
		// 		id = this.item.id,index;

		// 	if(status){
		// 		$scope.param.ids.push(id);
		// 	}else{
		// 		index = $scope.param.ids.indexOf(id);
		// 		$scope.param.ids.splice(index,1);
		// 	};
		// };
		$scope.getOpts = function () {
			var $checkedBox,ids=[];
			$checkedBox = $('#userTable td input[type="checkbox"]:checked');
			$checkedBox.each(function(i,obj){
				ids.push(obj.value);
			});
			//console.log(ids)
			return ids;
		};
//////////////////////BUG//////////////////////////////////////////////////	
		$scope.isCheckAll = false;

		$scope.checkOrNot = function() {
			if($scope.getOpts().length == $scope.param.size){

				$scope.isCheckAll = true;

			}else{

				$scope.isCheckAll = false;

			};
		};
//////////////////////BUG//////////////////////////////////////////////////	
		$scope.getRelPage = function(){
			var currPage,len;
			currPage = $scope.param.page;
			len = $('#userTable td input[type="checkbox"]:checked').length;
///////////MaxPage是删除后页面最多页数////////////////////////////////////////////////////////////////
			MaxPage = Math.ceil(($scope.totalOpt - len) / $scope.param.size);
			(currPage + 1) < MaxPage? currPage = currPage : currPage = (MaxPage - 1);
			if (currPage < 0) {
				currPage = 0;
			}
			//console.log(len)
			return currPage;
		};

		$scope.onDelUser = function() {
			// console.log($scope.allCheck);
			// return;
			$http({
				url: '../php/shopping_user_status.php',
				method: 'get',
				params: {ids: $scope.getOpts().join(','),status: 2}
				}).success(function(response){
					if(!response.success){
						layer.msg('删除失败');
					};
				$scope.param.page = $scope.getRelPage();
				listTable ();
			});
		};

		$scope.onRecover = function() {
			$http({
				url: '../php/shopping_user_status.php',
				method: 'get',
				params: {ids: $scope.getOpts().join(','),status:0}
				}).success(function(response){
					if(!response.success){
						layer.msg('恢复失败');
					};
				$scope.param.page = $scope.getRelPage();
				listTable ();
			});
		};

		$scope.onRealDel = function() {
			$http({
				url: '../php/shopping_user_status.php',
				method: 'get',
				params: {ids: $scope.getOpts(),status:3}
				}).success(function(response){
					if(!response.success){
						layer.msg('彻底删除失败');
					};
				$scope.param.page = $scope.getRelPage();
				listTable ();
			});
		};

		$scope.afterPageNumber = function(){
			currNumber = $scope.param.page*$scope.param.size;
		};
		$scope.acPage = 0;
		function listTable () {
			$('#masker-wp').show();
			$http({
				url: '../php/shopping_user_list.php',
				method: 'get',
				params: $scope.param
				}).success(function(response){
					//console.log(response)
					if(!response.success){
						layer.msg('暂无数据');
					};
					$scope.afterPageNumber();
					$scope.acPage = $scope.param.page;
					$scope.searchIpt = '';
					$scope.allCheck = false;
					$scope.totalOpt = response.total;									
					$scope.users = response.data;
					$scope.pageArr = getPageArr(response.total,$scope.param.size);
					$('#masker-wp').hide();
				});				
		};

		listTable ();

		function getPageArr (total,size) {
			return _.range(0,total/size);
		};
			
	});

} (window,document,jQuery);
