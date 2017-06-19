var products = {
	templateUrl: './app/products/products.html',
	controller: function(ProductFactory, $scope, CartFactory){
		var vm = this;

        vm.products = [];
        vm.deleteProduct = deleteProduct;
        vm.addtoCart = addtoCart;
        vm.increaseQuantity = increaseQuantity;
        vm.decreaseItemAmount = decreaseItemAmount;

        initController();

        function initController() {
            loadProducts();

            // reload products when updated
            $scope.$on('products-updated', loadProducts);
        }
        
        function loadProducts() {
            vm.products = ProductFactory.GetAll();
        }

        function deleteProduct(id) {
            ProductFactory.Delete(id);
            loadProducts();
        }

        function addtoCart(product) {
            CartFactory.addtoCart(product);
            product.addedToCart = true;
        }

        function increaseQuantity(product){
            CartFactory.increaseItemAmount(product);
        }

        function decreaseItemAmount(product){
            CartFactory.decreaseItemAmount(product);
        }

	}
}

module.exports = products;