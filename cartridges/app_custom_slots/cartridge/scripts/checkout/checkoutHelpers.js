'use strict';

var server = require('server');

var Site = require('dw/system/Site');
var Resource = require('dw/web/Resource');

var base = module.superModule;

base.sendConfirmationEmail = function sendConfirmationEmail(order, locale) {
    var ProductFactory = require('*/cartridge/scripts/factories/product');

    var OrderModel = require('*/cartridge/models/order');
    var emailHelpers = require('*/cartridge/scripts/helpers/emailHelpers');
    var Locale = require('dw/util/Locale');

    var ContentMgr = require('dw/content/ContentMgr');
    var assetContent = ContentMgr.getContent(`register-order-email-asset`);

    var assetContentBody;

    var products = [];

    if (assetContent && assetContent.online) {
        assetContentBody = assetContent.custom.body;
        var productsID = assetContentBody.markup.match(/\${(\d+M)}/g);

        productsID.forEach(product => {
            var productID = product.match(/\d+M/)[0];
            products.push(ProductFactory.get({ pid: productID, pview: 'tile' }))
        });
    }

    var currentLocale = Locale.getLocale(locale);

    var orderModel = new OrderModel(order, { countryCode: currentLocale.country, containerView: 'order' });

    var orderObject = { order: orderModel, products: products ? products : null };

    var emailObj = {
        to: order.customerEmail,
        subject: Resource.msg('subject.order.confirmation.email', 'order', null),
        from: Site.current.getCustomPreferenceValue('customerServiceEmail') || 'no-reply@testorganization.com',
        type: emailHelpers.emailTypes.orderConfirmation
    };

    emailHelpers.sendEmail(emailObj, 'checkout/confirmation/confirmationEmail', orderObject);
}

module.exports = base;