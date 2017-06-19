module.exports = function(CartService){	
  var factory = {};

  factory.addtoCart = addtoCart;
  factory.getCart = getCart;
  factory.increaseItemAmount = increaseItemAmount;
  factory.decreaseItemAmount = decreaseItemAmount;
  factory.removefromCart = removefromCart;

  function addtoCart(product) {
    CartService.push(product);
    console.log(CartService.getCart());
  }

  function getCart() {
    return CartService.getCart();
  }

  function increaseItemAmount(product) {
    product.quantity++;
    product.showAddToCart = true;
  }

  function decreaseItemAmount(product) {
   product.quantity--;
   if (product.quantity <= 0) {
    product.quantity = 0;
    product.addedToCart = false;
    product.showAddToCart = false;
    var itemIndex = CartService.getCart().indexOf(product);
    if (itemIndex > -1) {
      CartService.getCart().splice(itemIndex, 1);
    }
  } else {
    product.showAddToCart = true;
  }
}

function removefromCart(product){
 product.quantity = 0;
 product.addedToCart = false;
 product.showAddToCart = false;
 var itemIndex = CartService.getCart().indexOf(product);
 if (itemIndex > -1) {
  CartService.getCart().splice(itemIndex, 1);
}
}

return factory;

}