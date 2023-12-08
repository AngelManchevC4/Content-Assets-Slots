module.exports = function (object, product) {

    var ContentMgr = require('dw/content/ContentMgr');
    var assetContent = ContentMgr.getContent(`product-unique-shipping-information-${product.ID}`);

    let shipping = ""

    if (assetContent && assetContent.online) {
        shipping = assetContent.custom.body;
    }

    Object.defineProperty(object, 'shippingUniqueInformation', {
        enumerable: true,
        value: shipping ? shipping : null
    });
};
