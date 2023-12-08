'use strict';

var decorators = require('*/cartridge/models/product/decorators/index');

var shippingDecorator = require('~/cartridge/models/product/decorators/shipping');
var billingDecorator = require('~/cartridge/models/product/decorators/billing');

var base = module.superModule;

module.exports = function fullProduct(product, apiProduct, options) {

    base.call(this,product,apiProduct,options);

    shippingDecorator(product,apiProduct);
    billingDecorator(product,apiProduct);

    return product;
};
