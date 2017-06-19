var cart = {
	templateUrl: './app/cart/cart.html',
	controller: function(CartFactory){        
		var vm = this;

        vm.title = "Carrinho de compras";
        vm.cart = [];
        vm.increaseQuantity = increaseQuantity;
        vm.decreaseItemAmount = decreaseItemAmount;
        vm.removefromCart = removefromCart;

        (function onInit() {
            return vm.cart = CartFactory.getCart();
        })();

        function increaseQuantity(product){
            CartFactory.increaseItemAmount(product);
        }

        function decreaseItemAmount(product){
            CartFactory.decreaseItemAmount(product);
        }

        function removefromCart(product){
        	CartFactory.removefromCart(product);
        }
    }
}

module.exports = cart;