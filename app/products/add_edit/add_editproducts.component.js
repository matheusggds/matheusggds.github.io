var products = {
	templateUrl: './app/products/add_edit/add_editproducts.html',
	controller: function($scope, $state, $stateParams, ProductFactory){
		 var vm = this;

        vm.title = 'Adicionar Produto';
        vm.product = {};
        vm.saveProduct = saveProduct;

        initController();

        function initController() {
            if ($stateParams.id) {
                vm.title = 'Editar Produto';
                vm.product = ProductFactory.GetById($stateParams.id);
            }
        }

        function saveProduct() {
          console.log('vm.product', vm.product);
            // save product
            ProductFactory.Save(vm.product);

            // redirect to users view
            $state.go('products');

            // emit event so list controller can refresh
            $scope.$emit('products-updated');
        }
	}
}

module.exports = products;