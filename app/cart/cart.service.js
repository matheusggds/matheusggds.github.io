module.exports = function(){	
    var cart = [];

    this.getCart = function() {
      return cart;
    };

    this.setList = function(_cart) {
      cart = _cart;
    };

    this.push = function(product) {
      cart.push(product);
    };

}