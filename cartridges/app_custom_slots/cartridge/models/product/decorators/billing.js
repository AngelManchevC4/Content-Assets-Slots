module.exports = function (object, product) {

    var ContentMgr = require('dw/content/ContentMgr');
    var assetContent = ContentMgr.getContent(`product-unique-billing-information-${product.ID}`);

    let billing = ""

    if (assetContent && assetContent.online) {
        billing = assetContent.custom.body;
    }

    Object.defineProperty(object, 'billingUniqueInformation', {
        enumerable: true,
        value: billing ? billing : null
    });
};
