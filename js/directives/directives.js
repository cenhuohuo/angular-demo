angular.module('routerApp').directive("clickOnce",[function(){
	return {
		restrict: "A",
		link: function(scope, elem, attrs){
			elem.on("click",function(e){
				e.preventDefault();
				elem.addClass("disabled").prop("disabled",true);
			})
		}
	}
}])