'use strict';

var base = module.superModule;

var URLUtils = require('dw/web/URLUtils');


/**
 * Send an email that would notify the user that account was created
 * @param {obj} registeredUser - object that contains user's email address and name information.
 */
base.sendCreateAccountEmail = function (registeredUser) {
    var emailHelpers = require('*/cartridge/scripts/helpers/emailHelpers');
    var ProductFactory = require('*/cartridge/scripts/factories/product');
    var Site = require('dw/system/Site');
    var Resource = require('dw/web/Resource');

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

    var userObject = {
        email: registeredUser.email,
        firstName: registeredUser.firstName,
        lastName: registeredUser.lastName,
        products: products,
        url: URLUtils.https('Login-Show')
    };

    var emailObj = {
        to: registeredUser.email,
        subject: Resource.msg('email.subject.new.registration', 'registration', null),
        from: Site.current.getCustomPreferenceValue('customerServiceEmail') || 'no-reply@testorganization.com',
        type: emailHelpers.emailTypes.registration
    };

    emailHelpers.sendEmail(emailObj, 'checkout/confirmation/accountRegisteredEmail', userObject);
}

module.exports = base;
